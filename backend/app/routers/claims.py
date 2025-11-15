from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse
from app.agents.extractor import extract_entities_from_file
from app.agents.fraud_analyzer import predict_fraud_score
from app.agents.explainer import generate_explanation
from app.core.config import settings
from app.core.logger import logger
import os, shutil

router = APIRouter(prefix="/claims", tags=["Claims"])

@router.post("/analyze")
async def analyze_claim(file: UploadFile = File(None), text: str = Form(None)):
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    filepath = None
    original_text = text or ""

    if file:
        filename = file.filename
        filepath = os.path.join(settings.UPLOAD_DIR, filename)
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        logger.info(f"Saved uploaded file: {filepath}")

    extracted = extract_entities_from_file(filepath or "", text_override=original_text)
    logger.info(f"Extracted keys: {list(extracted.keys())}")

    features = {
        "claim_amount": float(extracted.get("claim_amount") or 0.0),
        "num_prior_claims": int(extracted.get("num_prior_claims") or 0),
        "days_since_policy_start": float(extracted.get("days_since_policy_start") or 365.0),
        "suspicious_keyword_count": int(extracted.get("suspicious_keyword_count") or 0)
    }

    full_text_for_analysis = extracted.get("raw_text_snippet") or original_text or ""

    fraud_verbose = predict_fraud_score(features, text=full_text_for_analysis)
    explanation = generate_explanation(extracted, fraud_verbose)

    response = {
        "extracted": extracted,
        "fraud_verbose": fraud_verbose,
        "fraud": {"score": fraud_verbose.get("final_prob"), "level": fraud_verbose.get("level")},
        "explanation": explanation,
    }

    return JSONResponse(response)
