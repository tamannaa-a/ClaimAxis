from pydantic import BaseSettings
from pathlib import Path

class Settings(BaseSettings):
    UPLOAD_DIR: str = str(Path(__file__).resolve().parent.parent / "uploads")
    MODELS_DIR: str = str(Path(__file__).resolve().parent.parent / "models")

settings = Settings()
