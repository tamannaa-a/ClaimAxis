from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch
from typing import List
import textwrap
import os

MODELS_DIR = os.path.join(os.path.dirname(__file__), "..", "models")
T5_NAME = "t5-base"  # option A (offline, large)

# lazy load
_tokenizer = None
_model = None

def _ensure_model():
    global _tokenizer, _model
    if _tokenizer is None or _model is None:
        print("Loading T5 model (this may take time)...")
        _tokenizer = AutoTokenizer.from_pretrained(T5_NAME)
        _model = AutoModelForSeq2SeqLM.from_pretrained(T5_NAME)
        if torch.cuda.is_available():
            _model = _model.to('cuda')

def chunk_text(text: str, max_len=4000):
    # split the text into reasonable chunks for T5
    paragraphs = text.split('\n\n')
    chunks = []
    cur = ''
    for p in paragraphs:
        if len(cur) + len(p) < max_len:
            cur += p + '\n\n'
        else:
            chunks.append(cur)
            cur = p + '\n\n'
    if cur:
        chunks.append(cur)
    return chunks

def summarize_text(text: str, max_words=200) -> str:
    if not text:
        return ""
    _ensure_model()
    chunks = chunk_text(text, max_len=3000)
    summaries = []
    for c in chunks:
        input_text = "summarize: " + c
        inputs = _tokenizer.encode(input_text, return_tensors='pt', truncation=True, max_length=4096)
        if torch.cuda.is_available():
            inputs = inputs.to('cuda')
        outputs = _model.generate(inputs, max_length=200, min_length=50, length_penalty=2.0, num_beams=4)
        summary = _tokenizer.decode(outputs[0], skip_special_tokens=True)
        summaries.append(summary)
    # join and trim
    combined = '\n'.join(summaries)
    return textwrap.shorten(combined, width=1200, placeholder='...')

def extract_text_from_pdf(path: str) -> str:
    import pdfplumber
    text = ''
    with pdfplumber.open(path) as pdf:
        for p in pdf.pages:
            text += p.extract_text() or ''
    return text
