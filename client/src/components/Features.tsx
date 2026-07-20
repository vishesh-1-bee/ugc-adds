import {
  Zap,
  Palette,
  Film,
  Target,
  Sparkles,
  Globe,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Generated Scripts',
    description:
      'Our AI writes scroll-stopping ad scripts tailored to your product and audience in seconds.',
    gradient: 'linear-gradient(135deg, #9b82ff, #b4a4ff)',
  },
  {
    icon: Film,
    title: 'Realistic UGC Videos',
    description:
      'Lifelike AI models deliver your message naturally — no actors, no studio, no scheduling headaches.',
    gradient: 'linear-gradient(135deg, #ff6090, #ff94b2)',
  },
  {
    icon: Palette,
    title: 'Brand-Matched Styling',
    description:
      'Fonts, colors, overlays, and captions auto-styled to match your brand identity seamlessly.',
    gradient: 'linear-gradient(135deg, #ffa048, #ffbd73)',
  },
  {
    icon: Zap,
    title: 'Instant Rendering',
    description:
      'Get production-ready vertical videos in under 60 seconds. Export and publish immediately.',
    gradient: 'linear-gradient(135deg, #10b981, #6ee7b7)',
  },
  {
    icon: Target,
    title: 'Performance Optimized',
    description:
      'Every video is crafted with conversion best practices — hooks, CTAs, and pacing that sells.',
    gradient: 'linear-gradient(135deg, #7c52e3, #9b82ff)',
  },
  {
    icon: Globe,
    title: 'Multi-Platform Export',
    description:
      'Export in perfect dimensions for TikTok, Reels, Shorts, and Stories — one click, every platform.',
    gradient: 'linear-gradient(135deg, #ff2d6f, #ff6090)',
  },
];

export default function Features() {
  const { isDark } = useTheme();

  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
            style={{
              background: isDark
                ? 'rgba(155, 130, 255, 0.1)'
                : 'rgba(155, 130, 255, 0.06)',
              color: isDark ? '#b4a4ff' : '#7c52e3',
              border: '1px solid rgba(155, 130, 255, 0.15)',
            }}
          >
            Features
          </span>
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}
          >
            Everything You Need to{' '}
            <span className="text-gradient">Create & Convert</span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: isDark ? '#a8a6b8' : '#64627a' }}
          >
            From script to screen in seconds. Our AI handles every step of ad
            creation so you can focus on scaling.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group glass-card card-hover rounded-2xl p-8 cursor-default"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: feature.gradient }}
              >
                <feature.icon size={22} className="text-white" />
              </div>

              <h3
                className="font-display text-lg font-semibold mb-3"
                style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}
              >
                {feature.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: isDark ? '#a8a6b8' : '#64627a' }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
