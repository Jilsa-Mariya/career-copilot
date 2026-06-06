import google.generativeai as genai
from config import GEMINI_API_KEY

genai.configure(
    api_key=GEMINI_API_KEY
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

def generate_question(
    application,
    interview_type
):

    prompt = f"""
Generate ONE interview question.

Role:
{application['role']}

Interview Type:
{interview_type}

Resume:
{application['resume_text']}

Job Description:
{application['jd_text']}

Return ONLY the question.
"""

    response = model.generate_content(
        prompt
    )

    return response.text.strip()