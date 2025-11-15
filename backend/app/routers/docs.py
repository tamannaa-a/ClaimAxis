from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from app.services.doc_classifier_service import classify_document
import pdfplumber, tempfile

router = APIRouter(prefix="/docs", tags=["docs"])

@router.post("/classify")
async def classify_doc(file: UploadFile = File(...)):
    raw = await file.read()
    try:
        text = raw.decode("utf-8")
    except Exception:
        tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
        tmp.write(raw)
        tmp.flush()
        text = ""
        with pdfplumber.open(tmp.name) as pdf:
            for p in pdf.pages:
                text += p.extract_text() or ""
    result = classify_document(text)
    return JSONResponse(result)
