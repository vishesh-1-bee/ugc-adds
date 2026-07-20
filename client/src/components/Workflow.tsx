import { Upload, Cpu, Download } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const steps = [
  {
    step: '01',
    icon: Upload,
    title: 'Upload Your Product',
    description:
      'Drop in your product image and pick an AI model persona. That\'s all we need to get started.',
    gradient: 'linear-gradient(135deg, #9b82ff, #b4a4ff)',
    glowColor: 'rgba(155, 130, 255, 0.15)',
  },
  {
    step: '02',
    icon: Cpu,
    title: 'AI Does the Magic',
    description:
      'Our engine writes a script, generates voiceover, animates the model, and composes a polished ad — all in under a minute.',
    gradient: 'linear-gradient(135deg, #ff6090, #ff94b2)',
    glowColor: 'rgba(255, 96, 144, 0.15)',
  },
  {
    step: '03',
    icon: Download,
    title: 'Download & Publish',
    description:
      'Preview your video, make tweaks if you want, then export in 1080×1920 for TikTok, Reels, Shorts — everywhere.',
    gradient: 'linear-gradient(135deg, #10b981, #6ee7b7)',
    glowColor: 'rgba(16, 185, 129, 0.15)',
  },
];

export default function Workflow() {
  const { isDark } = useTheme();

  return (
    <section
      id="workflow"
      className="relative py-24 md:py-32"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, rgba(15,15,26,0) 0%, rgba(26,26,46,0.4) 50%, rgba(15,15,26,0) 100%)'
          : 'linear-gradient(180deg, rgba(250,250,254,0) 0%, rgba(240,237,255,0.3) 50%, rgba(250,250,254,0) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
            style={{
              background: isDark
                ? 'rgba(255, 96, 144, 0.1)'
                : 'rgba(255, 96, 144, 0.06)',
              color: isDark ? '#ff94b2' : '#ff2d6f',
              border: '1px solid rgba(255, 96, 144, 0.15)',
            }}
          >
            How It Works
          </span>
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}
          >
            Three Steps.{' '}
            <span className="text-gradient">Zero Effort.</span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: isDark ? '#a8a6b8' : '#64627a' }}
          >
            No filming crews, no editing software, no learning curve. Just
            results.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Connecting line (desktop only) */}
          <div
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 z-0"
            style={{
              background: isDark
                ? 'linear-gradient(90deg, transparent, rgba(155,130,255,0.2), rgba(255,96,144,0.2), rgba(16,185,129,0.2), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(155,130,255,0.15), rgba(255,96,144,0.15), rgba(16,185,129,0.15), transparent)',
            }}
          />

          {steps.map((item) => (
            <div
              key={item.step}
              className="relative z-10 glass-card rounded-2xl p-8 text-center group card-hover"
            >
              {/* Step number */}
              <span
                className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                style={{
                  background: item.gradient,
                  color: '#ffffff',
                  boxShadow: `0 4px 20px -4px ${item.glowColor}`,
                }}
              >
                STEP {item.step}
              </span>

              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mt-4 mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: isDark
                    ? item.glowColor
                    : item.glowColor.replace('0.15', '0.08'),
                }}
              >
                <item.icon
                  size={28}
                  style={{
                    color: item.gradient.includes('9b82ff')
                      ? '#9b82ff'
                      : item.gradient.includes('ff6090')
                      ? '#ff6090'
                      : '#10b981',
                  }}
                />
              </div>

              <h3
                className="font-display text-xl font-semibold mb-3"
                style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: isDark ? '#a8a6b8' : '#64627a' }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
