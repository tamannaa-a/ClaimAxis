from fastapi import APIRouter, File, UploadFile, Form
from fastapi.responses import JSONResponse
from app.agents.extractor import extract_entities_from_file
from app.agents.fraud_analyzer import predict_fraud_score
from app.agents.explainer import generate_explanation

router = APIRouter(prefix="/claims", tags=["claims"])

@router.post("/analyze")
async def analyze_claim(file: UploadFile = File(None), text: str = Form(None)):
    extracted = extract_entities_from_file(file, text_override=text)
    fraud_verbose = predict_fraud_score(extracted, text=extracted.get("full_text",""))
    explanation = generate_explanation(extracted, fraud_verbose)
    return JSONResponse({
        "extracted": extracted,
        "fraud": {
            "final_score": fraud_verbose["final_prob"],
            "level": fraud_verbose["level"],
            "reasons": fraud_verbose["reasons"]
        },
        "explanation": explanation
    })
