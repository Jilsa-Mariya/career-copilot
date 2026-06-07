import google.generativeai as genai
from config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def ask_coach(application, question):

    prompt = f"""
You are a career coach.

Job Role:
{application['role']}

Current Match Score:
{application['match_score']}%

Strengths:
{application['strengths']}

Missing Skills:
{application['missing_skills']}

Question:
{question}

Rules:

- Answer ONLY the user's question.
- Do not discuss networking unless asked.
- Do not discuss LinkedIn unless asked.
- If user asks how to learn something:
  provide topics,
  resources,
  and a simple plan.

- If user asks interview questions:
  provide interview advice.

- Keep response under 150 words.

- Use bullet points.
"""

    try:

        response = model.generate_content(
            prompt
        )

        return response.text

    except Exception:

        return """
    • AI Coach temporarily unavailable.

    • Gemini quota exceeded.

    • Try again later.
    """