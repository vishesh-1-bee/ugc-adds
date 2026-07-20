import { Play, ArrowRight, Upload, Wand2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Hero() {
  const { isDark } = useTheme();

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-gradient-hero"
    >
      {/* Decorative orbs */}
      <div
        className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-float opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(155,130,255,0.25), transparent)',
        }}
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-float-delayed opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,96,144,0.2), transparent)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="animate-slide-up inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-medium"
              style={{
                background: isDark
                  ? 'rgba(155, 130, 255, 0.12)'
                  : 'rgba(155, 130, 255, 0.08)',
                border: '1px solid rgba(155, 130, 255, 0.2)',
                color: isDark ? '#b4a4ff' : '#7c52e3',
              }}
            >
              <Wand2 size={14} />
              AI-Powered UGC Generator
            </div>

            <h1 className="animate-slide-up font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight mb-6">
              <span style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}>
                Create Stunning{' '}
              </span>
              <span className="text-gradient">
                UGC Ads
              </span>
              <br />
              <span style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}>
                in Seconds
              </span>
            </h1>

            <p
              className="animate-slide-up-delayed text-lg sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0"
              style={{ color: isDark ? '#a8a6b8' : '#64627a' }}
            >
              Just upload a product image, choose a model — and let AI generate
              scroll-stopping short-form video ads that convert. No filming, no
              editing, no hassle.
            </p>

            <div className="animate-slide-up-delayed-2 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a
                href="#pricing"
                id="hero-cta-primary"
                className="group flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #9b82ff, #7c52e3)',
                  boxShadow: '0 8px 32px -8px rgba(155, 130, 255, 0.5)',
                }}
              >
                Start Creating Free
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <button
                id="hero-cta-secondary"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{
                  color: isDark ? '#b4a4ff' : '#7c52e3',
                  background: isDark
                    ? 'rgba(155, 130, 255, 0.1)'
                    : 'rgba(155, 130, 255, 0.06)',
                  border: '1px solid rgba(155, 130, 255, 0.2)',
                }}
              >
                <Play size={18} />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div
              className="animate-fade-in mt-12 flex items-center gap-8 justify-center lg:justify-start"
            >
              {[
                { value: '10K+', label: 'Videos Generated' },
                { value: '3.2x', label: 'Avg. ROAS Lift' },
                { value: '< 60s', label: 'Generation Time' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-xl font-bold font-display text-gradient">
                    {stat.value}
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: isDark ? '#6e6c82' : '#9896a8' }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right – visual mockup */}
          <div className="flex-1 animate-slide-up-delayed relative">
            <div
              className="relative rounded-3xl overflow-hidden glow-ring"
              style={{
                background: isDark
                  ? 'linear-gradient(145deg, #1a1a2e, #0f0f1a)'
                  : 'linear-gradient(145deg, #ffffff, #f8f7ff)',
                border: isDark
                  ? '1px solid rgba(42, 42, 66, 0.6)'
                  : '1px solid rgba(232, 230, 240, 0.8)',
              }}
            >
              <div className="p-8">
                {/* Fake browser bar */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#ff6090' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#ffa048' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#10b981' }} />
                </div>

                {/* Upload area */}
                <div
                  className="rounded-2xl p-8 mb-4 flex flex-col items-center justify-center text-center transition-all duration-300"
                  style={{
                    border: isDark
                      ? '2px dashed rgba(155, 130, 255, 0.3)'
                      : '2px dashed rgba(155, 130, 255, 0.25)',
                    background: isDark
                      ? 'rgba(155, 130, 255, 0.05)'
                      : 'rgba(155, 130, 255, 0.03)',
                    minHeight: '180px',
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{
                      background: 'linear-gradient(135deg, rgba(155,130,255,0.15), rgba(255,96,144,0.1))',
                    }}
                  >
                    <Upload
                      size={24}
                      style={{ color: isDark ? '#b4a4ff' : '#9b82ff' }}
                    />
                  </div>
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}
                  >
                    Drop your product image here
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: isDark ? '#6e6c82' : '#9896a8' }}
                  >
                    PNG, JPG up to 10MB
                  </p>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium" style={{ color: isDark ? '#a8a6b8' : '#64627a' }}>
                      Generating your ad...
                    </p>
                    <p className="text-xs font-semibold text-gradient">78%</p>
                  </div>
                  <div
                    className="w-full h-2 rounded-full overflow-hidden"
                    style={{
                      background: isDark
                        ? 'rgba(42, 42, 66, 0.6)'
                        : 'rgba(232, 230, 240, 0.8)',
                    }}
                  >
                    <div
                      className="h-full rounded-full animate-pulse-glow"
                      style={{
                        width: '78%',
                        background: 'linear-gradient(90deg, #9b82ff, #ff6090)',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div
              className="absolute -bottom-4 -left-4 px-4 py-3 rounded-2xl animate-float glass-card"
              style={{
                boxShadow: '0 8px 32px -8px rgba(0,0,0,0.12)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}
                >
                  <Wand2 size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}>
                    Ad Ready!
                  </p>
                  <p className="text-xs" style={{ color: isDark ? '#6e6c82' : '#9896a8' }}>
                    1080×1920 • 15s
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
