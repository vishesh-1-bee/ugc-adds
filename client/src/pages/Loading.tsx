import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Loader2 } from 'lucide-react';

const LOADING_STEPS = [
  'Initializing UGC layout configuration...',
  'Analyzing uploaded product dimensions...',
  'Aligning product to model posture...',
  'Applying studio lighting and environment reflections...',
  'Rendering final in-context 9:16 video...',
];

export default function Loading() {
  const { isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  // If no state exists (direct access), redirect back to create form
  useEffect(() => {
    if (!state) {
      navigate('/create');
    }
  }, [state, navigate]);

  useEffect(() => {
    if (!state) return;

    const duration = 4000; // 4 seconds total
    const intervalTime = 40; // update progress every 40ms
    const totalSteps = duration / intervalTime;
    const progressIncrement = 100 / totalSteps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + progressIncrement;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [state]);

  // Rotate through loading step messages
  useEffect(() => {
    if (!state) return;
    const stepDuration = 4000 / LOADING_STEPS.length;
    const stepTimer = setInterval(() => {
      setStepIndex((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, stepDuration);

    return () => clearInterval(stepTimer);
  }, [state]);

  // Navigate to results page once loading hits 100%
  useEffect(() => {
    if (progress >= 100 && state) {
      const timer = setTimeout(() => {
        navigate('/results/demo-project', { state });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, state, navigate]);

  if (!state) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-hero flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Glow Orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(155,130,255,0.35), transparent)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,96,144,0.25), transparent)',
        }}
      />

      <div className="max-w-md w-full text-center z-10">
        {/* Animated Spin Ring */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="w-24 h-24 rounded-full border-4 border-dashed animate-spin"
            style={{
              borderColor: isDark ? 'rgba(155, 130, 255, 0.4)' : 'rgba(155, 130, 255, 0.25)',
              borderTopColor: '#9b82ff',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles size={28} className="text-gradient animate-pulse-glow" />
          </div>
        </div>

        {/* Title */}
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2" style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}>
          Generating Your UGC Ad
        </h2>
        <p className="text-sm mb-8 h-6" style={{ color: isDark ? '#a8a6b8' : '#64627a' }}>
          {LOADING_STEPS[stepIndex]}
        </p>

        {/* Combined Previews Stack */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {state.productPreview && (
            <div className="w-16 h-16 rounded-xl border border-dashed p-1 bg-black/10 overflow-hidden relative"
              style={{ borderColor: isDark ? 'rgba(155, 130, 255, 0.3)' : 'rgba(155, 130, 255, 0.2)' }}
            >
              <img src={state.productPreview} alt="Product" className="w-full h-full object-contain" />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          )}
          <div className="w-4 h-[1px] bg-dashed" style={{ borderColor: isDark ? '#6e6c82' : '#9896a8' }} />
          {state.modelPreview && (
            <div className="w-16 h-16 rounded-xl border border-dashed p-1 bg-black/10 overflow-hidden relative"
              style={{ borderColor: isDark ? 'rgba(155, 130, 255, 0.3)' : 'rgba(155, 130, 255, 0.2)' }}
            >
              <img src={state.modelPreview} alt="Model" className="w-full h-full object-contain" />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          )}
        </div>

        {/* Progress Bar Container */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-2 text-xs font-semibold">
            <span style={{ color: isDark ? '#6e6c82' : '#9896a8' }} className="flex items-center gap-1.5">
              <Loader2 size={12} className="animate-spin text-lavender-500" />
              Synthesizing...
            </span>
            <span className="text-gradient">{Math.round(progress)}%</span>
          </div>
          <div
            className="w-full h-2.5 rounded-full overflow-hidden"
            style={{
              background: isDark ? 'rgba(42, 42, 66, 0.6)' : 'rgba(232, 230, 240, 0.8)',
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-75 ease-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #9b82ff, #ff6090)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}