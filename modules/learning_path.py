import json
import google.generativeai as genai
from config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_learning_path(missing_skills):

    prompt = f"""
Create a project-based learning roadmap.

Missing Skills:
{missing_skills}

Return ONLY JSON.

{{
    "roadmap": [
        {{
            "skill": "",
            "goal": "",
            "project": ""
        }}
    ]
}}
"""

    response = model.generate_content(prompt)

    result = response.text.strip()

    result = result.replace("```json", "")
    result = result.replace("```", "")

    return json.loads(result)