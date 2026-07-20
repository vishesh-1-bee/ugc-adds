import { Check, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 flex flex-col transition-all duration-300 ${
                plan.popular
                  ? 'scale-105 md:scale-110'
                  : 'card-hover'
              }`}
              style={{
                background: plan.popular
                  ? plan.gradient
                  : isDark
                  ? 'rgba(26, 26, 46, 0.6)'
                  : 'rgba(255, 255, 255, 0.8)',
                border: `1px solid ${plan.borderColor}`,
                backdropFilter: plan.popular ? 'none' : 'blur(20px)',
                boxShadow: plan.popular
                  ? '0 20px 60px -12px rgba(155, 130, 255, 0.35)'
                  : 'none',
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-white bg-black/20 backdrop-blur-sm">
                  <Sparkles size={12} />
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3
                  className="font-display text-xl font-semibold mb-2"
                  style={{
                    color: plan.popular
                      ? '#ffffff'
                      : isDark
                      ? '#e8e6f0'
                      : '#1e1e2e',
                  }}
                >
                  {plan.name}
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{
                    color: plan.popular
                      ? 'rgba(255,255,255,0.7)'
                      : isDark
                      ? '#a8a6b8'
                      : '#64627a',
                  }}
                >
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span
                    className="font-display text-5xl font-bold"
                    style={{
                      color: plan.popular
                        ? '#ffffff'
                        : isDark
                        ? '#e8e6f0'
                        : '#1e1e2e',
                    }}
                  >
                    {plan.price}
                  </span>
                  <span
                    className="text-sm"
                    style={{
                      color: plan.popular
                        ? 'rgba(255,255,255,0.6)'
                        : isDark
                        ? '#6e6c82'
                        : '#9896a8',
                    }}
                  >
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background: plan.popular
                          ? 'rgba(255,255,255,0.2)'
                          : isDark
                          ? 'rgba(155, 130, 255, 0.15)'
                          : 'rgba(155, 130, 255, 0.1)',
                      }}
                    >
                      <Check
                        size={12}
                        style={{
                          color: plan.popular
                            ? '#ffffff'
                            : '#9b82ff',
                        }}
                      />
                    </div>
                    <span
                      className="text-sm"
                      style={{
                        color: plan.popular
                          ? 'rgba(255,255,255,0.9)'
                          : isDark
                          ? '#a8a6b8'
                          : '#64627a',
                      }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 cursor-pointer"
                style={
                  plan.popular
                    ? {
                        background: '#ffffff',
                        color: '#7c52e3',
                        boxShadow: '0 4px 20px -4px rgba(0,0,0,0.2)',
                      }
                    : {
                        background: isDark
                          ? 'rgba(155, 130, 255, 0.15)'
                          : 'rgba(155, 130, 255, 0.1)',
                        color: isDark ? '#b4a4ff' : '#7c52e3',
                        border: '1px solid rgba(155, 130, 255, 0.2)',
                      }
                }
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
