import streamlit as st

from modules.resume_parser import extract_resume_text
from modules.matcher import analyze_match
from modules.learning_path import generate_learning_path
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

if apps:

    st.subheader("📁 Applications")

    options = [
        f"{app['company']} - {app['role']}"
        for app in apps
    ]

    selected = st.selectbox(
        "Open Workspace",
        options
    )

    for app in apps:

        label = (
            f"{app['company']} - "
            f"{app['role']}"
        )

        if label == selected:
            selected_application = app
            break

st.divider()

st.divider()

if selected_application:

    st.header(
        f"📁 {selected_application['company']} Workspace"
    )

    tab1, tab2, tab3, tab4 = st.tabs(
        [
            "Overview",
            "Learning Hub",
            "Progress",
            "Status"
        ]
    )

    with tab1:

        st.metric(
            "Match Score",
            f"{selected_application['match_score']}%"
        )

        st.subheader("Strengths")

        for skill in selected_application["strengths"]:
            st.success(skill)

        st.subheader("Missing Skills")

        for skill in selected_application["missing_skills"]:
            st.error(skill)

    with tab2:

        roadmap = selected_application["learning_path"]

        for item in roadmap["roadmap"]:

            st.subheader(
                item["skill"]
            )

            st.write(
                f"🎯 {item['goal']}"
            )

            st.write(
                f"🚀 {item['project']}"
            )

    with tab3:

        for skill in selected_application[
            "missing_skills"
        ]:

            st.checkbox(
                skill,
                key=f"{selected_application['id']}_{skill}"
            )

    with tab4:

        status = st.selectbox(
            "Application Status",
            [
                "Saved",
                "Applied",
                "Assessment",
                "Interview",
                "Rejected",
                "Selected"
            ]
        )

    st.divider()

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

        result = analyze_match(
            resume_text,
            jd_text
        )

        learning_path = generate_learning_path(
            result["missing_skills"]
        )
        
        questions = generate_questions(
        resume_text,
        jd_text
    )

        applications = load_applications()

        applications.append(
            {
                "id": len(applications) + 1,
                "company": company,
                "role": role,
                "match_score": result["match_score"],

                "strengths": result["strengths"],
                "partial_matches": result["partial_matches"],
                "missing_skills": result["missing_skills"],
                "resume_improvements": result["resume_improvements"],

                "learning_path": learning_path,

                "status": "Saved"
            }
        )

        save_applications(applications)

    st.success("Analysis Complete")
    st.subheader(f"{role} @ {company}")

    col1, col2, col3 = st.columns(3)

    with col2:
        score = result["match_score"]

        st.metric(
            "Match Score",
            f"{score}%"
        )

        if score >= 80:
            st.success("Strong Match")
        elif score >= 60:
            st.warning("Moderate Match")
        else:
            st.error("Low Match")

    st.divider()

    col1, col2, col3 = st.columns(3)

    with col1:
        st.subheader("✅ Strengths")

        for skill in result["strengths"]:
            st.success(skill)

    with col2:
        st.subheader("🟡 Partial Matches")

        for skill in result["partial_matches"]:
            st.warning(skill)

    with col3:
        st.subheader("❌ Missing Skills")

        for skill in result["missing_skills"]:
            st.error(skill)

    st.divider()

    st.subheader("💡 Resume Improvements")

    for item in result["resume_improvements"]:
        st.info(item)
    
    st.divider()

    st.header("📚 Learning Roadmap")

    for item in learning_path["roadmap"]:

        st.subheader(item["skill"])

        st.write(
            f"🎯 Goal: {item['goal']}"
        )

        st.write(
            f"🚀 Project: {item['project']}"
        )

    st.divider()

    st.header("🎯 Interview Preparation")

    st.subheader("💻 Technical Questions")

    for q in questions["technical"]:
        st.write("•", q)
    
    st.subheader("🧑‍💼 HR Questions")

    for q in questions["hr"]:
        st.write("•", q)

    st.subheader("🚀 Project Questions")

    for q in questions["project"]:
        st.write("•", q)
