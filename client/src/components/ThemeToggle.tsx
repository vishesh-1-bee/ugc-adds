import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      className="relative flex items-center w-16 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #2a2a42, #1a1a2e)'
          : 'linear-gradient(135deg, #f0edff, #e3deff)',
        border: isDark
          ? '1px solid rgba(155, 130, 255, 0.3)'
          : '1px solid rgba(155, 130, 255, 0.2)',
      }}
      aria-label="Toggle dark mode"
    >
      <div
        className="absolute flex items-center justify-center w-6 h-6 rounded-full shadow-md transition-all duration-300"
        style={{
          left: isDark ? 'calc(100% - 28px)' : '4px',
          background: isDark
            ? 'linear-gradient(135deg, #9b82ff, #7c52e3)'
            : 'linear-gradient(135deg, #ffa048, #ff8a20)',
        }}
      >
        {isDark ? (
          <Moon size={14} className="text-white" />
        ) : (
          <Sun size={14} className="text-white" />
        )}
      </div>
    </button>
  );
}
