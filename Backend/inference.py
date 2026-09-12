"""TensorFlow/Keras inference isolated from HTTP handling.

This module deliberately does not guess a disease when a trained model is absent.
That prevents the application from presenting a random diagnosis as an ML result.
"""

from __future__ import annotations

import json
import os
from io import BytesIO
from pathlib import Path
from typing import Any

import numpy as np
from PIL import Image, UnidentifiedImageError

from .catalog import BY_ID


class ModelUnavailableError(RuntimeError):
    """Raised when the API was deployed without its trained model assets."""


class InvalidImageError(ValueError):
    """Raised when uploaded bytes cannot be decoded as an image."""


class CropDiseaseModel:
    def __init__(self) -> None:
        root = Path(__file__).resolve().parents[1]
        self.model_path = Path(os.getenv("MODEL_PATH", root / "models" / "cropguard.keras"))
        self.labels_path = Path(os.getenv("LABELS_PATH", root / "models" / "labels.json"))
        self.image_size = int(os.getenv("MODEL_IMAGE_SIZE", "224"))
        self._model: Any | None = None
        self._labels: list[str] | None = None

    def _load(self) -> None:
        if self._model is not None:
            return
        if not self.model_path.is_file() or not self.labels_path.is_file():
            raise ModelUnavailableError(
                "The trained model is not installed. Add cropguard.keras and labels.json to backend/models."
            )
        try:
            import tensorflow as tf
        except ImportError as exc:
            raise ModelUnavailableError("TensorFlow is not installed on this server.") from exc

        try:
            labels = json.loads(self.labels_path.read_text(encoding="utf-8"))
            if not isinstance(labels, list) or not all(isinstance(label, str) and label in BY_ID for label in labels):
                raise ValueError("labels.json must be a JSON array of supported disease ids.")
            self._model = tf.keras.models.load_model(self.model_path, compile=False)
            self._labels = labels
        except (OSError, ValueError, json.JSONDecodeError) as exc:
            raise ModelUnavailableError(f"Unable to load model assets: {exc}") from exc

    def predict(self, content: bytes) -> tuple[dict[str, Any], float]:
        self._load()
        try:
            image = Image.open(BytesIO(content)).convert("RGB")
        except (UnidentifiedImageError, OSError) as exc:
            raise InvalidImageError("Upload a valid JPEG, PNG, or WEBP image.") from exc

        # The exported model is expected to use RGB pixels normalized to 0–1.
        image = image.resize((self.image_size, self.image_size))
        batch = np.expand_dims(np.asarray(image, dtype=np.float32) / 255.0, axis=0)
        probabilities = np.asarray(self._model.predict(batch, verbose=0)).squeeze()
        if probabilities.ndim != 1 or len(probabilities) != len(self._labels):
            raise ModelUnavailableError("The model output does not match labels.json.")
        index = int(np.argmax(probabilities))
        return BY_ID[self._labels[index]], float(probabilities[index])
