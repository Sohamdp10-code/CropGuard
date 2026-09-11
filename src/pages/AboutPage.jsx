// About Page — mission and team info
import { Link } from "react-router-dom";
import {
  Leaf, Target, Globe, Users, Zap, ShieldCheck,
  ArrowRight, Mail, BookOpen,
} from "lucide-react";


const values = [
  {
    icon: Target,
    title: "Precision",
    desc: "State-of-the-art CNN models trained on thousands of labeled crop images to deliver accurate diagnoses.",
    color: "bg-leaf-100 text-leaf-700",
  },
  {
    icon: Globe,
    title: "Accessibility",
    desc: "Designed for low-bandwidth environments — works on any smartphone browser, no app install needed.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: Users,
    title: "Community",
    desc: "Built with feedback from smallholder farmers in India, Kenya, and Bangladesh.",
    color: "bg-purple-100 text-purple-700",
  },
  {
    icon: ShieldCheck,
    title: "Trustworthiness",
    desc: "Every result includes a confidence score and recommends professional agronomist validation.",
    color: "bg-amber-100 text-amber-700",
  },
];

const team = [
  { name: "Arjun Sharma", role: "ML Engineer", initials: "AS" },
  { name: "Priya Menon", role: "Frontend Developer", initials: "PM" },
  { name: "Karan Patel", role: "Backend & API", initials: "KP" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* Hero */}
      <section className="bg-leaf-900 text-white py-20 relative overflow-hidden" aria-labelledby="about-heading">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #4ade80 0%, transparent 60%)" }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-16 h-16 bg-leaf-600/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-8 h-8 text-leaf-200" />
          </div>
          <h1 id="about-heading" className="font-display text-4xl sm:text-5xl font-bold mb-5">
            Our Mission
          </h1>
          <p className="text-leaf-100/80 text-xl leading-relaxed max-w-2xl mx-auto">
            CropGuard exists to give every farmer — regardless of location or education level — the
            power of expert-level crop disease diagnosis at their fingertips, completely free.
          </p>
        </div>
      </section>

      {/* Problem statement */}
      <section className="py-20 bg-white" aria-labelledby="problem-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-leaf-600 font-semibold text-sm uppercase tracking-wider mb-3">The Problem</p>
              <h2 id="problem-heading" className="font-display text-3xl font-bold text-gray-900 mb-5">
                Millions of Farmers Lack Expert Access
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Over 500 million smallholder farms worldwide produce 80% of the food consumed in
                  developing countries. Yet most of these farmers have no reliable access to plant
                  pathologists or agronomists.
                </p>
                <p>
                  Crop diseases cause up to <strong className="text-gray-900">40% annual yield loss</strong> globally,
                  costing hundreds of billions in economic damage — damage that often falls hardest
                  on the world's poorest farming communities.
                </p>
                <p>
                  By the time a farmer gets expert advice, it is often too late to save the crop.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "500M+", label: "Smallholder farms worldwide" },
                { value: "40%", label: "Average crop loss to disease" },
                { value: "$220B", label: "Annual economic damage" },
                { value: "1 in 3", label: "Farmers have no expert access" },
              ].map(({ value, label }) => (
                <div key={label} className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-center">
                  <p className="font-display font-bold text-2xl text-leaf-700 mb-1">{value}</p>
                  <p className="text-xs text-gray-500 leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 bg-gray-50" aria-labelledby="solution-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-leaf-600 font-semibold text-sm uppercase tracking-wider mb-3">Our Solution</p>
          <h2 id="solution-heading" className="font-display text-3xl font-bold text-gray-900 mb-5">
            AI That Works Like an Agronomist in Your Pocket
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            CropGuard's deep learning model — trained on 87,000+ annotated leaf images — can identify
            50+ diseases across 10 major crops with over 93% accuracy, returning results in under 3 seconds.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {values.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white" aria-labelledby="team-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-leaf-600 font-semibold text-sm uppercase tracking-wider mb-3">The Team</p>
          <h2 id="team-heading" className="font-display text-3xl font-bold text-gray-900 mb-3">
            Built with Purpose
          </h2>
          <p className="text-gray-500 mb-12">A student team passionate about AgriTech and social impact.</p>

          <div className="flex flex-wrap justify-center gap-6">
            {team.map(({ name, role, initials }) => (
              <div key={name} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center w-48">
                <div className="w-14 h-14 bg-leaf-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">{initials}</span>
                </div>
                <p className="font-semibold text-gray-900">{name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact + CTA */}
      <section className="py-16 bg-leaf-50 border-t border-leaf-100" aria-labelledby="contact-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="contact-heading" className="font-display text-2xl font-bold text-gray-900 mb-3">
            Get in Touch
          </h2>
          <p className="text-gray-500 mb-6">
            Have feedback, want to contribute, or need help? We'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <a
              href="mailto:contact@cropguard.ai"
              className="inline-flex items-center gap-2 bg-leaf-600 hover:bg-leaf-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email Us
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-gray-200 hover:border-gray-300 bg-white text-gray-700 font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
            <Link
              to="/library"
              className="inline-flex items-center gap-2 border border-gray-200 hover:border-gray-300 bg-white text-gray-700 font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Disease Library
            </Link>
          </div>
          <Link
            to="/detect"
            className="inline-flex items-center gap-2 text-leaf-600 hover:text-leaf-800 font-semibold"
          >
            Start detecting diseases now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
