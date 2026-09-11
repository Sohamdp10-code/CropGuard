// Disease Library — searchable + filterable grid
import { useState, useMemo } from "react";
import { Search, BookOpen, Filter } from "lucide-react";
import DiseaseCard from "../components/DiseaseCard";
import { diseases, cropTypes } from "../data/diseases";

export default function LibraryPage() {
  const [query, setQuery]       = useState("");
  const [cropFilter, setCropFilter] = useState("All");

  const filtered = useMemo(() => {
    return diseases.filter((d) => {
      const matchesCrop = cropFilter === "All" || d.crop === cropFilter;
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.crop.toLowerCase().includes(q) ||
        d.shortDescription.toLowerCase().includes(q) ||
        d.tags?.some((t) => t.includes(q));
      return matchesCrop && matchesQuery;
    });
  }, [query, cropFilter]);

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-leaf-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-leaf-600" />
            </div>
            <h1 className="font-display text-3xl font-bold text-gray-900">Disease Library</h1>
          </div>
          <p className="text-gray-500">
            Browse and learn about common crop diseases — causes, symptoms, and remedies.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search diseases, crops, symptoms…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-leaf-400 focus:border-leaf-400"
              aria-label="Search diseases"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
            <select
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
              className="pl-9 pr-8 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-leaf-400 focus:border-leaf-400 appearance-none cursor-pointer min-w-[160px]"
              aria-label="Filter by crop type"
            >
              {cropTypes.map((c) => (
                <option key={c} value={c}>{c === "All" ? "All Crops" : c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Count */}
        <p className="text-sm text-gray-400 mb-6">
          Showing <span className="font-semibold text-gray-700">{filtered.length}</span> of {diseases.length} entries
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((d) => (
              <DiseaseCard key={d.id} disease={d} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-gray-300" />
            </div>
            <p className="font-semibold text-gray-500 mb-1">No results found</p>
            <p className="text-sm text-gray-400">Try a different search term or crop filter.</p>
            <button
              onClick={() => { setQuery(""); setCropFilter("All"); }}
              className="mt-4 text-sm text-leaf-600 hover:text-leaf-800 font-medium underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
