// Reusable result card shown after ML prediction
import { CheckCircle, AlertTriangle, TrendingUp, Lightbulb, Bug, Sprout } from "lucide-react";
import { getDiseaseByName } from "../data/diseases";

function ConfidenceBar({ value }) {
  const pct = Math.round(value * 100);
  const color =
    pct >= 85 ? "bg-leaf-500" : pct >= 65 ? "bg-earth-500" : "bg-red-400";

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-gray-500 font-medium">Confidence</span>
        <span className="text-sm font-bold text-gray-800">{pct}%</span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full confidence-bar ${color}`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Confidence: ${pct}%`}
        />
      </div>
    </div>
  );
}

export default function ResultCard({ result }) {
  if (!result) return null;

  const dbEntry = getDiseaseByName(result.disease);
  const isHealthy = result.is_healthy;

  return (
    <div className="animate-fade-in space-y-5">
      {/* Header banner */}
      <div
        className={`rounded-2xl p-5 flex items-start gap-4 ${
          isHealthy
            ? "bg-leaf-50 border border-leaf-200"
            : "bg-red-50 border border-red-200"
        }`}
      >
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isHealthy ? "bg-leaf-100" : "bg-red-100"
          }`}
        >
          {isHealthy ? (
            <CheckCircle className="w-6 h-6 text-leaf-600" />
          ) : (
            <AlertTriangle className="w-6 h-6 text-red-500" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-0.5">
            {isHealthy ? "Status: Healthy" : "Disease Detected"}
          </p>
          <h2 className="text-xl font-bold text-gray-900 leading-tight">
            {result.disease}
          </h2>
          {dbEntry?.scientificName && dbEntry.scientificName !== "N/A" && (
            <p className="text-sm text-gray-500 italic mt-0.5">
              {dbEntry.scientificName}
            </p>
          )}
          {result.crop && (
            <span className="inline-block mt-2 px-2.5 py-0.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600">
              🌱 {result.crop}
            </span>
          )}
        </div>
      </div>

      {/* Confidence */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <ConfidenceBar value={result.confidence} />
      </div>

      {/* Disease info from local DB */}
      {dbEntry && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Short description */}
          <div className="p-5 border-b border-gray-50">
            <p className="text-gray-600 text-sm leading-relaxed">
              {dbEntry.shortDescription}
            </p>
          </div>

          {/* Cause */}
          {!isHealthy && (
            <div className="p-5 border-b border-gray-50">
              <div className="flex items-center gap-2 mb-2">
                <Bug className="w-4 h-4 text-orange-500" />
                <h3 className="font-semibold text-gray-800 text-sm">Cause</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{dbEntry.cause}</p>
            </div>
          )}

          {/* Symptoms */}
          {dbEntry.symptoms?.length > 0 && !isHealthy && (
            <div className="p-5 border-b border-gray-50">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-red-400" />
                <h3 className="font-semibold text-gray-800 text-sm">Key Symptoms</h3>
              </div>
              <ul className="space-y-1.5" role="list">
                {dbEntry.symptoms.slice(0, 3).map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommended Action */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-earth-500" />
              <h3 className="font-semibold text-gray-800 text-sm">Recommended Action</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {dbEntry.recommendedAction}
            </p>
          </div>
        </div>
      )}

      {/* Healthy extra tips */}
      {isHealthy && (
        <div className="bg-leaf-50 border border-leaf-100 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sprout className="w-4 h-4 text-leaf-600" />
            <h3 className="font-semibold text-leaf-800 text-sm">Keep it growing strong</h3>
          </div>
          <ul className="space-y-1.5" role="list">
            {["Continue regular field monitoring", "Maintain balanced nutrition", "Practice crop rotation"].map(
              (tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-leaf-700">
                  <span className="w-1.5 h-1.5 bg-leaf-500 rounded-full mt-1.5 flex-shrink-0" />
                  {tip}
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 text-center">
        ⚠️ This is an AI-assisted result. Please consult a certified agronomist for final diagnosis.
      </p>
    </div>
  );
}
