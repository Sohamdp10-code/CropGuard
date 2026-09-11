// ============================================================
// Mock Disease Database — swap this with a real API/DB later
// ============================================================

export const diseases = [
  {
    id: "tomato-early-blight",
    name: "Tomato Early Blight",
    crop: "Tomato",
    scientificName: "Alternaria solani",
    emoji: "🍅",
    severity: "Moderate",
    color: "#ef4444",
    shortDescription:
      "Fungal disease causing dark concentric rings on lower leaves, leading to premature defoliation.",
    cause:
      "Caused by the fungus Alternaria solani, which thrives in warm, humid conditions (24–29°C) with alternating wet and dry periods.",
    symptoms: [
      "Dark brown to black lesions with concentric rings (target-board pattern)",
      "Yellow chlorotic halo surrounding lesions",
      "Lesions first appear on older, lower leaves",
      "Premature leaf drop and defoliation",
      "Dark sunken lesions may appear on stems and fruits",
    ],
    recommendedAction:
      "Remove and destroy infected plant debris. Apply fungicides containing chlorothalonil or mancozeb at first sign of disease. Ensure proper spacing for air circulation. Rotate crops for 2–3 years. Water at the base to keep foliage dry.",
    prevention: [
      "Use certified disease-free seeds",
      "Practice crop rotation (2–3 year cycle)",
      "Maintain proper plant spacing",
      "Avoid overhead irrigation",
      "Apply mulch to prevent soil splash",
    ],
    tags: ["fungal", "common", "defoliation"],
  },
  {
    id: "wheat-rust",
    name: "Wheat Stem Rust",
    crop: "Wheat",
    scientificName: "Puccinia graminis",
    emoji: "🌾",
    severity: "High",
    color: "#f97316",
    shortDescription:
      "A devastating fungal disease producing reddish-brown pustules on stems and leaves, severely reducing yield.",
    cause:
      "Caused by Puccinia graminis f. sp. tritici. Spreads via wind-blown spores over long distances; thrives in warm, moist weather (18–30°C).",
    symptoms: [
      "Reddish-brown elongated pustules (uredinia) on stems, leaves, and leaf sheaths",
      "Pustules rupture to release brick-red powdery spores",
      "Infected stems become weak and lodge easily",
      "Premature ripening and shriveled grain",
      "Black teliospore pustules form late in season",
    ],
    recommendedAction:
      "Plant rust-resistant wheat varieties. Apply triazole-based fungicides (propiconazole, tebuconazole) as a protective or curative measure. Monitor fields regularly during heading stage. Report outbreaks to local agricultural department.",
    prevention: [
      "Use resistant/tolerant wheat varieties",
      "Early planting to avoid peak spore periods",
      "Eliminate volunteer wheat plants",
      "Regular field scouting",
      "Timely fungicide application",
    ],
    tags: ["fungal", "wind-spread", "high-risk"],
  },
  {
    id: "rice-blast",
    name: "Rice Blast",
    crop: "Rice",
    scientificName: "Magnaporthe oryzae",
    emoji: "🌾",
    severity: "High",
    color: "#a855f7",
    shortDescription:
      "The most destructive rice disease worldwide, causing diamond-shaped lesions on leaves and neck rot.",
    cause:
      "Caused by the fungus Magnaporthe oryzae. High humidity (>90%), prolonged leaf wetness, and moderate temperatures (24–28°C) favor infection.",
    symptoms: [
      "Diamond or spindle-shaped lesions with gray/white centers and brown borders",
      "Neck rot — the panicle neck turns brown and breaks (rotten neck)",
      "Node blast causing dark brown discoloration at nodes",
      "Lesions coalesce in severe infections, killing entire leaves",
      "White or empty grain heads",
    ],
    recommendedAction:
      "Use blast-resistant varieties. Avoid excessive nitrogen fertilization. Apply tricyclazole or azoxystrobin fungicides preventively. Drain fields periodically. Destroy infected plant debris after harvest.",
    prevention: [
      "Plant blast-resistant varieties",
      "Balanced NPK fertilization (avoid excess N)",
      "Silicon fertilization strengthens cell walls",
      "Proper water management",
      "Avoid dense planting",
    ],
    tags: ["fungal", "destructive", "worldwide"],
  },
  {
    id: "potato-late-blight",
    name: "Potato Late Blight",
    crop: "Potato",
    scientificName: "Phytophthora infestans",
    emoji: "🥔",
    severity: "High",
    color: "#6366f1",
    shortDescription:
      "The infamous pathogen behind the Irish Potato Famine — causes water-soaked lesions and rapid plant collapse.",
    cause:
      "Caused by the oomycete Phytophthora infestans. Cool (10–20°C), wet weather with high humidity triggers explosive outbreaks within 2–3 days.",
    symptoms: [
      "Water-soaked, pale green lesions at leaf margins and tips",
      "Lesions rapidly turn dark brown/black",
      "White sporulating mycelium visible on undersides of leaves in humid conditions",
      "Entire canopy can collapse within days",
      "Tubers show reddish-brown rot beneath the skin",
    ],
    recommendedAction:
      "Act immediately — this disease spreads explosively. Destroy infected foliage. Apply protectant fungicides (mancozeb) and systemic fungicides (metalaxyl). Do not irrigate overhead. Harvest tubers before disease reaches them.",
    prevention: [
      "Plant certified disease-free seed potatoes",
      "Use late-blight resistant varieties",
      "Destroy volunteer plants and cull piles",
      "Proper hilling to protect tubers",
      "Preventive fungicide applications during cool/wet weather",
    ],
    tags: ["oomycete", "explosive", "historic"],
  },
  {
    id: "maize-northern-leaf-blight",
    name: "Northern Corn Leaf Blight",
    crop: "Maize",
    scientificName: "Exserohilum turcicum",
    emoji: "🌽",
    severity: "Moderate",
    color: "#eab308",
    shortDescription:
      "Fungal disease producing long, tan cigar-shaped lesions on corn leaves, reducing photosynthesis and yield.",
    cause:
      "Caused by Exserohilum turcicum. Spreads by wind and rain in cool, wet conditions (18–27°C). Overwinters in infected crop debris.",
    symptoms: [
      "Long (5–15 cm) elliptical, tan/gray-green lesions on leaves",
      "Lesions have a distinctive cigar or canoe shape",
      "Dark olive-green spore masses on lesions in humid weather",
      "Lesions first appear on lower leaves and progress upward",
      "Severe infection can cause complete blighting before silking",
    ],
    recommendedAction:
      "Plant resistant hybrids. Apply fungicides (azoxystrobin + propiconazole) at early tassel stage if disease appears before silking. Manage crop debris by tillage or rotation. Avoid monoculture.",
    prevention: [
      "Resistant corn hybrids",
      "Crop rotation (non-host crops)",
      "Tillage to bury infected debris",
      "Proper fertilization",
      "Monitor fields from V6 onwards",
    ],
    tags: ["fungal", "wind-spread", "moderate"],
  },
  {
    id: "soybean-sudden-death",
    name: "Soybean Sudden Death Syndrome",
    crop: "Soybean",
    scientificName: "Fusarium virguliforme",
    emoji: "🫘",
    severity: "High",
    color: "#84cc16",
    shortDescription:
      "Root rot disease causing foliar scorch and interveinal chlorosis mid-season, with roots showing blue-white fungal growth.",
    cause:
      "Caused by Fusarium virguliforme. Cool, wet soils at planting favor root infection; foliar symptoms appear mid-season during pod fill.",
    symptoms: [
      "Interveinal chlorosis (yellowing between leaf veins)",
      "Brown necrotic scorch between veins",
      "Leaflets drop but petioles remain attached",
      "Brown, rotted root cortex with blue-white fungal growth",
      "Discolored, decayed taproot and lateral roots",
    ],
    recommendedAction:
      "Use seed treatments with fluopyram or metalaxyl. Plant in well-drained, warm soils. Choose SDS-tolerant varieties. Manage soybean cyst nematode, which worsens SDS. Avoid compaction.",
    prevention: [
      "SDS-tolerant soybean varieties",
      "Improved drainage (tile drainage if possible)",
      "Avoid planting in cold, waterlogged soils",
      "Seed treatment fungicides",
      "Manage SCN populations",
    ],
    tags: ["fungal", "root-rot", "mid-season"],
  },
  {
    id: "cotton-bacterial-blight",
    name: "Cotton Bacterial Blight",
    crop: "Cotton",
    scientificName: "Xanthomonas citri pv. malvacearum",
    emoji: "🌿",
    severity: "Moderate",
    color: "#f59e0b",
    shortDescription:
      "Bacterial disease causing angular water-soaked leaf spots, blackarm on stems, and boll rot.",
    cause:
      "Caused by Xanthomonas citri pv. malvacearum. Spreads by rain splash, wind, and infected seed. Warm temperatures (28–32°C) and high humidity favor spread.",
    symptoms: [
      "Small, angular, water-soaked leaf spots turning dark brown",
      "Lesions surrounded by yellow halo",
      "Blackarm — dark sunken lesions on stems and petioles",
      "Severe defoliation in high humidity",
      "Boll infections causing partial or complete rot",
    ],
    recommendedAction:
      "Use resistant varieties. Apply copper-based bactericides (copper hydroxide). Use disease-free, acid-delinted seed. Avoid working in wet fields. Remove and destroy infected plant debris.",
    prevention: [
      "Resistant cotton varieties",
      "Certified disease-free seed",
      "Acid-delinting seed treatment",
      "Avoid field operations when wet",
      "Crop rotation",
    ],
    tags: ["bacterial", "seed-borne", "boll-rot"],
  },
  {
    id: "healthy-plant",
    name: "Healthy Plant",
    crop: "General",
    scientificName: "N/A",
    emoji: "✅",
    severity: "None",
    color: "#22c55e",
    shortDescription:
      "No disease detected. The crop appears healthy with normal leaf color, texture, and structure.",
    cause: "N/A — This is a healthy plant.",
    symptoms: [
      "Uniform green leaf color appropriate for the crop",
      "No spots, lesions, or discoloration",
      "Strong stem structure",
      "Normal leaf texture and shape",
      "No signs of wilting or defoliation",
    ],
    recommendedAction:
      "Continue regular monitoring. Maintain balanced fertilization, proper irrigation, and good agronomic practices to keep the crop healthy throughout the growing season.",
    prevention: [
      "Regular field scouting (weekly)",
      "Balanced soil nutrition (NPK + micronutrients)",
      "Proper irrigation management",
      "Integrated Pest Management (IPM)",
      "Record keeping for future reference",
    ],
    tags: ["healthy", "no-action-needed"],
  },
];

export const cropTypes = [
  "All",
  ...Array.from(new Set(diseases.map((d) => d.crop))),
];

export const getDiseaseById = (id) => diseases.find((d) => d.id === id);

export const getDiseaseByName = (name) =>
  diseases.find(
    (d) => d.name.toLowerCase() === name.toLowerCase()
  ) || null;

export default diseases;
