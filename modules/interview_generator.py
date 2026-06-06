import json
import google.generativeai as genai
from config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_questions(resume_text, jd_text):

    prompt = f"""
Create interview preparation content.

Return ONLY JSON.

{{
    "technical_topics": [],
    "technical_questions": [],

    "hr_topics": [],
    "hr_questions": [],

    "project_questions": []
}}

Resume:
{resume_text}

Job Description:
{jd_text}
"""

    response = model.generate_content(prompt)

    result = response.text.strip()

    result = result.replace("```json", "")
    result = result.replace("```", "")

    return json.loads(result)