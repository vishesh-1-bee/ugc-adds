import { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Create', href: '/create' },
  { label: 'Community', href: '/community' },
  { label: 'Pricing', href: '#pricing' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark } = useTheme();

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 right-0 z-40 transition-colors duration-300"
      style={{
        background: isDark
          ? 'rgba(15, 15, 26, 0.8)'
          : 'rgba(250, 250, 254, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: isDark
          ? '1px solid rgba(42, 42, 66, 0.5)'
          : '1px solid rgba(232, 230, 240, 0.6)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" id="logo" className="flex items-center gap-2 group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-shadow duration-300 group-hover:shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #9b82ff, #ff6090)',
            }}
          >
            <Sparkles size={18} className="text-white" />
          </div>
          <span
            className="text-xl font-bold font-display tracking-tight"
            style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}
          >
            Ad<span className="text-gradient">Genix</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium transition-colors duration-200 hover:text-lavender-500"
              style={{ color: isDark ? '#a8a6b8' : '#64627a' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            href="#pricing"
            id="nav-cta"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #9b82ff, #7c52e3)',
              boxShadow: '0 4px 20px -4px rgba(155, 130, 255, 0.4)',
            }}
          >
            Get Started
          </a>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden p-2 rounded-lg transition-colors cursor-pointer"
            style={{
              color: isDark ? '#e8e6f0' : '#1e1e2e',
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 animate-slide-up"
          style={{
            background: isDark
              ? 'rgba(15, 15, 26, 0.95)'
              : 'rgba(250, 250, 254, 0.95)',
            borderBottom: isDark
              ? '1px solid rgba(42, 42, 66, 0.5)'
              : '1px solid rgba(232, 230, 240, 0.6)',
          }}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-medium py-2 transition-colors duration-200"
                style={{ color: isDark ? '#a8a6b8' : '#64627a' }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              className="mt-2 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #9b82ff, #7c52e3)',
              }}
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
