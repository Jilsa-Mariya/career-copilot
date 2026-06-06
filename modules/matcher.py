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

A skill can be:

1. Strength
- Explicitly mentioned in resume
- Strong evidence from projects

2. Partial Match
- Related experience exists
- Skill is implied but not explicitly mentioned
- Example: Flask + Postman implies REST APIs

3. Missing Skill
- No meaningful evidence exists
Return EXACTLY:

{{
  "strengths": [],
  "partial_matches": [],
  "missing_skills": [],
  "resume_improvements": []
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

    data = json.loads(result)

    matched = len(data["strengths"])
    partial = len(data["partial_matches"])
    missing = len(data["missing_skills"])

    weighted_score = (
        matched * 1 +
        partial * 0.5
    )

    total = matched + partial + missing

    if total > 0:
        score = round((weighted_score / total) * 100)
    else:
        score = 0

    data["match_score"] = score

    return data