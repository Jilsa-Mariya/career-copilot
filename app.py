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

# 1. Page Configuration (Must be the very first Streamlit command)
st.set_page_config(
    page_title="Career Copilot",
    page_icon="🚀",
    layout="wide"
)

# 2. Modern Light Theme Custom CSS
st.markdown("""
<style>

/* Main App Background */
.stApp {
    background-color: #f1f5f9 !important;
}

/* Headers styling */
h1, h2, h3, h4 {
    color: #0f172a !important;
    font-weight: 700;
}

/* Application Dashboard Cards */
.app-card {
    background: white;
    padding: 24px;
    border-radius: 20px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 10px 25px rgba(15,23,42,0.06);
    transition: all 0.2s ease;
}

.app-card h3 {
    margin-top: 0px;
    margin-bottom: 8px;
    color: #1e3a8a !important;
}

/* Metric Display Cards */
[data-testid="stMetric"] {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 15px;
    box-shadow: 0px 2px 8px rgba(0,0,0,0.02);
}

/* Global Buttons Modification */
.stButton > button {
    border-radius: 12px;
    background: #2563eb;
    color: white;
    border: none;
    font-weight: 600;
    transition: all 0.2s ease;
}

.stButton > button:hover {
    background: #1d4ed8;
    color: white;
}

/* Navigation Tabs */
.stTabs [data-baseweb="tab"] {
    font-size: 15px;
    font-weight: 600;
    color: #475569;
}

/* Inputs and Text Areas */
.stTextInput input,
.stTextArea textarea {
    background-color: white !important;
    color: #0f172a !important;
    border: 1px solid #cbd5e1 !important;
    border-radius: 10px !important;
}

</style>
""", unsafe_allow_html=True)

# 3. Load Application Data
apps = load_applications()

# 4. Clean Sidebar Setup (Duplicates Removed)
with st.sidebar:
    st.title("🚀 Career Copilot")
    st.markdown("---")
    st.metric("Total Applications", len(apps))
    st.markdown("---")
    st.caption("AI Career Assistant • v1.0")

# 5. Route views based on Session State tracking
if "selected_app" in st.session_state:
    # ---------------------------------------------------------
    # WORKSPACE VIEW (Hides everything else for zero clutter)
    # ---------------------------------------------------------
    selected_application = None
    for app in apps:
        if app["id"] == st.session_state["selected_app"]:
            selected_application = app
            break

    if selected_application:
        # Back button directly at the top left of the workspace
        if st.button("⬅ Back to Applications", key="back_btn"):
            del st.session_state["selected_app"]
            st.rerun()
            
        show_workspace(selected_application)
        st.stop()  # Halt execution here so homepage elements don't render underneath

else:
    # ---------------------------------------------------------
    # HOMEPAGE / DASHBOARD VIEW
    # ---------------------------------------------------------
    st.markdown(
        """
        <div style='padding-top: 20px;'>
            <h1>🚀 Career Copilot</h1>
            <p>
            Track applications, improve ATS scores, prepare for interviews, and manage your job search in one workspace.
            </p>
        </div>
        """, 
        unsafe_allow_html=True
    )
    st.divider()

    # Display Current Active Applications Grid
    if apps:
        st.subheader("📁 My Applications")
        col1, col2 = st.columns(2)

        for index, app in enumerate(apps):
            target_col = col1 if index % 2 == 0 else col2
            with target_col:
                # Cleaner Container Wrapper setup
                with st.container():
                    st.markdown(
                        f"""
                        <div class="app-card">
                            <h3>{app['company']}</h3>
                            <p style='font-weight: 600; color: #475569; margin-bottom: 12px;'>{app['role']}</p>
                            <p style='margin: 4px 0;'>🎯 <b>Match Score:</b> {app['match_score']}%</p>
                            <p style='margin: 4px 0;'>📌 <b>Status:</b> {app['status']}</p>
                        </div>
                        """,
                        unsafe_allow_html=True
                    )
                    # Integrated seamless action button matching the card design
                    if st.button(
                        "Open Workspace",
                        key=f"app_{app['id']}",
                        use_container_width=True
                    ):
                        st.session_state["selected_app"] = app["id"]
                        st.rerun()
        st.divider()

    # Form Engine to Creation New Application Profiles
    st.subheader("➕ Analyze New Position")
    
    company = st.text_input("Company Name", placeholder="e.g. Google, Microsoft, Startup Local")
    role = st.text_input("Job Role", placeholder="e.g. Backend Intern, Fullstack Engineer")
    uploaded_resume = st.file_uploader("Upload Resume Profile", type=["pdf"])
    jd_text = st.text_area("Paste Targeted Job Description", height=250, placeholder="Paste entire requirements layout details here...")

    if st.button("Analyze Profile & Create Workspace", use_container_width=True):
        if not company.strip():
            st.error("Please enter a company name.")
            st.stop()
        if not role.strip():
            st.error("Please enter a job role.")
            st.stop()
        if uploaded_resume is None:
            st.error("Please upload a resume file.")
            st.stop()
        if not jd_text.strip():
            st.error("Please enter the job description specifications.")
            st.stop()

        with st.spinner(
            "Analyzing resume and job description..."
        ):
            resume_text = extract_resume_text(uploaded_resume)
            result = analyze_match(resume_text, jd_text)

            # Isolated parsing blocks prevent cascade compilation issues
            try:
                learning_path = generate_learning_path(result["missing_skills"])
            except Exception:
                learning_path = {"roadmap": []}

            try:
                questions = generate_questions(resume_text, jd_text)
            except Exception:
                questions = {
                    "technical_topics": [],
                    "technical_questions": [],
                    "hr_topics": [],
                    "hr_questions": [],
                    "project_questions": []
                }

            # Commit Profile Structure definitions inside Database Array
            applications = load_applications()
            new_app_id = (
                max(
                    [app["id"] for app in applications],
                    default=0
                ) + 1
            )
            
            applications.append({
                "id": new_app_id,
                "company": company,
                "role": role,
                "resume_filename": uploaded_resume.name,
                "resume_text": resume_text,
                "jd_text": jd_text,
                "match_score": result["match_score"],
                "strengths": result["strengths"],
                "partial_matches": result["partial_matches"],
                "missing_skills": result["missing_skills"],
                "resume_improvements": result["resume_improvements"],
                "learning_path": learning_path,
                "interview_prep": questions,
                "status": "Saved",
                "notes": ""
            })

            save_applications(applications)
            st.session_state["selected_app"] = new_app_id
            st.success("New Application Workspace Created Successfully!")
            st.rerun()