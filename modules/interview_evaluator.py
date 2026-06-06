import google.generativeai as genai
from config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

def evaluate_answer(
    question,
    answer
):

    prompt = f"""
Evaluate this interview answer.

Question:
{question}

Answer:
{answer}

Return ONLY JSON.

{{
    "score": 0,
    "strengths": [],
    "improvements": []
}}
"""

    response = model.generate_content(
        prompt
    )

    text = response.text

    text = text.replace(
        "```json",
        ""
    )

    text = text.replace(
        "```",
        ""
    )

    import json

    return json.loads(text)