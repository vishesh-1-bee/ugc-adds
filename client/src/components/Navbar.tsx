import { useState, useRef, useEffect } from 'react';
import { Menu, X, Sparkles, LogOut, User, ChevronDown, Zap } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { useUser, useClerk, SignedIn, SignedOut } from '@clerk/clerk-react';

function UserProfileDropdown() {
  const { isDark } = useTheme();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isLoaded || !user) return null;

  const initials = user?.firstName?.[0]?.toUpperCase() ?? user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() ?? 'U';
  const displayName = user?.fullName || user?.firstName || 'User';
  const email = user?.primaryEmailAddress?.emailAddress ?? '';
  const avatar = user?.imageUrl;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        id="user-profile-trigger"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-xl transition-all duration-200 hover:opacity-90 cursor-pointer"
        style={{
          background: isDark ? 'rgba(42,42,66,0.5)' : 'rgba(232,230,240,0.5)',
          border: `1px solid ${isDark ? 'rgba(155,130,255,0.25)' : 'rgba(155,130,255,0.3)'}`,
        }}
        aria-label="User profile"
      >
        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #9b82ff, #ff6090)' }}
        >
          {avatar ? (
            <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
          ) : (
            initials
          )}
        </div>
        <span
          className="hidden md:block text-sm font-semibold max-w-[100px] truncate"
          style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}
        >
          {displayName}
        </span>
        <ChevronDown
          size={14}
          className={`hidden md:block transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          style={{ color: isDark ? '#a8a6b8' : '#64627a' }}
        />
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div
          id="user-profile-dropdown"
          className="absolute right-0 mt-2 w-64 rounded-2xl shadow-2xl z-50 overflow-hidden"
          style={{
            background: isDark ? 'rgba(15, 15, 26, 0.97)' : 'rgba(255, 255, 255, 0.97)',
            border: `1px solid ${isDark ? 'rgba(42, 42, 66, 0.7)' : 'rgba(232, 230, 240, 0.8)'}`,
            backdropFilter: 'blur(20px)',
            animation: 'fadeSlideDown 0.15s ease-out',
          }}
        >
          {/* Profile Header */}
          <div
            className="px-4 py-4"
            style={{
              borderBottom: `1px solid ${isDark ? 'rgba(42, 42, 66, 0.5)' : 'rgba(232, 230, 240, 0.6)'}`,
            }}
          >
            <div className="flex items-center gap-3">
              {/* Large avatar */}
              <div
                className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #9b82ff, #ff6090)' }}
              >
                {avatar ? (
                  <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  initials
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="font-bold text-sm truncate"
                  style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}
                >
                  {displayName}
                </p>
                <p
                  className="text-xs truncate mt-0.5"
                  style={{ color: isDark ? '#a8a6b8' : '#64627a' }}
                >
                  {email}
                </p>
                {/* Plan badge */}
                <span
                  className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #9b82ff22, #ff609022)',
                    color: '#9b82ff',
                    border: '1px solid #9b82ff33',
                  }}
                >
                  Free Plan
                </span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <Link
              to="/my-generation"
              id="dropdown-my-generations"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150 cursor-pointer"
              style={{ color: isDark ? '#a8a6b8' : '#64627a' }}
              onMouseEnter={e => (e.currentTarget.style.background = isDark ? 'rgba(42,42,66,0.5)' : 'rgba(232,230,240,0.5)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <User size={16} />
              My Generations
            </Link>
          </div>

          {/* Divider */}
          <div
            className="mx-4"
            style={{
              height: '1px',
              background: isDark ? 'rgba(42, 42, 66, 0.5)' : 'rgba(232, 230, 240, 0.6)',
            }}
          />

          {/* Logout */}
          <div className="p-2">
            <button
              id="logout-button"
              onClick={() => signOut({ redirectUrl: '/' })}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer"
              style={{ color: '#ff6090' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255, 96, 144, 0.1)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark } = useTheme();
  const { isSignedIn } = useUser();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Create', href: '/create' },
    { label: 'Community', href: '/community' },
    ...(isSignedIn ? [{ label: 'My Generations', href: '/my-generation' }] : []),
    { label: 'Pricing', href: '#pricing' },
  ];

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
        <Link to="/" id="logo" className="flex items-center gap-2 group">
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

          <SignedOut>
            <Link
              to="/sign-in"
              className="hidden md:inline-flex text-sm font-medium transition-colors duration-200 hover:text-lavender-500 mr-2"
              style={{ color: isDark ? '#a8a6b8' : '#64627a' }}
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              id="nav-cta"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #9b82ff, #7c52e3)',
                boxShadow: '0 4px 20px -4px rgba(155, 130, 255, 0.4)',
              }}
            >
              Get Started
            </Link>
          </SignedOut>

          <SignedIn>
            {/* Credits Badge */}
            <div
              id="credits-badge"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-default select-none"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, rgba(155,130,255,0.15), rgba(255,96,144,0.1))'
                  : 'linear-gradient(135deg, rgba(155,130,255,0.12), rgba(255,96,144,0.08))',
                border: '1px solid rgba(155,130,255,0.3)',
                color: '#9b82ff',
                boxShadow: '0 0 12px -4px rgba(155,130,255,0.4)',
              }}
            >
              <Zap size={12} fill="#9b82ff" />
              <span>10 Credits</span>
            </div>
            <UserProfileDropdown />
          </SignedIn>

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
              <Link
                key={link.href}
                to={link.href}
                className="text-base font-medium py-2 transition-colors duration-200"
                style={{ color: isDark ? '#a8a6b8' : '#64627a' }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <SignedOut>
              <div className="h-[1px] w-full my-1 bg-border-light dark:bg-border-dark" />
              <Link
                to="/sign-in"
                className="text-base font-medium py-2 text-center transition-colors duration-200"
                style={{ color: isDark ? '#a8a6b8' : '#64627a' }}
                onClick={() => setMobileOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #9b82ff, #7c52e3)',
                }}
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </SignedOut>

            <SignedIn>
              <div className="h-[1px] w-full my-1" style={{ background: 'rgba(42,42,66,0.3)' }} />
              <MobileUserSection onClose={() => setMobileOpen(false)} isDark={isDark} />
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
}

function MobileUserSection({ onClose, isDark }: { onClose: () => void; isDark: boolean }) {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded || !user) return null;

  const displayName = user?.fullName || user?.firstName || 'User';
  const email = user?.primaryEmailAddress?.emailAddress ?? '';
  const avatar = user?.imageUrl;
  const initials = user?.firstName?.[0]?.toUpperCase() ?? 'U';

  return (
    <div className="flex flex-col gap-3">
      {/* User info row */}
      <div className="flex items-center gap-3 py-2">
        <div
          className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #9b82ff, #ff6090)' }}
        >
          {avatar ? (
            <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
          ) : (
            initials
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm truncate" style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}>
            {displayName}
          </p>
          <p className="text-xs truncate" style={{ color: isDark ? '#a8a6b8' : '#64627a' }}>
            {email}
          </p>
        </div>
      </div>
      {/* Credits row for mobile */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(155,130,255,0.12), rgba(255,96,144,0.08))'
            : 'linear-gradient(135deg, rgba(155,130,255,0.1), rgba(255,96,144,0.06))',
          border: '1px solid rgba(155,130,255,0.25)',
        }}
      >
        <Zap size={14} fill="#9b82ff" color="#9b82ff" />
        <div className="flex-1">
          <p className="text-xs font-semibold" style={{ color: '#9b82ff' }}>10 Credits remaining</p>
          <div className="mt-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(155,130,255,0.2)' }}>
            <div className="h-full rounded-full" style={{ width: '100%', background: 'linear-gradient(90deg, #9b82ff, #ff6090)' }} />
          </div>
        </div>
      </div>
      {/* Sign out button */}
      <button
        id="mobile-logout-button"
        onClick={() => {
          onClose();
          signOut({ redirectUrl: '/' });
        }}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200"
        style={{
          color: '#ff6090',
          background: 'rgba(255, 96, 144, 0.08)',
          border: '1px solid rgba(255, 96, 144, 0.2)',
        }}
      >
        <LogOut size={16} />
        Sign out
      </button>
    </div>
  );
}
