# Career Copilot

AI-powered career assistant that helps students analyze resumes, improve ATS scores, prepare for interviews, and create personalized learning roadmaps.

## Problem

Students often apply to jobs without knowing:

- How well their resume matches a job description
- Which skills they are missing
- What interview questions to prepare for
- How to improve their chances of getting shortlisted

## Solution

Career Copilot analyzes a resume against a job description and generates:

- ATS Match Score
- Strengths and Missing Skills
- Resume Improvement Suggestions
- Personalized Learning Roadmap
- Interview Preparation Questions
- AI Career Coach

## Features

### ATS Resume Analysis
Compares resume and job description using Gemini.

### Learning Hub
Generates learning topics, resources, and projects for missing skills.

### Interview Preparation
Creates technical, HR, and project-based interview questions.

### AI Career Coach
Provides personalized career guidance for each application.

### Application Workspace
Stores applications and tracks progress through the hiring process.

## Tech Stack

- Python
- Streamlit
- Gemini API
- PyPDF
- JSON Storage

## Architecture

User → Resume Upload → ATS Engine → Gemini API → Learning Hub / Interview Prep / AI Coach → Workspace

## Setup

```bash
pip install -r requirements.txt
streamlit run app.py
