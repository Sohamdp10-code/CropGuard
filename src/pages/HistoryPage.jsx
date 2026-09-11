// History Page — localStorage scan history
import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Trash2, Trash, CheckCircle, AlertTriangle, Search, Microscope } from "lucide-react";
import { useHistory } from "../hooks/useHistory";

function ConfidencePill({ value }) {
  const pct = Math.round(value * 100);
  const color =
    pct >= 85 ? "bg-leaf-100 text-leaf-700" : pct >= 65 ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700";
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${color}`}>{pct}%</span>
  );
}

export default function HistoryPage() {
  const { history, clearHistory, removeEntry } = useHistory();
  const [search, setSearch] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);

  const filtered = history.filter(
    (e) =>
      !search ||
      e.disease?.toLowerCase().includes(search.toLowerCase()) ||
      e.crop?.toLowerCase().includes(search.toLowerCase()) ||
      e.filename?.toLowerCase().includes(search.toLowerCase())
  );

  const handleClearAll = () => {
    if (confirmClear) {
      clearHistory();
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-leaf-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-leaf-600" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-gray-900">Scan History</h1>
                <p className="text-gray-500 text-sm">
                  {history.length} scan{history.length !== 1 ? "s" : ""} stored locally
                </p>
              </div>
            </div>

            {history.length > 0 && (
              <button
                onClick={handleClearAll}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  confirmClear
                    ? "bg-red-500 text-white"
                    : "border border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500"
                }`}
                aria-label="Clear all scan history"
              >
                <Trash className="w-4 h-4" />
                {confirmClear ? "Confirm Delete All" : "Clear All"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Empty state */}
        {history.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-5">
              <Clock className="w-9 h-9 text-gray-300" />
            </div>
            <h2 className="font-bold text-xl text-gray-500 mb-2">No scans yet</h2>
            <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
              Your scan history will appear here once you analyze a crop image.
            </p>
            <Link
              to="/detect"
              className="inline-flex items-center gap-2 bg-leaf-600 hover:bg-leaf-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <Microscope className="w-4 h-4" />
              Analyze Your First Crop
            </Link>
          </div>
        )}

        {history.length > 0 && (
          <>
            {/* Search */}
            <div className="relative mb-6 max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
              <input
                type="search"
                placeholder="Filter history…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-leaf-400"
                aria-label="Filter scan history"
              />
            </div>

            {/* List */}
            {filtered.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-12">No matches for "{search}"</p>
            ) : (
              <div className="space-y-3">
                {filtered.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 group animate-fade-in"
                  >
                    {/* Thumbnail */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                      {entry.thumbnail ? (
                        <img
                          src={entry.thumbnail}
                          alt={`Scan thumbnail for ${entry.disease}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Microscope className="w-5 h-5 text-gray-300" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        {entry.is_healthy ? (
                          <CheckCircle className="w-4 h-4 text-leaf-500 flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                        )}
                        <p className="font-semibold text-gray-900 text-sm truncate">
                          {entry.disease}
                        </p>
                        <ConfidencePill value={entry.confidence} />
                      </div>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        {entry.crop && (
                          <span className="text-xs text-gray-400">🌱 {entry.crop}</span>
                        )}
                        <span className="text-xs text-gray-300">·</span>
                        <span className="text-xs text-gray-400 truncate max-w-[140px]">
                          {entry.filename}
                        </span>
                        <span className="text-xs text-gray-300">·</span>
                        <span className="text-xs text-gray-400">
                          {new Date(entry.date).toLocaleDateString(undefined, {
                            day: "numeric", month: "short", year: "numeric",
                          })}
                          {" "}
                          {new Date(entry.date).toLocaleTimeString(undefined, {
                            hour: "2-digit", minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {entry.disease_id && (
                        <Link
                          to={`/library/${entry.disease_id}`}
                          className="hidden sm:flex items-center gap-1 text-xs text-leaf-600 hover:text-leaf-800 font-medium border border-leaf-200 hover:border-leaf-400 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          View Info
                        </Link>
                      )}
                      <button
                        onClick={() => removeEntry(entry.id)}
                        aria-label={`Delete scan for ${entry.disease}`}
                        className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="text-xs text-gray-400 text-center mt-8">
              History is stored in your browser only. Clearing browser data will erase it.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
