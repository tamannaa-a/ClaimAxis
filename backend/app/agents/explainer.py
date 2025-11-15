def generate_explanation(extracted: dict, fraud_verbose: dict) -> str:
    parts = []
    lvl = fraud_verbose.get("level", "Unknown")
    score = fraud_verbose.get("final_prob", 0)
    parts.append(f"Fraud Risk: {lvl} (score {score})")

    contribs = fraud_verbose.get("contributions", {})
    if contribs:
        parts.append("Contributions:")
        for k, v in contribs.items():
            parts.append(f" - {k}: {v}")

    keywords = extracted.get("keywords", [])
    if keywords:
        parts.append("Keywords detected: " + ", ".join(keywords))

    return "\n".join(parts)
