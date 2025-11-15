import re, tempfile, pdfplumber
from typing import Optional

def _text_from_upload(file):
    if file is None:
        return ""
    try:
        content = file.file.read()
        try:
            return content.decode('utf-8')
        except Exception:
            tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
            tmp.write(content)
            tmp.flush()
            text = ""
            with pdfplumber.open(tmp.name) as pdf:
                for p in pdf.pages:
                    text += p.extract_text() or ""
            return text
    except Exception:
        return ""

def extract_entities_from_file(file=None, text_override: Optional[str]=None):
    text = (text_override or "").strip()
    if not text:
        text = _text_from_upload(file).strip()

    if text is None:
        text = ""

    claim_amount = 0.0
    m = re.search(r"(?:rs|₹|inr|amount)\s*[:\-]?\s*([\d,]+)", text, flags=re.I)
    if m:
        try:
            claim_amount = float(m.group(1).replace(",",""))
        except:
            claim_amount = 0.0

    prior = 0
    if re.search(r"prior claim|previous claim|claimed before|earlier claim", text, flags=re.I):
        prior = 1

    suspicious_keywords = []
    for k in ["fraud","fake","forged","duplicate","theft","arson"]:
        if k in text.lower():
            suspicious_keywords.append(k)

    days_since_policy_start = 365
    if re.search(r"new policy|recently bought|policy start", text, flags=re.I):
        days_since_policy_start = 30

    preview = text[:1000] + ("..." if len(text) > 1000 else "")
    return {
        "claim_amount": claim_amount,
        "num_prior_claims": prior,
        "days_since_policy_start": days_since_policy_start,
        "suspicious_keywords": suspicious_keywords,
        "suspicious_keyword_count": len(suspicious_keywords),
        "raw_text": preview,
        "full_text": text,
        "full_text_length": len(text)
    }
