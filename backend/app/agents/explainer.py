def generate_explanation(extracted, fraud_verbose):
    lines = []
    lines.append(f"Predicted fraud level: {fraud_verbose.get('level')} (score {fraud_verbose.get('final_prob')})")
    lines.append("Key signals:")
    lines.append(f" - Claim amount: {extracted.get('claim_amount')}")
    lines.append(f" - Prior claims: {extracted.get('num_prior_claims')}")
    lines.append(f" - Policy age (days): {extracted.get('days_since_policy_start')}")
    kws = extracted.get("suspicious_keywords",[])
    if kws:
        lines.append(" - Suspicious keywords: " + ", ".join(kws))
    lines.append("Decision basis: ensemble of rules + optional ML model (if trained).")
    return "\n".join(lines)
