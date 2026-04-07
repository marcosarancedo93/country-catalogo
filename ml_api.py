"""
Funciones de ML API para preguntas y respuestas.
Reutiliza el token del publisher.
"""

import sys
import os
import requests

# Reutilizar auth del publisher
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "country_ml_publisher"))
from auth import get_access_token

ML_API = "https://api.mercadolibre.com"


def get_headers() -> dict:
    token = get_access_token()
    return {"Authorization": f"Bearer {token}"}


def get_unanswered_questions() -> list[dict]:
    """Obtiene todas las preguntas sin responder."""
    headers = get_headers()
    response = requests.get(
        f"{ML_API}/my/received_questions/search",
        params={"status": "UNANSWERED", "limit": 50},
        headers=headers,
        timeout=10,
    )
    response.raise_for_status()
    data = response.json()
    return data.get("questions", [])


def get_item_title(item_id: str) -> str:
    """Obtiene el título de un producto de ML."""
    try:
        response = requests.get(
            f"{ML_API}/items/{item_id}",
            params={"attributes": "title"},
            timeout=10,
        )
        response.raise_for_status()
        return response.json().get("title", item_id)
    except Exception:
        return item_id


def send_answer(question_id: int, answer_text: str) -> bool:
    """Envía la respuesta a una pregunta."""
    headers = get_headers()
    headers["Content-Type"] = "application/json"

    payload = {
        "question_id": question_id,
        "text": answer_text,
    }

    response = requests.post(
        f"{ML_API}/answers",
        json=payload,
        headers=headers,
        timeout=10,
    )

    return response.status_code == 200
