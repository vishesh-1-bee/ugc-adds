import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Check, Zap, Star, Building2, Lock, Video, Image, Globe, Users, Headphones, ArrowRight } from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: null,
    badge: null,
    description: 'Perfect for trying out UGC Ads',
    credits: 20,
    color: 'rgba(155,130,255,0.6)',
    gradient: 'linear-gradient(135deg, rgba(155,130,255,0.15), rgba(155,130,255,0.05))',
    borderGradient: 'rgba(155,130,255,0.25)',
    icon: Star,
    iconBg: 'rgba(155,130,255,0.15)',
    features: [
      { text: '20 starter credits', icon: Zap, included: true },
      { text: 'AI image generation', icon: Image, included: true },
      { text: 'Cloudinary storage', icon: Globe, included: true },
      { text: 'Community gallery access', icon: Users, included: true },
      { text: 'Video generation', icon: Video, included: false },
      { text: 'Priority processing', icon: Zap, included: false },
      { text: 'Priority support', icon: Headphones, included: false },
    ],
    cta: 'Get Started Free',
    ctaStyle: 'outline',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19,
    period: 'mo',
    badge: 'Most Popular',
    description: 'Unlock the full UGC video workflow',
    credits: 200,
    color: '#9b82ff',
    gradient: 'linear-gradient(135deg, rgba(155,130,255,0.2), rgba(255,96,144,0.1))',
    borderGradient: 'rgba(155,130,255,0.5)',
    icon: Zap,
    iconBg: 'rgba(155,130,255,0.2)',
    features: [
      { text: '200 credits / month', icon: Zap, included: true },
      { text: 'AI image generation', icon: Image, included: true },
      { text: 'Video generation (Veo 3)', icon: Video, included: true },
      { text: 'Priority processing', icon: Zap, included: true },
      { text: 'Community gallery access', icon: Globe, included: true },
      { text: '1 team member', icon: Users, included: true },
      { text: 'Email support', icon: Headphones, included: true },
    ],
    cta: 'Start Pro',
    ctaStyle: 'filled',
  },
  {
    id: 'business',
    name: 'Business',
    price: 49,
    period: 'mo',
    badge: null,
    description: 'Scale your UGC content operation',
    credits: -1,
    color: '#ff6090',
    gradient: 'linear-gradient(135deg, rgba(255,96,144,0.15), rgba(255,138,32,0.08))',
    borderGradient: 'rgba(255,96,144,0.4)',
    icon: Building2,
    iconBg: 'rgba(255,96,144,0.15)',
    features: [
      { text: 'Unlimited credits', icon: Zap, included: true },
      { text: 'AI image generation', icon: Image, included: true },
      { text: 'Video generation (Veo 3)', icon: Video, included: true },
      { text: 'Fastest priority processing', icon: Zap, included: true },
      { text: 'Custom domain publishing', icon: Globe, included: true },
      { text: 'Up to 10 team members', icon: Users, included: true },
      { text: 'Dedicated support', icon: Headphones, included: true },
    ],
    cta: 'Start Business',
    ctaStyle: 'outline-pink',
  },
];

