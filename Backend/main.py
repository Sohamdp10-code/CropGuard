from __future__ import annotations

import os
from datetime import datetime, timezone

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from .catalog import BY_ID, DISEASES
from .inference import CropDiseaseModel, InvalidImageError, ModelUnavailableError

MAX_IMAGE_BYTES = 10 * 1024 * 1024
ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp"}

app = FastAPI(title="CropGuard API", version="1.0.0")
origins = [origin.strip() for origin in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",") if origin.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)
model = CropDiseaseModel()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "cropguard-api"}


@app.get("/api/diseases")
def list_diseases() -> list[dict[str, object]]:
    return DISEASES


@app.get("/api/diseases/{disease_id}")
def disease_detail(disease_id: str) -> dict[str, object]:
    disease = BY_ID.get(disease_id)
    if disease is None:
        raise HTTPException(status_code=404, detail="Disease not found.")
    return disease


@app.post("/api/predict")
async def predict(image: UploadFile = File(...)) -> dict[str, object]:
    if image.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=415, detail="Only JPEG, PNG, and WEBP images are supported.")
    content = await image.read(MAX_IMAGE_BYTES + 1)
    if not content:
        raise HTTPException(status_code=400, detail="The uploaded image is empty.")
    if len(content) > MAX_IMAGE_BYTES:
        raise HTTPException(status_code=413, detail="Image must be 10 MB or smaller.")
    try:
        disease, confidence = model.predict(content)
    except InvalidImageError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except ModelUnavailableError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc

    return {
        "disease": disease["name"],
        "disease_id": disease["id"],
        "confidence": round(confidence, 4),
        "is_healthy": disease["is_healthy"],
        "crop": disease["crop"],
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "model_version": os.getenv("MODEL_VERSION", "v1.0"),
    }
