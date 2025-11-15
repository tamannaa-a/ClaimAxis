import joblib
import numpy as np
import os

MODEL_P = os.path.join(os.path.dirname(__file__), "..", "models", "doc_classifier.joblib")
VECT_P = os.path.join(os.path.dirname(__file__), "..", "models", "doc_vectorizer.joblib")

if os.path.exists(MODEL_P) and os.path.exists(VECT_P):
    model = joblib.load(MODEL_P)
    vectorizer = joblib.load(VECT_P)
else:
    model = None
    vectorizer = None

LABELS = {
    0: "Policy Document",
    1: "Claim Form",
    2: "Surveyor/Inspection Report",
    3: "Medical Bill",
    4: "Hospital Discharge Summary",
    5: "Repair Invoice",
    6: "Police FIR",
    7: "General Supporting Document"
}

def classify_document(text: str):
    if model is None or vectorizer is None:
        return {"label": "Unknown", "confidence": 0.0}
    x = vectorizer.transform([text])
    prob = model.predict_proba(x)[0]
    idx = int(np.argmax(prob))
    return {"label": LABELS.get(idx, "Unknown"), "confidence": float(prob[idx])}
