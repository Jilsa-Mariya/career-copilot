import streamlit as st
from modules.coach import ask_coach
from modules.mock_interview import (
    generate_question
)

from modules.interview_evaluator import (
    evaluate_answer
)
from modules.application_manager import (
    update_notes,
    update_status
)


def show_workspace(application):

    st.header(
        f"📁 {application['company']} - {application['role']}"
    )

    tab1, tab2, tab3, tab4, tab5, tab6, tab7 = st.tabs(
    [
        "Overview",
        "Resume",
        "Job Description",
        "Learning Hub",
        "Interview Prep",
        "AI Coach",
        "Notes"
    ]
)
    
    # --------------------
    # OVERVIEW
    # --------------------

    with tab1:

        st.subheader("📌 Application Status")

        st.info(
            application["status"]
        )

        st.metric(
            "Match Score",
            f"{application['match_score']}%"
        )

        st.subheader("✅ Strengths")

        for skill in application["strengths"]:
            st.success(skill)

        st.subheader("🟡 Partial Matches")

        for skill in application["partial_matches"]:
            st.warning(skill)

        st.subheader("❌ Missing Skills")

        for skill in application["missing_skills"]:
            st.error(skill)

        st.subheader("💡 Resume Improvements")

        for item in application[
            "resume_improvements"
        ]:
            st.info(item)

        status = st.selectbox(
            "Application Status",
            [
                "Saved",
                "Applied",
                "Assessment",
                "Interview",
                "Selected",
                "Rejected"
            ],
            index=[
                "Saved",
                "Applied",
                "Assessment",
                "Interview",
                "Selected",
                "Rejected"
            ].index(
                application["status"]
            )
        )

        if st.button(
            "Update Status"
        ):

            update_status(
                application["id"],
                status
            )

            st.success(
                "Status Updated"
            )
    # --------------------
    # RESUME
    # --------------------

    with tab2:

        st.subheader("📄 Resume")

        st.success(
            application["resume_filename"]
        )

        st.info(
            "Resume uploaded successfully."
        )

        st.write(
            "This resume was used for ATS analysis and interview preparation."
        )

    # --------------------
    # JD
    # --------------------
    
    with tab3:

        st.subheader(
            "📋 Job Description"
        )

        st.text_area(
            "Job Description",
            application["jd_text"],
            height=400
        )

    # --------------------
    # LEARNING HUB
    # --------------------

    with tab4:

        roadmap = application[
            "learning_path"
        ]

        for item in roadmap["roadmap"]:

            st.subheader(
                item["skill"]
            )

            st.write("📚 Topics")

            for topic in item["topics"]:
                st.write(
                    f"• {topic}"
                )

            st.write("🎓 Resources")

            for resource in item["resources"]:
                st.write(
                    f"• {resource}"
                )

            st.write(
                f"🚀 Practice Project: "
                f"{item['project']}"
            )

            st.divider()

    # --------------------
    # INTERVIEW PREP
    # --------------------

    with tab5:

        prep = application[
            "interview_prep"
        ]

        st.header(
            "💻 Technical Interview"
        )

        st.subheader(
            "Topics To Focus On"
        )

        for topic in prep[
            "technical_topics"
        ]:
            st.info(topic)

        st.subheader(
            "Likely Questions"
        )

        for q in prep[
            "technical_questions"
        ]:
            st.write(f"• {q}")

        st.divider()

        st.header(
            "🧑‍💼 HR Interview"
        )

        st.subheader(
            "Topics To Focus On"
        )

        for topic in prep[
            "hr_topics"
        ]:
            st.info(topic)

        st.subheader(
            "Likely Questions"
        )

        for q in prep[
            "hr_questions"
        ]:
            st.write(f"• {q}")

        st.divider()

        st.header(
            "🚀 Project Discussion"
        )

        for q in prep[
            "project_questions"
        ]:
            st.write(f"• {q}")

        st.divider()

        st.header(
            "🎤 Mock Interviews"
        )

        interview_type = st.selectbox(
            "Choose Interview",
            [
                "Technical",
                "HR",
                "Project"
            ]
        )

        if st.button(
            "Generate Question"
        ):

            question = generate_question(
                application,
                interview_type
            )

            st.session_state[
                "current_question"
            ] = question

        if "current_question" in st.session_state:

            st.success(
                st.session_state[
                    "current_question"
                ]
            )

            answer = st.text_area(
                "Your Answer",
                height=150
            )

            if st.button(
                "Evaluate Answer"
            ):

                result = evaluate_answer(
                    st.session_state[
                        "current_question"
                    ],
                    answer
                )

                st.metric(
                    "Score",
                    f"{result['score']}/10"
                )

                st.subheader(
                    "Strengths"
                )

                for item in result[
                    "strengths"
                ]:
                    st.success(item)

                st.subheader(
                    "Improvements"
                )

                for item in result[
                    "improvements"
                ]:
                    st.warning(item)

    # --------------------
    # AI COACH
    # --------------------

    with tab6:

        st.subheader("🤖 Career Coach")

        chat_key = f"chat_{application['id']}"

        if chat_key not in st.session_state:
            st.session_state[chat_key] = []

        # Show previous messages

        for msg in st.session_state[chat_key]:

            if msg["role"] == "user":
                with st.chat_message("user"):
                    st.write(msg["content"])

            else:
                with st.chat_message("assistant"):
                    st.write(msg["content"])

        # Chat input

        prompt = st.chat_input(
            "Ask your coach..."
        )

        if prompt:

            st.session_state[chat_key].append(
                {
                    "role": "user",
                    "content": prompt
                }
            )

            with st.chat_message("user"):
                st.write(prompt)

            try:

                answer = ask_coach(
                    application,
                    prompt
                )

                st.session_state[chat_key].append(
                    {
                        "role": "assistant",
                        "content": answer
                    }
                )

                with st.chat_message("assistant"):
                    st.write(answer)

            except Exception as e:

                st.error(
                    f"AI Coach unavailable: {e}"
                )

    # --------------------
    # NOTES
    # --------------------

    with tab7:

        st.subheader(
            "📝 Notes"
        )

        notes = st.text_area(
            "Application Notes",
            value=application.get(
                "notes",
                ""
            ),
            height=250
        )

        if st.button(
            "Save Notes"
        ):

            update_notes(
                application["id"],
                notes
            )

            st.success(
                "Notes Saved"
            )