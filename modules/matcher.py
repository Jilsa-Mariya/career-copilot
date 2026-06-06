import json
import google.generativeai as genai
from config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def analyze_match(resume_text, jd_text):

    prompt = f"""
You are an ATS resume analyzer.

Compare the resume against the job description.

IMPORTANT RULES:
- Return ONLY valid JSON.
- No markdown.
- No explanations.
- No code blocks.
- Strengths should be short (1-3 words).
- Missing skills should be short.
- Resume improvements should be short action items.

Return in this exact format:

{{
  "match_score": 80,
  "strengths": [
    "Python",
    "SQL",
    "Backend Development"
  ],
  "missing_skills": [
    "Docker",
    "REST APIs"
  ],
  "resume_improvements": [
    "Add REST API experience",
    "Add project metrics",
    "Learn Docker"
  ]
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
    result = result.strip()

    return json.loads(result)