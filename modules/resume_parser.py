from pypdf import PdfReader
import re


def extract_resume_text(pdf_file):

    reader = PdfReader(pdf_file)

    text = ""

    for page in reader.pages:

        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    text = re.sub(
        r"\s+",
        " ",
        text
    )

    return text.strip()