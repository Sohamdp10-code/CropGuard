"""The API-facing disease catalogue.  Keep ids in sync with the frontend."""

DISEASES = [
    {"id": "tomato-early-blight", "name": "Tomato Early Blight", "crop": "Tomato", "is_healthy": False},
    {"id": "wheat-rust", "name": "Wheat Stem Rust", "crop": "Wheat", "is_healthy": False},
    {"id": "rice-blast", "name": "Rice Blast", "crop": "Rice", "is_healthy": False},
    {"id": "potato-late-blight", "name": "Potato Late Blight", "crop": "Potato", "is_healthy": False},
    {"id": "maize-northern-leaf-blight", "name": "Northern Corn Leaf Blight", "crop": "Maize", "is_healthy": False},
    {"id": "soybean-sudden-death", "name": "Soybean Sudden Death Syndrome", "crop": "Soybean", "is_healthy": False},
    {"id": "cotton-bacterial-blight", "name": "Cotton Bacterial Blight", "crop": "Cotton", "is_healthy": False},
    {"id": "healthy-plant", "name": "Healthy Plant", "crop": "General", "is_healthy": True},
]

BY_ID = {disease["id"]: disease for disease in DISEASES}
