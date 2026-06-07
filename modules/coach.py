import google.generativeai as genai
from config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def ask_coach(application, question):

    prompt = f"""
You are a career coach.

Current Job:
{application['role']}

Missing Skills:
{application['missing_skills']}

Strengths:
{application['strengths']}

User Question:
{question}

Rules:

- Answer ONLY the user's question.
- Do not discuss LinkedIn unless asked.
- Do not discuss networking unless asked.
- If the user asks how to learn a skill, provide:
  1. Topics
  2. Resources
  3. Practice plan

- If the user asks about interview preparation:
  provide interview guidance.

- Keep answers under 100 words.

- Use bullet points.
"""

    response = model.generate_content(prompt)

    return response.text