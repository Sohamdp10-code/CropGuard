import { BrowserRouter, Routes, Route, ScrollRestoration } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import DetectPage from "./pages/DetectPage";
import LibraryPage from "./pages/LibraryPage";
import DiseaseDetailPage from "./pages/DiseaseDetailPage";
import HistoryPage from "./pages/HistoryPage";
import AboutPage from "./pages/AboutPage";

// 404 fallback
function NotFoundPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
      <div className="text-center max-w-sm px-4">
        <p className="text-8xl font-display font-bold text-leaf-200 mb-4">404</p>
        <h1 className="font-bold text-2xl text-gray-800 mb-2">Page Not Found</h1>
        <p className="text-gray-500 text-sm mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-leaf-600 hover:bg-leaf-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Go Home
        </a>
      </div>
    </main>
  );
}

// Scroll to top on route change
function ScrollToTop() {
  if (typeof window !== "undefined") {
    window.scrollTo(0, 0);
  }
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/detect" element={<DetectPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/library/:id" element={<DiseaseDetailPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
