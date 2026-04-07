"""
Country — Aprobación manual de respuestas a preguntas ML.
Mostrá cada pregunta, editá si querés, y enviá con un Enter.

Uso: python approve.py
"""

import json
import os
from datetime import datetime
from ml_api import send_answer

PENDING_FILE = "pending_answers.json"


def load_pending() -> list[dict]:
    if not os.path.exists(PENDING_FILE):
        return []
    with open(PENDING_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_pending(pending: list[dict]) -> None:
    with open(PENDING_FILE, "w", encoding="utf-8") as f:
        json.dump(pending, f, ensure_ascii=False, indent=2)


def main():
    pending = load_pending()
    items_pendientes = [p for p in pending if p["status"] == "pendiente"]

    if not items_pendientes:
        print("\n🌿 No hay respuestas pendientes de aprobación.")
        print("   Corré 'python question_checker.py' primero.\n")
        return

    print(f"\n🌿 Country — Aprobación de respuestas ({datetime.now().strftime('%d/%m/%Y %H:%M')})")
    print(f"   {len(items_pendientes)} respuesta(s) para revisar")
    print("=" * 60)

    enviadas = 0
    descartadas = 0

    for i, item in enumerate(items_pendientes, 1):
        print(f"\n{'━' * 60}")
        print(f"[{i}/{len(items_pendientes)}] Pregunta de: {item['from_user']}")
        print(f"Producto: {item['item_title'][:70]}")
        print(f"\n❓ {item['question_text']}")
        print(f"\n💬 Respuesta sugerida:")
        print(f"   {item['suggested_answer']}")
        print()
        print("Opciones:")
        print("  [Enter]  → Enviar esta respuesta")
        print("  [e]      → Editar antes de enviar")
        print("  [d]      → Descartar (responder manualmente en ML)")
        print("  [q]      → Salir y continuar después")

        choice = input("\n> ").strip().lower()

        if choice == "q":
            print("\n⏸  Pausado. Las respuestas restantes quedan como pendientes.")
            break

        elif choice == "d":
            item["status"] = "descartada"
            item["resolved_at"] = datetime.now().isoformat()
            descartadas += 1
            print("  ↩️  Descartada.")

        elif choice == "e":
            print(f"\nRespuesta actual:\n{item['suggested_answer']}\n")
            print("Escribí la nueva respuesta (Enter dos veces para terminar):")
            lines = []
            while True:
                line = input()
                if line == "" and lines and lines[-1] == "":
                    break
                lines.append(line)
            new_answer = "\n".join(lines[:-1] if lines[-1] == "" else lines).strip()

            if new_answer:
                print(f"\nRespuesta editada:\n{new_answer}")
                confirm = input("\n¿Enviar? [Enter = sí / n = cancelar] > ").strip().lower()
                if confirm != "n":
                    ok = send_answer(item["question_id"], new_answer)
                    if ok:
                        item["status"] = "editada"
                        item["final_answer"] = new_answer
                        item["resolved_at"] = datetime.now().isoformat()
                        enviadas += 1
                        print("  ✅ Enviada.")
                    else:
                        print("  ❌ Error al enviar. Intentá desde ML directamente.")
                else:
                    print("  ↩️  Cancelada — sigue como pendiente.")
            else:
                print("  ↩️  Sin cambios — sigue como pendiente.")

        else:
            # Enter = aprobar y enviar
            ok = send_answer(item["question_id"], item["suggested_answer"])
            if ok:
                item["status"] = "aprobada"
                item["final_answer"] = item["suggested_answer"]
                item["resolved_at"] = datetime.now().isoformat()
                enviadas += 1
                print("  ✅ Enviada.")
            else:
                print("  ❌ Error al enviar. Intentá desde ML directamente.")

    # Guardar cambios
    save_pending(pending)

    print(f"\n{'=' * 60}")
    print(f"✅ Sesión terminada: {enviadas} enviada(s) | {descartadas} descartada(s)")
    pendientes_restantes = len([p for p in pending if p["status"] == "pendiente"])
    if pendientes_restantes:
        print(f"   {pendientes_restantes} aún pendiente(s) para próxima sesión.")
    print()


if __name__ == "__main__":
    main()
