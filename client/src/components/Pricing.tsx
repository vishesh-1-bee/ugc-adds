import { Check, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PricingTable } from '@clerk/clerk-react';

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/month',
    description: 'Perfect for trying out AdGenix',
    features: [
      '3 videos per month',
      '720p export quality',
      '2 AI model personas',
      'Standard rendering speed',
      'Watermarked output',
    ],
    cta: 'Start Free',
    popular: false,
    gradient: 'linear-gradient(135deg, #e3deff, #f0edff)',
    gradientDark: 'linear-gradient(135deg, #2a2a42, #1a1a2e)',
    borderColor: 'rgba(155, 130, 255, 0.15)',
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For creators & small brands scaling ads',
    features: [
      '50 videos per month',
      '1080p HD export',
      '10+ AI model personas',
      'Priority rendering',
      'No watermark',
      'Brand kit integration',
      'A/B script variants',
    ],
    cta: 'Go Pro',
    popular: true,
    gradient: 'linear-gradient(135deg, #9b82ff, #7c52e3)',
    gradientDark: 'linear-gradient(135deg, #9b82ff, #7c52e3)',
    borderColor: 'rgba(155, 130, 255, 0.4)',
  },
  {
    name: 'Agency',
    price: '$99',
    period: '/month',
    description: 'Unlimited power for agencies & teams',
    features: [
      'Unlimited videos',
      '4K Ultra HD export',
      'All AI models + custom upload',
      'Instant rendering',
      'No watermark',
      'Team collaboration (5 seats)',
      'API access',
      'White-label exports',
    ],
    cta: 'Contact Sales',
    popular: false,
    gradient: 'linear-gradient(135deg, #ff6090, #ff94b2)',
    gradientDark: 'linear-gradient(135deg, #2a2a42, #1a1a2e)',
    borderColor: 'rgba(255, 96, 144, 0.15)',
  },
];

export default function Pricing() {
  const { isDark } = useTheme();

  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
            style={{
              background: isDark
                ? 'rgba(16, 185, 129, 0.1)'
                : 'rgba(16, 185, 129, 0.06)',
              color: isDark ? '#6ee7b7' : '#10b981',
              border: '1px solid rgba(16, 185, 129, 0.15)',
            }}
          >
            Pricing
          </span>
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}
          >
            Simple, Transparent{' '}
            <span className="text-gradient">Pricing</span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: isDark ? '#a8a6b8' : '#64627a' }}
          >
            Start free, upgrade when you're ready. No hidden fees, cancel
            anytime.
          </p>
        </div>

        {/* Pricing grid */}
        <div className="flex flex-wrap justify-center gap-8 items-stretch">
          <PricingTable></PricingTable>
        </div>
      </div>
    </section>
  );
}
