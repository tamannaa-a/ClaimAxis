from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import claims, docs, summarize
from app.core.logger import logger

app = FastAPI(title="ClaimAxis Backend (Theme C)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(claims.router)
app.include_router(docs.router)
app.include_router(summarize.router)

@app.get("/")
def read_root():
    return {"message": "ClaimAxis backend running"}
