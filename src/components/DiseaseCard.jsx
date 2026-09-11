// DiseaseCard — grid card for the Disease Library
import { Link } from "react-router-dom";
import { AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";

const severityConfig = {
  High:     { color: "bg-red-100 text-red-700 border-red-200",    dot: "bg-red-500" },
  Moderate: { color: "bg-orange-100 text-orange-700 border-orange-200", dot: "bg-orange-500" },
  Low:      { color: "bg-yellow-100 text-yellow-700 border-yellow-200", dot: "bg-yellow-500" },
  None:     { color: "bg-leaf-100 text-leaf-700 border-leaf-200",  dot: "bg-leaf-500" },
};

export default function DiseaseCard({ disease }) {
  const sev = severityConfig[disease.severity] || severityConfig.Moderate;
  const isHealthy = disease.severity === "None";

  return (
    <Link
      to={`/library/${disease.id}`}
      className="block bg-white rounded-2xl border border-gray-100 shadow-sm card-hover overflow-hidden group focus-visible:ring-2 focus-visible:ring-leaf-500 focus-visible:ring-offset-2"
      aria-label={`View details for ${disease.name}`}
    >
      {/* Colour strip */}
      <div
        className="h-2 w-full"
        style={{ backgroundColor: disease.color }}
        aria-hidden="true"
      />

      <div className="p-5">
        {/* Emoji + crop badge */}
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl" role="img" aria-label={disease.crop}>
            {disease.emoji}
          </span>
          <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
            {disease.crop}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-bold text-gray-900 text-base leading-snug mb-1 group-hover:text-leaf-700 transition-colors">
          {disease.name}
        </h3>
        <p className="text-xs text-gray-400 italic mb-3">{disease.scientificName}</p>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
          {disease.shortDescription}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${sev.color}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${sev.dot}`} aria-hidden="true" />
            {isHealthy ? "Healthy" : `${disease.severity} Risk`}
          </span>

          <span className="flex items-center gap-1 text-xs text-leaf-600 font-medium group-hover:gap-2 transition-all">
            Details
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
