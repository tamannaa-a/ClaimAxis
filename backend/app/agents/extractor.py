import re
from typing import Optional
import pdfplumber

# Basic extractor — extracts claim amount, prior claim hints, keywords, and simple policy age heuristics

def _extract_text_from_pdf(path: str) -> str:
    text = ""
    try:
        with pdfplumber.open(path) as pdf:
            for p in pdf.pages:
                text += p.extract_text() or ""
    except Exception:
        return ""
    return text.lower()

def extract_entities_from_file(path: str = "", text_override: Optional[str] = None) -> dict:
    text = (text_override or "").lower()
    if not text and path:
        text = _extract_text_from_pdf(path)

    claim_amount = 0
    num_prior_claims = 0
    keywords = []

    # amount (simple heuristics)
    amount_pattern = r"(?:₹|rs\.?|inr|amount)\s*[:\-]?\s*([\d,]+)"
    amt_match = re.search(amount_pattern, text, flags=re.IGNORECASE)
    if amt_match:
        try:
            claim_amount = float(amt_match.group(1).replace(",", ""))
        except Exception:
            claim_amount = 0

    # prior claims
    prior_patterns = [r"previous claim", r"earlier claim", r"prior claim", r"last year", r"claimed before", r"filed before"]
    for p in prior_patterns:
        if re.search(p, text):
            num_prior_claims = 1
            break

    # suspicious keywords
    suspicious_words = {"fire":0.25, "theft":0.25, "duplicate":0.25, "fake":0.25, "forged":0.3, "fraud":0.3}
    for w in suspicious_words.keys():
        if w in text:
            keywords.append(w)

    days_since_policy_start = 200
    if "new policy" in text or "recently bought" in text:
        days_since_policy_start = 30
    elif "two years" in text or "old policy" in text:
        days_since_policy_start = 700

    preview = text[:300] + "..." if len(text) > 300 else text

    extracted = {
        "claim_amount": claim_amount,
        "num_prior_claims": num_prior_claims,
        "days_since_policy_start": days_since_policy_start,
        "suspicious_keyword_count": len(keywords),
        "keywords": keywords,
        "raw_text_snippet": preview,
        "full_text_length": len(text),
    }

    print("🧩 Extractor Output:", extracted)
    return extracted
