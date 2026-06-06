import google.generativeai as genai
from config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def ask_coach(application, question):

    prompt = f"""
You are an expert career mentor.

Current Application:
{application['company']} - {application['role']}

Match Score:
{application['match_score']}%

Strengths:
{application['strengths']}

Missing Skills:
{application['missing_skills']}

Resume Improvements:
{application['resume_improvements']}

User Question:
{question}

Give personalized advice based on this application.

Rules:
- Keep answers under 150 words.
- Use bullet points.
- Be concise.
- Focus only on the user's question and previous messages.
"""

    response = model.generate_content(prompt)

    return response.text