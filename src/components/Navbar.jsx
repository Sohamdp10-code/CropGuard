import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Leaf, Menu, X, Microscope, BookOpen, Clock, Info } from "lucide-react";

const navLinks = [
  { to: "/detect", label: "Detect", icon: Microscope },
  { to: "/library", label: "Disease Library", icon: BookOpen },
  { to: "/history", label: "History", icon: Clock },
  { to: "/about", label: "About", icon: Info },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navBase =
    isHome && !scrolled
      ? "bg-transparent"
      : "bg-white/95 backdrop-blur-md shadow-sm border-b border-leaf-100";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBase}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="CropGuard Home"
        >
          <div className="w-9 h-9 bg-leaf-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span
            className={`font-display font-bold text-xl ${
              isHome && !scrolled ? "text-white" : "text-leaf-800"
            }`}
          >
            CropGuard
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-leaf-600 text-white shadow-sm"
                      : isHome && !scrolled
                      ? "text-white/90 hover:text-white hover:bg-white/15"
                      : "text-gray-600 hover:text-leaf-700 hover:bg-leaf-50"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="/detect"
          className="hidden md:inline-flex items-center gap-2 bg-leaf-600 hover:bg-leaf-700 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
        >
          <Microscope className="w-4 h-4" />
          Analyze Crop
        </Link>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 rounded-lg ${
            isHome && !scrolled
              ? "text-white hover:bg-white/15"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-fade-in">
          <ul className="px-4 py-3 space-y-1" role="list">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-leaf-50 text-leaf-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2">
              <Link
                to="/detect"
                className="flex items-center justify-center gap-2 bg-leaf-600 text-white px-4 py-3 rounded-xl text-sm font-semibold w-full"
              >
                <Microscope className="w-4 h-4" />
                Analyze Crop
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
