// ============================================================
// API Service Layer — CropGuard
// ============================================================
// ALL backend calls are centralised here.
// To swap in a real backend, change BASE_URL and remove the
// mock setTimeout wrappers — the function signatures stay identical.
// ============================================================

import axios from "axios";

// ── Config ──────────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const MOCK_MODE = true; // flip to false when real backend is live

// axios instance (pre-configured for the real backend)
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { "Content-Type": "multipart/form-data" },
});

// ── Mock helpers ─────────────────────────────────────────────
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Weighted random pick simulating a real model output
const MOCK_RESULTS = [
  {
    disease: "Tomato Early Blight",
    disease_id: "tomato-early-blight",
    confidence: 0.91,
    is_healthy: false,
    crop: "Tomato",
  },
  {
    disease: "Wheat Stem Rust",
    disease_id: "wheat-rust",
    confidence: 0.87,
    is_healthy: false,
    crop: "Wheat",
  },
  {
    disease: "Rice Blast",
    disease_id: "rice-blast",
    confidence: 0.78,
    is_healthy: false,
    crop: "Rice",
  },
  {
    disease: "Potato Late Blight",
    disease_id: "potato-late-blight",
    confidence: 0.94,
    is_healthy: false,
    crop: "Potato",
  },
  {
    disease: "Northern Corn Leaf Blight",
    disease_id: "maize-northern-leaf-blight",
    confidence: 0.82,
    is_healthy: false,
    crop: "Maize",
  },
  {
    disease: "Healthy Plant",
    disease_id: "healthy-plant",
    confidence: 0.96,
    is_healthy: true,
    crop: "General",
  },
];

// ── Public API functions ─────────────────────────────────────

/**
 * Predict disease from an uploaded image file.
 *
 * Real implementation (when MOCK_MODE = false):
 *   POST /api/predict
 *   Body: FormData { image: File }
 *   Returns: PredictionResult
 *
 * @param {File} imageFile
 * @returns {Promise<PredictionResult>}
 */
export async function predictDisease(imageFile) {
  if (MOCK_MODE) {
    // Simulate 2–3 second ML inference latency
    await delay(2000 + Math.random() * 1000);

    // Occasionally simulate an API error (5% chance)
    if (Math.random() < 0.05) {
      throw new Error("Server is temporarily unavailable. Please try again.");
    }

    const result = MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)];

    return {
      disease: result.disease,
      disease_id: result.disease_id,
      confidence: result.confidence,
      is_healthy: result.is_healthy,
      crop: result.crop,
      timestamp: new Date().toISOString(),
      model_version: "v1.0-mock",
    };
  }

  // ── Real backend call ──────────────────────────────────────
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await apiClient.post("/api/predict", formData);
  return response.data;
}

/**
 * Fetch full disease list from backend.
 * Currently returns null (we use local data/diseases.js).
 *
 * @returns {Promise<Disease[]|null>}
 */
export async function fetchDiseases() {
  if (MOCK_MODE) {
    await delay(400);
    return null; // caller falls back to local data
  }

  const response = await apiClient.get("/api/diseases");
  return response.data;
}

/**
 * Fetch single disease detail by ID.
 *
 * @param {string} diseaseId
 * @returns {Promise<Disease|null>}
 */
export async function fetchDiseaseById(diseaseId) {
  if (MOCK_MODE) {
    await delay(200);
    return null; // caller falls back to local data
  }

  const response = await apiClient.get(`/api/diseases/${diseaseId}`);
  return response.data;
}

export default { predictDisease, fetchDiseases, fetchDiseaseById };
