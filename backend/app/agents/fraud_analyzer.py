import joblib, os, numpy as np

MODELS_DIR = os.path.join(os.path.dirname(__file__), "..", "models")
MODEL_PATH = os.path.join(MODELS_DIR, "fraud_model.joblib")

clf = None
if os.path.exists(MODEL_PATH):
    try:
        clf = joblib.load(MODEL_PATH)
    except Exception:
        clf = None

def _build_X(extracted):
    amt = float(extracted.get("claim_amount",0) or 0)
    prior = int(extracted.get("num_prior_claims",0) or 0)
    days = float(extracted.get("days_since_policy_start",365) or 365)
    kw = int(extracted.get("suspicious_keyword_count",0) or 0)
    log_amt = np.log1p(amt)
    return [[log_amt, prior, days, kw]]

def keyword_score(extracted):
    return min(1.0, 0.2 * extracted.get("suspicious_keyword_count",0))

def predict_fraud_score(extracted, text=""):
    amt = extracted.get("claim_amount",0) or 0
    rule = 0.0
    if amt > 500000: rule += 0.35
    elif amt > 100000: rule += 0.2
    if extracted.get("num_prior_claims",0) > 0: rule += 0.15
    if extracted.get("days_since_policy_start",365) < 90: rule += 0.15
    kw = keyword_score(extracted)
    rule += kw
    rule = min(rule,1.0)

    ml_prob = None
    if clf:
        try:
            X = _build_X(extracted)
            ml_prob = float(clf.predict_proba(X)[0][1])
        except Exception:
            ml_prob = None

    if ml_prob is not None:
        final_prob = round(0.75*ml_prob + 0.25*rule,2)
    else:
        final_prob = round(rule,2)

    if final_prob >= 0.7:
        level = "High"
    elif final_prob >= 0.55:
        level = "Medium"
    else:
        level = "Low"

    reasons=[]
    if amt>200000: reasons.append("Large claim amount")
    if extracted.get("num_prior_claims",0)>0: reasons.append("Prior claim history")
    if kw>0: reasons.append("Suspicious keywords")
    if extracted.get("days_since_policy_start",365) < 90: reasons.append("Recent policy start")
    if not reasons: reasons.append("No major red flags")

    return {
        "ml_prob": ml_prob,
        "rule_score": round(rule,2),
        "final_prob": final_prob,
        "level": level,
        "reasons": reasons
    }
