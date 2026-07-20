import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section id="cta" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="relative rounded-3xl overflow-hidden px-8 py-16 md:px-16 md:py-20 text-center"
          style={{
            background: 'linear-gradient(135deg, #9b82ff, #7c52e3, #ff6090)',
            boxShadow: '0 32px 80px -16px rgba(155, 130, 255, 0.4)',
          }}
        >
          {/* Background decoration */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 60% at 20% 100%, rgba(255,138,32,0.2), transparent), radial-gradient(ellipse 50% 50% at 80% 0%, rgba(255,96,144,0.2), transparent)',
            }}
          />
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium text-white/80 bg-white/10 backdrop-blur-sm">
              <Sparkles size={14} />
              Limited Time — First 100 users get 50% off Pro
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
              Ready to Create Ads That{' '}
              <span className="underline decoration-wavy decoration-white/40 underline-offset-8">
                Actually Convert?
              </span>
            </h2>

            <p className="text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
              Join thousands of brands already using AdGenix to generate
              high-performing UGC video ads in seconds — no cameras needed.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#pricing"
                id="cta-primary"
                className="group flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{
                  background: '#ffffff',
                  color: '#7c52e3',
                  boxShadow: '0 8px 32px -8px rgba(0,0,0,0.25)',
                }}
              >
                Get Started Free
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <span className="text-sm text-white/50">
                No credit card required
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
