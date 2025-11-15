import os
# simple heuristics / fallback
def classify_document(text):
    if not text:
        return {"type":"Unknown","confidence":0.0,"keywords":[]}
    low = text.lower()
    if "policy" in low: return {"type":"Policy Document","confidence":0.88,"keywords":["policy"]}
    if "claim" in low and "form" in low: return {"type":"Claim Form","confidence":0.9,"keywords":["claim","form"]}
    if "invoice" in low or "bill" in low: return {"type":"Invoice","confidence":0.85,"keywords":["invoice","bill"]}
    if "inspection" in low or "report" in low: return {"type":"Inspection Report","confidence":0.82,"keywords":["inspection","report"]}
    return {"type":"General Document","confidence":0.5,"keywords":[]}
