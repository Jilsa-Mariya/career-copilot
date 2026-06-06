import streamlit as st

from modules.resume_parser import extract_resume_text
from modules.matcher import analyze_match

st.set_page_config(
    page_title="Career Copilot",
    page_icon="🚀",
    layout="wide"
)

st.title("🚀 Career Copilot")

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

    with st.spinner("Analyzing Resume..."):

        resume_text = extract_resume_text(
            uploaded_resume
        )

        result = analyze_match(
            resume_text,
            jd_text
        )

    st.success("Analysis Complete")

    col1, col2, col3 = st.columns(3)

    with col2:
        st.metric(
            "Match Score",
            f"{result['match_score']}%"
        )

    st.divider()

    col1, col2 = st.columns(2)

    with col1:

        st.subheader("✅ Strengths")

        for skill in result["strengths"]:
            st.success(skill)

    with col2:

        st.subheader("❌ Missing Skills")

        for skill in result["missing_skills"]:
            st.error(skill)

    st.divider()

    st.subheader("💡 Resume Improvements")

    for item in result["resume_improvements"]:
        st.info(item)