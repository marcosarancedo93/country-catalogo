"""
Country — Generador de respuestas para preguntas de MercadoLibre.
Lee las preguntas sin responder y genera respuestas con Claude.
Guarda todo en pending_answers.json para revisión y aprobación.

Uso: python question_checker.py
"""

import json
import os
import sys
import io
from datetime import datetime
import anthropic
from ml_api import get_unanswered_questions, get_item_title

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

PENDING_FILE = "pending_answers.json"

COUNTRY_BRIEF = """
Sos el equipo de atención al cliente de Country, una marca argentina de home & decor rústico cálido.
Vendemos: velas, portavelas, macetas, almohadones, canastos, cuadros. Estilo rústico, materiales naturales.

TONO DE RESPUESTAS:
- Cálido, cercano, nunca robótico ni corporativo
- En español rioplatense (vos, no tú)
- Breve y claro — máximo 3-4 líneas
- Si la pregunta tiene respuesta simple: respondela directo
- Si pregunta por precio negociable: "Los precios están fijos, pero si comprás varios productos podemos ver algo especial"
- Si pregunta por envío: siempre envío por MercadoLibre a todo el país
- Si pregunta por disponibilidad: confirmar que hay stock salvo que en el título diga agotado
- Si pregunta por garantía o devolución: "Trabajamos con las políticas de MercadoLibre, cualquier problema lo resolvemos"
- Si no sabés la respuesta con certeza: "Gracias por preguntar, te confirmo en breve" — nunca inventar información
- Cerrar siempre con un toque cálido: "Saludos 🌿", "¡Gracias por consultar!", "Con gusto te ayudamos"
"""


def load_pending() -> list[dict]:
    if not os.path.exists(PENDING_FILE):
        return []
    with open(PENDING_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_pending(pending: list[dict]) -> None:
    with open(PENDING_FILE, "w", encoding="utf-8") as f:
        json.dump(pending, f, ensure_ascii=False, indent=2)


def generate_answer(question_text: str, item_title: str) -> str:
    """Genera una respuesta con Claude."""
    client = anthropic.Anthropic()

    prompt = f"""Producto: {item_title}
Pregunta del comprador: {question_text}

Generá la respuesta ideal en el tono de Country. Máximo 3-4 líneas."""

    message = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=200,
        system=COUNTRY_BRIEF,
        messages=[{"role": "user", "content": prompt}],
    )

    return message.content[0].text.strip()


def main():
    print(f"\n🌿 Country — Chequeando preguntas ML ({datetime.now().strftime('%d/%m/%Y %H:%M')})")
    print("=" * 50)

    # Cargar preguntas pendientes ya generadas
    pending = load_pending()
    pending_ids = {p["question_id"] for p in pending}

    # Obtener preguntas sin responder desde ML
    print("\n📡 Consultando preguntas sin responder en ML...")
    try:
        questions = get_unanswered_questions()
    except Exception as e:
        print(f"❌ Error conectando a ML: {e}")
        return

    new_questions = [q for q in questions if q["id"] not in pending_ids]
    print(f"   {len(questions)} pregunta(s) sin responder | {len(new_questions)} nueva(s) para procesar")

    if not new_questions:
        print("\n✅ No hay preguntas nuevas. Corré 'python approve.py' para revisar las pendientes.")
        return

    # Generar respuestas para las nuevas
    print("\n🤖 Generando respuestas con Claude...")
    for q in new_questions:
        item_title = get_item_title(q.get("item_id", ""))
        question_text = q.get("text", "")

        print(f"\n  Pregunta: {question_text[:70]}...")
        print(f"  Producto: {item_title[:60]}")

        answer = generate_answer(question_text, item_title)
        print(f"  Respuesta sugerida: {answer[:80]}...")

        pending.append({
            "question_id": q["id"],
            "item_id": q.get("item_id", ""),
            "item_title": item_title,
            "question_text": question_text,
            "from_user": q.get("from", {}).get("nickname", "comprador"),
            "date_created": q.get("date_created", ""),
            "suggested_answer": answer,
            "status": "pendiente",  # pendiente | aprobada | editada | descartada
            "checked_at": datetime.now().isoformat(),
        })

    save_pending(pending)
    print(f"\n✅ {len(new_questions)} respuesta(s) guardada(s) en {PENDING_FILE}")
    print("   Corré 'python approve.py' para revisar y enviar.\n")


if __name__ == "__main__":
    main()
