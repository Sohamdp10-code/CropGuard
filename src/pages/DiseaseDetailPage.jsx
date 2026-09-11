// Disease Detail Page — full info view
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, CheckCircle, Bug, Activity, Lightbulb, Shield, Microscope } from "lucide-react";
import { getDiseaseById } from "../data/diseases";

const severityConfig = {
  High:     { label: "High Risk",   classes: "bg-red-100 text-red-700 border-red-200" },
  Moderate: { label: "Moderate Risk", classes: "bg-orange-100 text-orange-700 border-orange-200" },
  Low:      { label: "Low Risk",    classes: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  None:     { label: "Healthy",     classes: "bg-leaf-100 text-leaf-700 border-leaf-200" },
};

export default function DiseaseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const disease = getDiseaseById(id);

  if (!disease) {
    return (
      <main className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-7 h-7 text-red-400" />
          </div>
          <h1 className="font-bold text-xl text-gray-800 mb-2">Disease Not Found</h1>
          <p className="text-gray-500 text-sm mb-5">We couldn't find a disease matching "{id}".</p>
          <Link to="/library" className="inline-flex items-center gap-2 bg-leaf-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Library
          </Link>
        </div>
      </main>
    );
  }

  const sev = severityConfig[disease.severity] || severityConfig.Moderate;
  const isHealthy = disease.severity === "None";

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* Back nav */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Library
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">

        {/* Header card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Color strip */}
          <div className="h-3 w-full" style={{ backgroundColor: disease.color }} aria-hidden="true" />
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ backgroundColor: `${disease.color}20` }}
                role="img"
                aria-label={disease.crop}
              >
                {disease.emoji}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${sev.classes}`}>
                    {sev.label}
                  </span>
                  <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-200">
                    🌱 {disease.crop}
                  </span>
                  {disease.tags?.map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 bg-leaf-50 text-leaf-700 rounded-full text-xs font-medium border border-leaf-100">
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">{disease.name}</h1>
                <p className="text-gray-400 italic text-sm mt-0.5">{disease.scientificName}</p>
                <p className="text-gray-600 mt-3 leading-relaxed">{disease.shortDescription}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cause */}
          {!isHealthy && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Bug className="w-4 h-4 text-orange-600" />
                </div>
                <h2 className="font-bold text-gray-900">Cause</h2>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{disease.cause}</p>
            </div>
          )}

          {/* Symptoms */}
          {disease.symptoms?.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-red-500" />
                </div>
                <h2 className="font-bold text-gray-900">Symptoms</h2>
              </div>
              <ul className="space-y-2.5" role="list">
                {disease.symptoms.map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="w-5 h-5 bg-red-50 border border-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-red-500">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommended Action */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-amber-600" />
              </div>
              <h2 className="font-bold text-gray-900">Recommended Action</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{disease.recommendedAction}</p>
          </div>

          {/* Prevention */}
          {disease.prevention?.length > 0 && (
            <div className="bg-leaf-50 border border-leaf-100 rounded-2xl p-6 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-leaf-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-leaf-600" />
                </div>
                <h2 className="font-bold text-gray-900">Prevention Tips</h2>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="list">
                {disease.prevention.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-leaf-800">
                    <CheckCircle className="w-4 h-4 text-leaf-500 flex-shrink-0 mt-0.5" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-leaf-900 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-lg">Is your crop affected?</p>
            <p className="text-leaf-200 text-sm">Upload a photo for instant AI diagnosis.</p>
          </div>
          <Link
            to="/detect"
            className="inline-flex items-center gap-2 bg-leaf-500 hover:bg-leaf-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors flex-shrink-0"
          >
            <Microscope className="w-4 h-4" />
            Detect Now
          </Link>
        </div>
      </div>
    </main>
  );
}
