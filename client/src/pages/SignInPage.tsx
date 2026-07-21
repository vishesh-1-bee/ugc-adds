import { SignIn } from '@clerk/clerk-react';
import { useTheme } from '../context/ThemeContext';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SignInPage() {
  const { isDark } = useTheme();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden bg-gradient-hero">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#9b82ff]/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#ff6090]/10 rounded-full blur-3xl -z-10 animate-pulse delay-75" />

      {/* Header/Logo above login card */}
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-shadow duration-300 group-hover:shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #9b82ff, #ff6090)',
            }}
          >
            <Sparkles size={20} className="text-white" />
          </div>
          <span
            className="text-2xl font-bold font-display tracking-tight"
            style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}
          >
            Ad<span className="text-gradient">Genix</span>
          </span>
        </Link>
        <p className="text-sm font-medium" style={{ color: isDark ? '#a8a6b8' : '#64627a' }}>
          Create stunning AI UGC video ads in seconds
        </p>
      </div>

      {/* Clerk sign in container */}
      <div className="w-full max-w-md flex justify-center">
        <SignIn
          signUpUrl="/sign-up"
          routing="path"
          path="/sign-in"
          fallbackRedirectUrl="/"
          forceRedirectUrl="/"
          appearance={{
            variables: {
              colorPrimary: '#9b82ff',
              colorBackground: isDark ? '#1a1a2e' : '#ffffff',
              colorText: isDark ? '#e8e6f0' : '#1e1e2e',
              colorTextSecondary: isDark ? '#a8a6b8' : '#64627a',
              colorInputBackground: isDark ? '#0f0f1a' : '#fafafe',
              colorInputText: isDark ? '#e8e6f0' : '#1e1e2e',
              colorBorder: isDark ? 'rgba(42, 42, 66, 0.5)' : 'rgba(232, 230, 240, 0.6)',
              borderRadius: '1rem',
            },
            elements: {
              card: `shadow-2xl border ${isDark ? 'border-[rgba(42,42,66,0.5)]' : 'border-[rgba(232,230,240,0.6)]'}`,
              headerTitle: 'font-display text-2xl font-bold',
              headerSubtitle: 'text-sm font-sans',
              socialButtonsBlockButton: `border ${isDark ? 'border-[rgba(42,42,66,0.5)] bg-[#1a1a2e]' : 'border-[rgba(232,230,240,0.6)] bg-white'} hover:opacity-90`,
              socialButtonsBlockButtonText: 'font-medium',
              formButtonPrimary: 'bg-gradient-to-r from-lavender-500 to-rose-400 hover:opacity-90 text-white font-semibold shadow-md',
              footerActionLink: 'text-lavender-500 hover:text-lavender-600 font-medium',
            },
          }}
        />
      </div>
    </div>
  );
}
