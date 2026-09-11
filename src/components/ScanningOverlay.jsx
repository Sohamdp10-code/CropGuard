// ScanningOverlay — animated scanning effect shown during ML inference
import { Loader2, ScanLine } from "lucide-react";

export default function ScanningOverlay({ imageFile }) {
  const url = imageFile ? URL.createObjectURL(imageFile) : null;

  return (
    <div className="rounded-2xl overflow-hidden relative bg-gray-900" style={{ minHeight: 280 }}>
      {/* Blurred image backdrop */}
      {url && (
        <img
          src={url}
          alt=""
          aria-hidden="true"
          className="w-full h-72 object-cover opacity-40"
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gray-900/60 flex flex-col items-center justify-center gap-5">
        {/* Scan line */}
        <div className="relative w-40 h-40">
          {/* Corner brackets */}
          {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2",
            "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"
          ].map((cls, i) => (
            <div key={i} className={`absolute w-6 h-6 border-leaf-400 ${cls}`} aria-hidden="true" />
          ))}

          {/* Animated scan line */}
          <div
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-leaf-400 to-transparent animate-scan-line"
            aria-hidden="true"
          />

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-leaf-500/20 border border-leaf-400/40 flex items-center justify-center">
              <ScanLine className="w-6 h-6 text-leaf-300" />
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Loader2 className="w-4 h-4 text-leaf-300 animate-spin" />
            <p className="text-white font-semibold text-sm">Analyzing crop image…</p>
          </div>
          <p className="text-gray-400 text-xs">
            AI model is scanning for signs of disease
          </p>
        </div>
      </div>
    </div>
  );
}
