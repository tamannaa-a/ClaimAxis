from fastapi import APIRouter, UploadFile, File
from app.services.doc_classifier_service import classify_document
from app.core.logger import logger
import os

router = APIRouter(prefix="/docs", tags=["Document Classification"])

@router.post("/classify")
async def classify_doc(file: UploadFile = File(...)):
    # read bytes and try to extract text (assume text-based PDF or plain text)
    raw = await file.read()
    try:
        text = raw.decode("utf-8")
    except Exception:
        # fallback: save and let pdfplumber extract
        path = "temp_upload.pdf"
        with open(path, "wb") as f:
            f.write(raw)
        import pdfplumber
        text = ""
        with pdfplumber.open(path) as pdf:
            for p in pdf.pages:
                text += p.extract_text() or ""
        try:
            os.remove(path)
        except Exception:
            pass

    result = classify_document(text)
    logger.info(f"Document classified: {result}")
    return {"document_type": result["label"], "confidence": result["confidence"]}
