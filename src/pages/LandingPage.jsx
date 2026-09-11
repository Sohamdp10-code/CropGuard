// Landing Page — Hero, How It Works, Supported Crops, CTA
import { Link } from "react-router-dom";
import { Microscope, ShieldCheck, Zap, ArrowRight, Upload, ScanLine, CheckCircle, Leaf, Users, Globe } from "lucide-react";
import { diseases } from "../data/diseases";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload a Photo",
    desc: "Take a clear photo of the affected leaf or plant part and upload it directly from your phone or computer.",
    color: "bg-leaf-100 text-leaf-700",
  },
  {
    icon: ScanLine,
    step: "02",
    title: "AI Analysis",
    desc: "Our deep-learning model scans the image for visual disease markers across hundreds of known crop conditions.",
    color: "bg-earth-100 text-earth-700",
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Get Results",
    desc: "Receive the disease name, confidence score, and actionable recommendations in seconds — no agronomist needed.",
    color: "bg-leaf-100 text-leaf-700",
  },
];

const stats = [
  { label: "Crops Supported", value: "10+", icon: Leaf },
  { label: "Diseases Detected", value: "50+", icon: ShieldCheck },
  { label: "Farmers Helped", value: "2,000+", icon: Users },
  { label: "Accuracy Rate", value: "93%", icon: Zap },
];

const featuredDiseases = diseases.filter((d) => d.severity !== "None").slice(0, 3);

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section
        className="hero-pattern min-h-screen flex items-center relative overflow-hidden pt-16"
        aria-label="Hero section"
      >
        {/* Decorative blobs */}
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-leaf-500/10 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-earth-500/10 rounded-full blur-3xl" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
                <Zap className="w-3.5 h-3.5 text-earth-300" />
                <span className="text-earth-200 text-xs font-medium">
                  AI-Powered • Instant Results • Free to Use
                </span>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
                Protect Your{" "}
                <span className="text-leaf-300">Harvest</span>{" "}
                with Smart Disease Detection
              </h1>

              <p className="text-leaf-100/80 text-lg leading-relaxed mb-8 max-w-lg">
                CropGuard uses advanced AI to identify crop diseases from a single photo — helping
                farmers act early and save their fields, even without access to agricultural experts.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/detect"
                  className="inline-flex items-center gap-2 bg-leaf-500 hover:bg-leaf-400 text-white font-bold px-7 py-4 rounded-xl shadow-lg hover:shadow-leaf-500/30 hover:-translate-y-1 transition-all duration-200 text-base"
                >
                  <Microscope className="w-5 h-5" />
                  Analyze Your Crop
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/library"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-7 py-4 rounded-xl transition-all duration-200 text-base"
                >
                  Browse Diseases
                </Link>
              </div>
            </div>

            {/* Floating card mock-up */}
            <div className="hidden lg:block animate-float" aria-hidden="true">
              <div className="glass rounded-3xl p-6 max-w-sm mx-auto shadow-2xl">
                <div className="bg-leaf-900 rounded-2xl p-4 mb-4 relative overflow-hidden">
                  <div className="h-40 bg-gradient-to-br from-leaf-700 to-leaf-900 rounded-xl flex items-center justify-center">
                    <Leaf className="w-16 h-16 text-leaf-300/50" />
                  </div>
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-leaf-400 to-transparent animate-scan-line" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-semibold text-sm">Tomato Early Blight</p>
                      <p className="text-gray-400 text-xs">Detected with 91% confidence</p>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 w-[91%] bg-leaf-500 rounded-full" />
                  </div>
                  <p className="text-xs text-gray-500 bg-amber-50 border border-amber-100 rounded-lg p-2">
                    💡 Apply chlorothalonil fungicide. Remove infected leaves immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L1440 80L1440 40C1200 80 960 0 720 40C480 80 240 0 0 40L0 80Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-white py-14 border-b border-gray-100" aria-label="Statistics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="w-12 h-12 bg-leaf-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-leaf-600" />
                </div>
                <p className="font-display font-bold text-3xl text-gray-900">{value}</p>
                <p className="text-sm text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 bg-gray-50" aria-labelledby="how-it-works-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-leaf-600 font-semibold text-sm uppercase tracking-wider mb-3">
              Simple Process
            </p>
            <h2 id="how-it-works-heading" className="font-display text-4xl font-bold text-gray-900 mb-4">
              How CropGuard Works
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Get a disease diagnosis in under 30 seconds — no expertise required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-leaf-200" aria-hidden="true" />

            {steps.map(({ icon: Icon, step, title, desc, color }, i) => (
              <div key={step} className="relative text-center">
                <div className={`w-20 h-20 ${color} rounded-3xl flex flex-col items-center justify-center mx-auto mb-5 shadow-sm relative z-10`}>
                  <Icon className="w-8 h-8" />
                </div>
                <span className="text-xs font-bold text-gray-300 tracking-widest">STEP {step}</span>
                <h3 className="font-bold text-xl text-gray-900 mt-1 mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/detect"
              className="inline-flex items-center gap-2 bg-leaf-600 hover:bg-leaf-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              Try it Now — It's Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Diseases ── */}
      <section className="py-24 bg-white" aria-labelledby="diseases-preview-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-leaf-600 font-semibold text-sm uppercase tracking-wider mb-2">
                Disease Library
              </p>
              <h2 id="diseases-preview-heading" className="font-display text-4xl font-bold text-gray-900">
                Diseases We Detect
              </h2>
            </div>
            <Link
              to="/library"
              className="inline-flex items-center gap-1.5 text-leaf-600 hover:text-leaf-800 font-semibold text-sm transition-colors"
            >
              View All Diseases
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDiseases.map((d) => (
              <Link
                key={d.id}
                to={`/library/${d.id}`}
                className="group block bg-white rounded-2xl border border-gray-100 shadow-sm card-hover overflow-hidden"
              >
                <div className="h-2 w-full" style={{ backgroundColor: d.color }} aria-hidden="true" />
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl" role="img" aria-label={d.crop}>{d.emoji}</span>
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-leaf-700 transition-colors">{d.name}</p>
                      <p className="text-xs text-gray-400">{d.crop}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{d.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission CTA ── */}
      <section className="py-24 bg-leaf-900 text-white relative overflow-hidden" aria-labelledby="mission-cta">
        <div className="absolute inset-0 opacity-10" aria-hidden="true"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #4ade80 0%, transparent 60%)" }}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Globe className="w-12 h-12 text-leaf-300 mx-auto mb-6" />
          <h2 id="mission-cta" className="font-display text-4xl font-bold mb-5">
            Built for Farmers Everywhere
          </h2>
          <p className="text-leaf-100/80 text-lg leading-relaxed mb-8">
            Millions of smallholder farmers lack access to agricultural experts. CropGuard bridges
            that gap — bringing AI-powered disease detection to any smartphone, anywhere in the world.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/detect"
              className="inline-flex items-center gap-2 bg-leaf-500 hover:bg-leaf-400 text-white font-bold px-8 py-4 rounded-xl shadow hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <Microscope className="w-5 h-5" />
              Start Detecting Now
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl transition-all"
            >
              Our Mission
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
