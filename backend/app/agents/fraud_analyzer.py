import numpy as np
import joblib
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "models", "fraud_model.joblib")
META_PATH = os.path.join(os.path.dirname(__file__), "..", "models", "fraud_model_meta.joblib")

clf = None
meta = None
try:
    if os.path.exists(MODEL_PATH):
        clf = joblib.load(MODEL_PATH)
    if os.path.exists(META_PATH):
        meta = joblib.load(META_PATH)
    print("✅ Fraud model loaded.")
except Exception as e:
    print("⚠️ Fraud model load failed:", e)
    clf, meta = None, None

def keyword_risk_score(text: str):
    keywords = {"fire":0.25, "theft":0.25, "duplicate":0.25, "fake":0.25, "fraud":0.3, "forged":0.3}
    text = (text or "").lower()
    score = 0
    matches = []
    for k,w in keywords.items():
        if k in text:
            score += w
            matches.append(k)
    score = min(score, 1.0)
    return score, matches

def _build_features(features: dict):
    amt = float(features.get("claim_amount", 0) or 0)
    prior = int(features.get("num_prior_claims", 0) or 0)
    days = float(features.get("days_since_policy_start", 365) or 365)
    kw = int(features.get("suspicious_keyword_count", 0) or 0)

    log_amt = np.log1p(amt)
    days_clipped = np.clip(days, 1, 5000)
    amt_per_prior = log_amt / (1 + prior)

    return np.array([[log_amt, prior, days_clipped, kw, amt_per_prior]], dtype=float)

def predict_fraud_score(features: dict, text: str = "") -> dict:
    amt = float(features.get("claim_amount", 0) or 0)
    prior = int(features.get("num_prior_claims", 0) or 0)
    days = float(features.get("days_since_policy_start", 365) or 365)

    print("\n🧠 DEBUG FRAUD INPUT ----------------------")
    print("Raw features received:", features)
    print("Text snippet:", (text or "")[:250])
    print("------------------------------------------\n")

    ml_prob = None
    if clf is not None:
        try:
            X = _build_features(features)
            ml_prob = float(clf.predict_proba(X)[0][1])
        except Exception as e:
            print("⚠️ ML prediction failed:", e)
            ml_prob = None

    rule_score = 0.0
    contributions = {}

    if amt > 500000:
        contributions["amount"] = 0.35
    elif amt > 100000:
        contributions["amount"] = 0.25
    elif amt > 50000:
        contributions["amount"] = 0.15
    else:
        contributions["amount"] = 0.05
    rule_score += contributions["amount"]

    if prior >= 2:
        contributions["prior_claims"] = 0.25
    elif prior == 1:
        contributions["prior_claims"] = 0.15
    else:
        contributions["prior_claims"] = 0.0
    rule_score += contributions["prior_claims"]

    if days < 60:
        contributions["policy_age"] = 0.25
    elif days < 180:
        contributions["policy_age"] = 0.15
    else:
        contributions["policy_age"] = 0.0
    rule_score += contributions["policy_age"]

    kw_score, matched = keyword_risk_score(text)
    contributions["keywords"] = kw_score
    rule_score += kw_score

    rule_score = min(rule_score, 1.0)

    w_ml = 0.75
    w_rule = 0.25

    if ml_prob is not None:
        final_prob = round(w_ml * ml_prob + w_rule * rule_score, 2)
    else:
        final_prob = round(rule_score, 2)

    thresholds = {"low": 0.3, "medium": 0.55, "high": 0.7}
    if final_prob >= thresholds["high"]:
        level = "High"
    elif final_prob >= thresholds["medium"]:
        level = "Medium"
    else:
        level = "Low"

    reasons = []
    if amt > 200000:
        reasons.append("High claim amount")
    if prior > 0:
        reasons.append("Prior claim history")
    if kw_score > 0:
        reasons.append(f"Suspicious keywords ({', '.join(matched)})")
    if days < 90:
        reasons.append("Recent policy start")
    if not reasons:
        reasons.append("No significant risk indicators found")

    explanation = f"{level} risk due to: {', '.join(reasons)}."

    print("\n--- FRAUD DEBUG ---")
    print("Claim amount:", amt)
    print("Prior claims:", prior)
    print("Days since policy start:", days)
    print("Keyword risk score:", kw_score)
    print("Rule score:", round(rule_score, 2))
    print("ML probability:", ml_prob)
    print("Final probability:", final_prob)
    print("Level:", level)
    print("-------------------\n")

    return {
        "ml_prob": ml_prob,
        "rule_score": round(rule_score, 2),
        "final_prob": final_prob,
        "level": level,
        "reasons": reasons,
        "matched_keywords": matched,
        "explanation": explanation,
        "contributions": contributions,
    }
