# CropGuard 🌿

> **AI-powered crop disease detection** — helping farmers identify and treat plant diseases from a single photo.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Sticky responsive nav with transparent hero mode
│   ├── Footer.jsx          # Footer with links and social icons
│   ├── DiseaseCard.jsx     # Library grid card
│   ├── UploadZone.jsx      # Drag-and-drop + file picker upload area
│   ├── ScanningOverlay.jsx # Animated ML scanning effect
│   └── ResultCard.jsx      # Disease result display with confidence bar
│
├── pages/
│   ├── LandingPage.jsx     # Hero, how-it-works, stats, disease preview
│   ├── DetectPage.jsx      # Upload + AI detection + results
│   ├── LibraryPage.jsx     # Searchable/filterable disease grid
│   ├── DiseaseDetailPage.jsx # Full disease info view
│   ├── HistoryPage.jsx     # localStorage scan history
│   └── AboutPage.jsx       # Mission, team, contact
│
├── services/
│   └── api.js              # API layer (mock now, real endpoint later)
│
├── data/
│   └── diseases.js         # Mock disease database (8 diseases)
│
├── hooks/
│   ├── useHistory.js       # localStorage history management hook
│   └── useDragDrop.js      # Drag-and-drop event handling hook
│
├── App.jsx                 # Router + layout
├── main.jsx                # Entry point
└── index.css               # Global styles + Tailwind v4 + design tokens
```

---

## 🔌 Backend Integration

The app is **fully ready for real API integration**. All backend calls live in one file:

**`src/services/api.js`**

```js
// Change this to your real backend URL:
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// Flip this to false when your backend is live:
const MOCK_MODE = true;
```

### Expected API contract

#### `POST /api/predict`
```
Content-Type: multipart/form-data
Body: { image: File }

Response:
{
  "disease": "Tomato Early Blight",
  "disease_id": "tomato-early-blight",
  "confidence": 0.91,
  "is_healthy": false,
  "crop": "Tomato",
  "timestamp": "2026-09-11T18:00:00Z",
  "model_version": "v1.2"
}
```

#### `GET /api/diseases`
Returns the full disease list (currently served from local `data/diseases.js`).

#### `GET /api/diseases/:id`
Returns a single disease record.

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 + Vite | Frontend framework + build tool |
| React Router v6 | Client-side routing |
| Tailwind CSS v4 | Utility-first styling |
| Axios | HTTP client (pre-configured) |
| Lucide React | Icon library |
| Recharts | (Ready to use for analytics/history charts) |

---

## 🌍 Pages & Routes

| Route | Page |
|-------|------|
| `/` | Landing page |
| `/detect` | Upload & disease detection |
| `/library` | Disease library (searchable) |
| `/library/:id` | Disease detail page |
| `/history` | Scan history (localStorage) |
| `/about` | About & mission |

---

## 🎨 Design Tokens

Custom Tailwind colours defined in `index.css`:

- **`leaf-*`** — Primary greens (50–900)
- **`earth-*`** — Amber/earth tones (50–900)  
- **`soil-*`** — Warm browns (50–900)

---

## ⚙️ Environment Variables

Create a `.env` file at the project root:

```env
VITE_API_BASE_URL=http://localhost:8000
```

---

## 📦 Build for Production

```bash
npm run build
npm run preview
```

---

## 📋 Supported Crops & Diseases (Mock Data)

| Disease | Crop | Severity |
|---------|------|----------|
| Tomato Early Blight | Tomato | Moderate |
| Wheat Stem Rust | Wheat | High |
| Rice Blast | Rice | High |
| Potato Late Blight | Potato | High |
| Northern Corn Leaf Blight | Maize | Moderate |
| Soybean Sudden Death Syndrome | Soybean | High |
| Cotton Bacterial Blight | Cotton | Moderate |
| Healthy Plant | General | None |

---

## ⚠️ Disclaimer

CropGuard is an AI-assisted tool. Results should be validated by a certified agronomist before taking any crop management action.

---

*Built with ❤️ for farmers everywhere.*
