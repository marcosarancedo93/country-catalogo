"""
Country - Bot de Telegram para respuestas de MercadoLibre
Corre 24/7 en Railway. Cada 15 minutos chequea preguntas nuevas en ML,
genera respuestas con Claude, y te manda botones para aprobar o editar.

Uso local:  python bot.py
Railway:    startCommand = "python bot.py"
"""

import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

import json
import os
import logging
from datetime import datetime
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CallbackQueryHandler, MessageHandler, filters, ContextTypes
import anthropic

# --- Config ---
TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN", "8733614816:AAFL7myrafbX8eiMkM3SaWBOBu_crb2EOH4")
CHAT_ID = int(os.getenv("TELEGRAM_CHAT_ID", "8648080970"))
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
CHECK_INTERVAL = 15 * 60  # 15 minutos en segundos

PENDING_FILE = os.path.join(os.path.dirname(__file__), "pending_answers.json")

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(message)s")
logger = logging.getLogger(__name__)

# Estado temporal para ediciones en curso
editing_state = {}

COUNTRY_BRIEF = """
Sos el equipo de atencion al cliente de Country, una marca argentina de home & decor rustico calido.
Vendemos: velas, portavelas, macetas, almohadones, canastos, cuadros. Estilo rustico, materiales naturales.

TONO: Calido, cercano, en espanol rioplatense (vos, no tu). Breve, maximo 3-4 lineas.
- Envio: siempre por MercadoLibre a todo el pais
- Precio negociable: "Los precios estan fijos, si compras varios vemos algo especial"
- Disponibilidad: confirmar stock salvo que diga agotado
- Garantia: "Trabajamos con las politicas de MercadoLibre, cualquier problema lo resolvemos"
- Si no sabes: "Gracias por preguntar, te confirmo en breve" - nunca inventar
- Cerrar siempre con: "Saludos", "Gracias por consultar!", "Con gusto te ayudamos"
"""


# --- Persistencia ---

def load_pending() -> list[dict]:
    if not os.path.exists(PENDING_FILE):
        return []
    with open(PENDING_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_pending(pending: list[dict]) -> None:
    with open(PENDING_FILE, "w", encoding="utf-8") as f:
        json.dump(pending, f, ensure_ascii=False, indent=2)


def get_item_by_question_id(question_id: int) -> dict | None:
    pending = load_pending()
    return next((p for p in pending if p["question_id"] == question_id), None)


def update_item_status(question_id: int, status: str, final_answer: str = None):
    pending = load_pending()
    for item in pending:
        if item["question_id"] == question_id:
            item["status"] = status
            if final_answer:
                item["final_answer"] = final_answer
            item["resolved_at"] = datetime.now().isoformat()
    save_pending(pending)


# --- ML ---

def get_ml_questions() -> list[dict]:
    try:
        import sys
        sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "country_ml_publisher"))
        from ml_api import get_unanswered_questions
        return get_unanswered_questions()
    except Exception as e:
        logger.error(f"Error obteniendo preguntas ML: {e}")
        return []


def get_ml_item_title(item_id: str) -> str:
    try:
        import sys
        sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "country_ml_publisher"))
        from ml_api import get_item_title
        return get_item_title(item_id)
    except Exception:
        return item_id


def send_ml_answer(question_id: int, answer_text: str) -> bool:
    try:
        import sys
        sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "country_ml_publisher"))
        from ml_api import send_answer
        return send_answer(question_id, answer_text)
    except Exception as e:
        logger.error(f"Error enviando respuesta ML: {e}")
        return False


# --- Claude ---

def generate_answer(question_text: str, item_title: str) -> str:
    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
    message = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=200,
        system=COUNTRY_BRIEF,
        messages=[{"role": "user", "content": f"Producto: {item_title}\nPregunta: {question_text}\n\nGenera la respuesta ideal. Maximo 3-4 lineas."}],
    )
    return message.content[0].text.strip()


# --- Job periodico: chequear preguntas ---

