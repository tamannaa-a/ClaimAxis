from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse
from app.services.summarizer_service import summarize_text, extract_text_from_pdf
from app.core.logger import logger
from app.core.config import settings
import os, shutil

router = APIRouter(prefix="/summarize", tags=["Summarizer"])

@router.post("/policy")
async def summarize_policy(file: UploadFile = File(None), text: str = Form(None)):
    original_text = text or ""
    if file:
        path = os.path.join(settings.UPLOAD_DIR, file.filename)
        os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
        with open(path, "wb") as f:
            shutil.copyfileobj(file.file, f)
        text = extract_text_from_pdf(path)
    else:
        text = original_text

    summary = summarize_text(text)
    return JSONResponse({"summary": summary})
