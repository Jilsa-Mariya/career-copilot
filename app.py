import streamlit as st

from modules.resume_parser import extract_resume_text
from modules.matcher import analyze_match
from modules.learning_path import generate_learning_path
from modules.workspace import show_workspace
from modules.interview_generator import generate_questions
from modules.application_manager import (
    load_applications,
    save_applications
)

st.set_page_config(
    page_title="Career Copilot",
    page_icon="🚀",
    layout="wide"
)

st.title("🚀 Career Copilot")

apps = load_applications()

selected_application = None

# -------------------------
# APPLICATIONS HOME
# -------------------------

if apps:

    st.subheader("📁 Applications")

    for app in apps:

        if st.button(
            f"{app['company']} - {app['role']}",
            use_container_width=True,
            key=f"app_{app['id']}"
        ):
            st.session_state["selected_app"] = app["id"]

# -------------------------
# OPEN WORKSPACE
# -------------------------

if "selected_app" in st.session_state:

    for app in apps:

        if app["id"] == st.session_state["selected_app"]:
            selected_application = app
            break

# -------------------------
# WORKSPACE VIEW
# -------------------------

if selected_application:

    if st.button("⬅ Back to Applications"):

        del st.session_state["selected_app"]

        st.rerun()

    show_workspace(
        selected_application
    )

    st.stop()

st.divider()

if selected_application:

    show_workspace(
        selected_application
    )

    st.stop()

company = st.text_input(
    "Company Name"
)

role = st.text_input(
    "Job Role"
)

uploaded_resume = st.file_uploader(
    "Upload Resume",
    type=["pdf"]
)

jd_text = st.text_area(
    "Paste Job Description",
    height=250
)

if st.button("Analyze Profile"):

    if uploaded_resume is None:
        st.error("Please upload a resume.")
        st.stop()

    if jd_text.strip() == "":
        st.error("Please enter a job description.")
        st.stop()

    if company.strip() == "":
        st.error("Please enter company name.")
        st.stop()

    if role.strip() == "":
        st.error("Please enter job role.")
        st.stop()

    with st.spinner("Analyzing Resume..."):

        resume_text = extract_resume_text(
            uploaded_resume
        )
        print(resume_text)

        result = analyze_match(
            resume_text,
            jd_text
        )

        try:

            learning_path = generate_learning_path(
                result["missing_skills"]
            )

        except Exception:

            learning_path = {
                "roadmap": []
            }

            st.warning(
                "Learning roadmap unavailable."
            )

            try:

                questions = generate_questions(
                    resume_text,
                    jd_text
                )

            except Exception:

                questions = {
                    "technical_topics": [],
                    "technical_questions": [],
                    "hr_topics": [],
                    "hr_questions": [],
                    "project_questions": []
                }

                st.warning(
                    "Interview preparation unavailable."
                )
        applications = load_applications()

        applications.append(
            {
                "id": len(applications) + 1,

                "company": company,
                "role": role,

                "resume_filename": uploaded_resume.name,
                "resume_text": resume_text,

                "jd_text": jd_text,

                "match_score": result["match_score"],

                "strengths": result["strengths"],
                "partial_matches": result["partial_matches"],
                "missing_skills": result["missing_skills"],

                "resume_improvements":
                    result["resume_improvements"],

                "learning_path": learning_path,

                "interview_prep": questions,

                "status": "Saved",
                "notes": ""
            }
        )

        print("APPLICATION COUNT:")
        print(len(applications))

        save_applications(applications)

        st.session_state["selected_app"] = len(applications)

        st.success("Application Created Successfully!")

        st.rerun()