async def check_questions(context: ContextTypes.DEFAULT_TYPE):
    logger.info("Chequeando preguntas en ML...")

    pending = load_pending()
    pending_ids = {p["question_id"] for p in pending}

    questions = get_ml_questions()
    new_questions = [q for q in questions if q["id"] not in pending_ids]

    if not new_questions:
        logger.info("Sin preguntas nuevas.")
        return

    logger.info(f"{len(new_questions)} pregunta(s) nueva(s)")

    for q in new_questions:
        item_title = get_ml_item_title(q.get("item_id", ""))
        question_text = q.get("text", "")
        from_user = q.get("from", {}).get("nickname", "comprador")

        answer = generate_answer(question_text, item_title)

        # Guardar en pending
        item = {
            "question_id": q["id"],
            "item_id": q.get("item_id", ""),
            "item_title": item_title,
            "question_text": question_text,
            "from_user": from_user,
            "date_created": q.get("date_created", ""),
            "suggested_answer": answer,
            "status": "pendiente",
            "checked_at": datetime.now().isoformat(),
        }
        pending.append(item)
        save_pending(pending)

        # Mandar mensaje a Telegram con botones
        texto = (
            f"*Nueva pregunta en ML*\n\n"
            f"*De:* {from_user}\n"
            f"*Producto:* {item_title[:60]}\n\n"
            f"*Pregunta:*\n{question_text}\n\n"
            f"*Respuesta sugerida:*\n_{answer}_"
        )

        keyboard = InlineKeyboardMarkup([
            [
                InlineKeyboardButton("Enviar", callback_data=f"send:{q['id']}"),
                InlineKeyboardButton("Editar", callback_data=f"edit:{q['id']}"),
            ],
            [
                InlineKeyboardButton("Descartar", callback_data=f"discard:{q['id']}"),
            ]
        ])

        await context.bot.send_message(
            chat_id=CHAT_ID,
            text=texto,
            parse_mode="Markdown",
            reply_markup=keyboard,
        )


# --- Handlers de botones ---

async def button_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()

    data = query.data
    action, question_id_str = data.split(":", 1)
    question_id = int(question_id_str)

    item = get_item_by_question_id(question_id)
    if not item:
        await query.edit_message_text("Pregunta no encontrada.")
        return

    if action == "send":
        ok = send_ml_answer(question_id, item["suggested_answer"])
        if ok:
            update_item_status(question_id, "aprobada", item["suggested_answer"])
            await query.edit_message_text(
                f"Enviado a ML:\n\n_{item['suggested_answer']}_",
                parse_mode="Markdown"
            )
        else:
            await query.edit_message_text("Error al enviar. Responde manualmente en ML.")

    elif action == "edit":
        editing_state[CHAT_ID] = question_id
        await query.edit_message_text(
            f"Respuesta actual:\n_{item['suggested_answer']}_\n\n"
            f"Escribi la nueva respuesta:",
            parse_mode="Markdown"
        )

    elif action == "discard":
        update_item_status(question_id, "descartada")
        await query.edit_message_text("Descartada. Respondela manualmente en ML.")


# --- Handler para recibir respuesta editada ---

async def text_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    chat_id = update.message.chat_id

    if chat_id not in editing_state:
        return

    question_id = editing_state.pop(chat_id)
    new_answer = update.message.text.strip()

    ok = send_ml_answer(question_id, new_answer)
    if ok:
        update_item_status(question_id, "editada", new_answer)
        await update.message.reply_text(f"Enviado a ML:\n\n{new_answer}")
    else:
        await update.message.reply_text("Error al enviar. Responde manualmente en ML.")


# --- Main ---

def main():
    logger.info("Iniciando Country ML Bot...")

    app = Application.builder().token(TELEGRAM_TOKEN).build()

    # Handlers
    app.add_handler(CallbackQueryHandler(button_handler))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, text_handler))

    # Job periodico
    app.job_queue.run_repeating(check_questions, interval=CHECK_INTERVAL, first=10)

    logger.info(f"Bot corriendo. Chequeando ML cada {CHECK_INTERVAL // 60} minutos.")
    app.run_polling(drop_pending_updates=True)


if __name__ == "__main__":
    main()
