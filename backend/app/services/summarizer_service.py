import pdfplumber, textwrap

def extract_text_from_pdf(path):
    text = ""
    try:
        with pdfplumber.open(path) as pdf:
            for p in pdf.pages:
                text += p.extract_text() or ""
    except Exception:
        return ""
    return text

def summarize_text(text, max_words=200):
    if not text:
        return "No text provided."
    paras = [p.strip() for p in text.split("\n\n") if p.strip()]
    paras.sort(key=lambda p: len(p), reverse=True)
    selected = paras[:3]
    combined = " ".join(selected)
    return textwrap.shorten(combined, width=1200, placeholder="...")
