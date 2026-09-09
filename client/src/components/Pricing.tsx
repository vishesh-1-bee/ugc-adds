
import { useTheme } from '../context/ThemeContext';
import { PricingTable } from '@clerk/clerk-react';


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