export default function Plans() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className="min-h-[calc(100vh-4rem)] bg-gradient-hero py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Ambient orbs */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(155,130,255,0.4), transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,96,144,0.4), transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-14 animate-slide-up">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5"
            style={{
              background: isDark ? 'rgba(155,130,255,0.12)' : 'rgba(155,130,255,0.08)',
              border: '1px solid rgba(155,130,255,0.25)',
              color: '#9b82ff',
            }}
          >
            <Zap size={12} />
            Simple Pricing
          </div>

          <h1
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
            style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}
          >
            Choose your{' '}
            <span className="text-gradient">creative plan</span>
          </h1>

          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: isDark ? '#a8a6b8' : '#64627a' }}
          >
            Start free. Upgrade when you're ready for AI-powered video ads that convert.
          </p>
        </div>

        {/* Pricing cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const Icon = plan.icon;
            const isPro = plan.id === 'pro';

            return (
              <div
                key={plan.id}
                className="relative flex flex-col rounded-2xl overflow-visible transition-all duration-500 animate-slide-up"
                style={{
                  animationDelay: `${idx * 0.12}s`,
                  transform: isPro ? 'scale(1.03)' : undefined,
                }}
              >
                {/* Popular badge */}
                {plan.badge && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 px-5 py-1.5 rounded-full text-xs font-bold text-white tracking-wide shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #9b82ff, #ff6090)',
                      boxShadow: '0 4px 20px -4px rgba(155,130,255,0.6)',
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

                {/* Card body */}
                <div
                  className="flex flex-col flex-1 rounded-2xl p-7 border relative overflow-hidden"
                  style={{
                    background: isDark
                      ? `linear-gradient(160deg, rgba(26,26,46,0.95) 0%, rgba(20,20,38,0.98) 100%)`
                      : `linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(250,249,255,0.98) 100%)`,
                    borderColor: isPro
                      ? 'rgba(155,130,255,0.5)'
                      : isDark
                      ? 'rgba(42,42,66,0.6)'
                      : 'rgba(232,230,240,0.9)',
                    borderWidth: isPro ? '1.5px' : '1px',
                    boxShadow: isPro
                      ? '0 20px 60px -15px rgba(155,130,255,0.3), 0 0 0 1px rgba(155,130,255,0.15)'
                      : isDark
                      ? '0 8px 30px -10px rgba(0,0,0,0.5)'
                      : '0 8px 30px -10px rgba(0,0,0,0.08)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  {/* Gradient sheen */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-60"
                    style={{ background: plan.gradient }}
                  />

                  {/* Pro glow border animation */}
                  {isPro && (
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none animate-pulse-glow"
                      style={{ boxShadow: '0 0 40px -10px rgba(155,130,255,0.3)' }}
                    />
                  )}

                  <div className="relative z-10 flex flex-col flex-1">

                    {/* Icon + Plan name */}
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="flex items-center justify-center w-10 h-10 rounded-xl"
                        style={{
                          background: plan.iconBg,
                          border: `1px solid ${plan.borderGradient}`,
                        }}
                      >
                        <Icon size={18} style={{ color: plan.color }} />
                      </div>
                      <div>
                        <p
                          className="text-sm font-bold uppercase tracking-wider"
                          style={{ color: plan.color }}
                        >
                          {plan.name}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: isDark ? '#6e6c82' : '#9896a8' }}
                        >
                          {plan.description}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-end gap-1.5">
                        <span
                          className="font-display text-5xl font-bold tracking-tight"
                          style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}
                        >
                          {plan.price === 0 ? 'Free' : `$${plan.price}`}
                        </span>
                        {plan.period && (
                          <span
                            className="text-sm font-medium mb-2"
                            style={{ color: isDark ? '#6e6c82' : '#9896a8' }}
                          >
                            /{plan.period}
                          </span>
                        )}
                      </div>
                      <p
                        className="text-sm mt-1.5 font-medium"
                        style={{ color: isDark ? '#a8a6b8' : '#64627a' }}
                      >
                        {plan.credits === -1
                          ? 'Unlimited credits'
                          : plan.credits === 20 && plan.price === 0
                          ? '20 one-time credits'
                          : `${plan.credits} credits / month`}
                      </p>
                    </div>

                    {/* Feature list */}
                    <ul className="flex flex-col gap-3 mb-8 flex-1">
                      {plan.features.map((feature, fi) => {
                        return (
                          <li key={fi} className="flex items-center gap-3">
                            <div
                              className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full"
                              style={{
                                background: feature.included
                                  ? isDark ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.1)'
                                  : isDark ? 'rgba(42,42,66,0.5)' : 'rgba(232,230,240,0.6)',
                              }}
                            >
                              {feature.included ? (
                                <Check size={11} style={{ color: '#10b981' }} />
                              ) : (
                                <Lock size={10} style={{ color: isDark ? '#4a4a62' : '#c8c6d8' }} />
                              )}
                            </div>
                            <span
                              className="text-sm"
                              style={{
                                color: feature.included
                                  ? isDark ? '#c8c6d8' : '#3e3c52'
                                  : isDark ? '#4a4a62' : '#c8c6d8',
                                textDecoration: feature.included ? 'none' : 'none',
                              }}
                            >
                              {feature.text}
                            </span>
                          </li>
                        );
                      })}
                    </ul>

                    {/* CTA Button */}
                    {plan.ctaStyle === 'filled' ? (
                      <button
                        onClick={() => navigate('/sign-up')}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
                        style={{
                          background: 'linear-gradient(135deg, #9b82ff, #7c52e3)',
                          boxShadow: '0 8px 32px -8px rgba(155,130,255,0.6)',
                        }}
                      >
                        {plan.cta}
                        <ArrowRight size={15} />
                      </button>
                    ) : plan.ctaStyle === 'outline-pink' ? (
                      <button
                        onClick={() => navigate('/sign-up')}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                        style={{
                          color: '#ff6090',
                          background: isDark ? 'rgba(255,96,144,0.08)' : 'rgba(255,96,144,0.06)',
                          border: '1.5px solid rgba(255,96,144,0.4)',
                        }}
                      >
                        {plan.cta}
                        <ArrowRight size={15} />
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate('/create')}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                        style={{
                          color: isDark ? '#b4a4ff' : '#7c52e3',
                          background: isDark ? 'rgba(155,130,255,0.08)' : 'rgba(155,130,255,0.06)',
                          border: '1.5px solid rgba(155,130,255,0.25)',
                        }}
                      >
                        {plan.cta}
                        <ArrowRight size={15} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p
          className="text-center text-sm mt-12"
          style={{ color: isDark ? '#6e6c82' : '#9896a8' }}
        >
          All paid plans include a <span style={{ color: isDark ? '#b4a4ff' : '#7c52e3' }}>7-day free trial</span>. No credit card required for Free tier.
        </p>

      </div>
    </div>
  );
}