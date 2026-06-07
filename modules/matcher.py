import json
import google.generativeai as genai
from config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def analyze_match(resume_text, jd_text):

    prompt = f"""
You are a strict ATS analyzer.

IMPORTANT:

1. ONLY evaluate skills that appear in the Job Description.

2. NEVER invent skills.

3. NEVER recommend skills that are not present in the Job Description.

4. A skill must be classified as exactly one of:
- Strength
- Partial Match
- Missing Skill

5. Every JD skill must appear in one of those categories.

6. Match score should be based ONLY on JD skills.

Return ONLY valid JSON.

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
    print(response)
    print(response.text)

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