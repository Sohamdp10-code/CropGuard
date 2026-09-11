// DetectPage — Upload & Disease Detection
import { useState, useCallback } from "react";
import { RefreshCw, AlertCircle, Microscope } from "lucide-react";
import UploadZone from "../components/UploadZone";
import ScanningOverlay from "../components/ScanningOverlay";
import ResultCard from "../components/ResultCard";
import { predictDisease } from "../services/api";
import { useHistory } from "../hooks/useHistory";

const STATE = { IDLE: "idle", SCANNING: "scanning", RESULT: "result", ERROR: "error" };

export default function DetectPage() {
  const [file, setFile]     = useState(null);
  const [phase, setPhase]   = useState(STATE.IDLE);
  const [result, setResult] = useState(null);
  const [error, setError]   = useState("");
  const { saveToHistory }   = useHistory();

  const handleFile = useCallback((f) => {
    setFile(f);
    setPhase(STATE.IDLE);
    setResult(null);
    setError("");
  }, []);

  const handleClear = useCallback(() => {
    setFile(null);
    setPhase(STATE.IDLE);
    setResult(null);
    setError("");
  }, []);

  const handleAnalyze = async () => {
    if (!file) return;
    setPhase(STATE.SCANNING);
    setError("");
    try {
      const data = await predictDisease(file);
      setResult(data);
      setPhase(STATE.RESULT);

      // Persist to history
      const reader = new FileReader();
      reader.onload = (e) => {
        saveToHistory({
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          date: new Date().toISOString(),
          filename: file.name,
          thumbnail: e.target.result,
          disease: data.disease,
          disease_id: data.disease_id,
          confidence: data.confidence,
          is_healthy: data.is_healthy,
          crop: data.crop,
        });
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
      setPhase(STATE.ERROR);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPhase(STATE.IDLE);
    setResult(null);
    setError("");
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-leaf-100 rounded-xl flex items-center justify-center">
              <Microscope className="w-5 h-5 text-leaf-600" />
            </div>
            <h1 className="font-display text-3xl font-bold text-gray-900">
              Crop Disease Detection
            </h1>
          </div>
          <p className="text-gray-500 ml-13 pl-0.5">
            Upload a photo of your crop — our AI will identify any diseases in seconds.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* LEFT — Upload & scan */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-semibold text-gray-900 mb-4 text-lg">
                {phase === STATE.SCANNING ? "Scanning…" : "Upload Crop Image"}
              </h2>

              {phase === STATE.SCANNING ? (
                <ScanningOverlay imageFile={file} />
              ) : (
                <UploadZone file={file} onFile={handleFile} onClear={handleClear} />
              )}

              {/* Action buttons */}
              <div className="mt-5 flex gap-3">
                {phase !== STATE.RESULT && (
                  <button
                    onClick={handleAnalyze}
                    disabled={!file || phase === STATE.SCANNING}
                    className="flex-1 flex items-center justify-center gap-2 bg-leaf-600 hover:bg-leaf-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow hover:shadow-md hover:-translate-y-0.5 disabled:translate-y-0 disabled:shadow-none"
                    aria-label="Analyze uploaded image for disease"
                  >
                    <Microscope className="w-4 h-4" />
                    {phase === STATE.SCANNING ? "Analyzing…" : "Analyze Image"}
                  </button>
                )}
                {(phase === STATE.RESULT || phase === STATE.ERROR) && (
                  <button
                    onClick={handleReset}
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-600 font-semibold py-3 rounded-xl transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Scan Another
                  </button>
                )}
              </div>
            </div>

            {/* Tips card */}
            <div className="bg-leaf-50 border border-leaf-100 rounded-2xl p-5">
              <p className="text-leaf-800 font-semibold text-sm mb-2">📸 Tips for Best Results</p>
              <ul className="space-y-1" role="list">
                {[
                  "Use natural daylight — avoid flash or harsh shadows",
                  "Photograph the affected leaf clearly, filling most of the frame",
                  "Include both healthy and affected parts for comparison",
                  "Ensure the image is in focus — avoid blurry shots",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-leaf-700">
                    <span className="w-1.5 h-1.5 bg-leaf-500 rounded-full mt-1 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT — Results */}
          <div>
            {phase === STATE.IDLE && (
              <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-center min-h-[320px]">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <Microscope className="w-7 h-7 text-gray-300" />
                </div>
                <p className="font-semibold text-gray-400 mb-1">Results will appear here</p>
                <p className="text-sm text-gray-300">Upload an image and click Analyze to get started</p>
              </div>
            )}

            {phase === STATE.SCANNING && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 min-h-[320px] flex flex-col items-center justify-center gap-4">
                <div className="space-y-3 w-full">
                  {[80, 60, 40].map((w, i) => (
                    <div key={i} className="skeleton h-5 rounded" style={{ width: `${w}%` }} />
                  ))}
                  <div className="skeleton h-24 rounded-xl mt-4" />
                  <div className="skeleton h-4 rounded" style={{ width: "90%" }} />
                  <div className="skeleton h-4 rounded" style={{ width: "70%" }} />
                </div>
              </div>
            )}

            {phase === STATE.RESULT && result && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <ResultCard result={result} />
              </div>
            )}

            {phase === STATE.ERROR && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[320px] gap-4">
                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center">
                  <AlertCircle className="w-7 h-7 text-red-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Analysis Failed</p>
                  <p className="text-sm text-gray-500">{error}</p>
                </div>
                <button
                  onClick={handleAnalyze}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
