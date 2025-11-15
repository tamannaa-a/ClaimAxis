from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse
from app.services.summarizer_service import summarize_text, extract_text_from_pdf
import tempfile

router = APIRouter(prefix="/summarize", tags=["summarize"])

@router.post("/policy")
async def summarize_policy(file: UploadFile = File(None), text: str = Form(None)):
    if file:
        raw = await file.read()
        tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
        tmp.write(raw)
        tmp.flush()
        full_text = extract_text_from_pdf(tmp.name)
    else:
        full_text = text or ""
    summary = summarize_text(full_text)
    return JSONResponse({"summary": summary})
