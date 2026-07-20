import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  ArrowLeft, Download, ExternalLink, RefreshCw, Play, 
  Volume2, VolumeX, Heart, MessageCircle, Share2, Sparkles 
} from 'lucide-react';

export default function Results() {
  const { isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(35);
  const [likeCount, setLikeCount] = useState(1284);
  const [hasLiked, setHasLiked] = useState(false);

  // If no state, redirect back to create
  useEffect(() => {
    if (!state) {
      navigate('/create');
    }
  }, [state, navigate]);

  // Simulate progress bar movement when video is playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setVideoProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 150);
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!state) return null;

  const { 
    projectName = 'My UGC Project',
    productName = 'My Product',
    productDescription = '',
    aspectRatio = '9:16',
    userPrompt = '',
    productPreview = '',
    modelPreview = ''
  } = state;

  // Generate a premium simulated script narration based on product details
  const generatedScript = userPrompt.trim() 
    ? userPrompt 
    : `Hey guys, I have to show you this brand new ${productName}! 🎬 Seriously, it has completely changed my daily routine. ${
        productDescription ? `${productDescription}. ` : ''
      }If you've been looking for the perfect solution, this is your sign to grab one today. Trust me, you won't regret it! ✨`;

  const handleLike = () => {
    if (hasLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setHasLiked(!hasLiked);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-hero py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Back Link */}
        <Link 
          to="/create" 
          className="inline-flex items-center gap-2 mb-8 text-sm font-semibold transition-colors duration-200"
          style={{ color: isDark ? '#b4a4ff' : '#7c52e3' }}
        >
          <ArrowLeft size={16} />
          Back to Generator
        </Link>

        {/* Page Title */}
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Generation Complete</span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-1" style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}>
            {projectName}
          </h1>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Simulated Video Player mockup */}
          <div className="lg:col-span-5 flex justify-center">
            
            {/* Phone aspect ratio frame */}
            <div 
              className={`relative overflow-hidden rounded-[2.5rem] border-8 shadow-2xl flex flex-col justify-between transition-all duration-500 bg-black ${
                aspectRatio === '9:16' 
                  ? 'w-[320px] h-[568px]' 
                  : 'w-[100%] max-w-[500px] aspect-video h-auto'
              }`}
              style={{ 
                borderColor: isDark ? '#2a2a42' : '#e8e6f0',
              }}
            >
              {/* Dynamic Video Mockup Content */}
              <div className="absolute inset-0 w-full h-full">
                {/* Simulated background scene using model image */}
                {modelPreview ? (
                  <img 
                    src={modelPreview} 
                    alt="Model backdrop" 
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-purple-900 to-indigo-950" />
                )}

                {/* Floating superimposed product preview */}
                {productPreview && (
                  <div 
                    className="absolute transition-transform duration-300 pointer-events-none select-none"
                    style={{
                      width: aspectRatio === '9:16' ? '110px' : '90px',
                      height: aspectRatio === '9:16' ? '110px' : '90px',
                      bottom: aspectRatio === '9:16' ? '140px' : '60px',
                      left: aspectRatio === '9:16' ? '25px' : '25px',
                      filter: 'drop-shadow(0 15px 15px rgba(0,0,0,0.5))',
                      transform: isPlaying ? 'scale(1.05) rotate(2deg)' : 'scale(1) rotate(0deg)'
                    }}
                  >
                    <img 
                      src={productPreview} 
                      alt="Superimposed Product" 
                      className="w-full h-full object-contain animate-float"
                    />
                  </div>
                )}

                {/* Simulated playback freeze overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                      <Play size={24} fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                )}
              </div>

              {/* TikTok / Instagram style overlay on portrait video */}
              {aspectRatio === '9:16' && (
                <div className="absolute right-3 bottom-28 flex flex-col items-center gap-4 text-white z-10">
                  {/* Like */}
                  <button onClick={handleLike} className="flex flex-col items-center cursor-pointer group">
                    <div className={`p-2.5 rounded-full transition-colors ${hasLiked ? 'bg-rose-500/20 text-rose-500' : 'bg-black/40 hover:bg-black/60 text-white'}`}>
                      <Heart size={20} fill={hasLiked ? 'currentColor' : 'none'} />
                    </div>
                    <span className="text-[10px] mt-1 font-semibold">{likeCount}</span>
                  </button>

                  {/* Comment */}
                  <div className="flex flex-col items-center cursor-pointer">
                    <div className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white">
                      <MessageCircle size={20} />
                    </div>
                    <span className="text-[10px] mt-1 font-semibold">142</span>
                  </div>

                  {/* Share */}
                  <div className="flex flex-col items-center cursor-pointer">
                    <div className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white">
                      <Share2 size={20} />
                    </div>
                    <span className="text-[10px] mt-1 font-semibold">89</span>
                  </div>
                </div>
              )}

              {/* Video Narration / Caption overlay */}
              <div className="absolute left-3 right-12 bottom-6 text-white text-xs z-10 flex flex-col gap-1 drop-shadow-md">
                <span className="font-bold flex items-center gap-1">
                  <Sparkles size={12} className="text-yellow-400" />
                  @{productName.toLowerCase().replace(/\s+/g, '')}_ugc
                </span>
                <p className="line-clamp-2 text-white/90">
                  {generatedScript}
                </p>
              </div>

              {/* Video control overlay (Top) */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10">
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-[10px] font-semibold tracking-wider">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  PREVIEW
                </div>
                <button 
                  onClick={() => setIsMuted(!isMuted)} 
                  className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 cursor-pointer"
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
              </div>

              {/* Progress bar overlay (Bottom) */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 z-20 cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const percentage = (clickX / rect.width) * 100;
                  setVideoProgress(percentage);
                }}
              >
                <div 
                  className="h-full bg-purple-500 transition-all duration-75"
                  style={{ width: `${videoProgress}%` }}
                />
              </div>

              {/* Center Playback control trigger */}
              <div className="absolute inset-0 cursor-pointer" onClick={() => setIsPlaying(!isPlaying)} />

            </div>

          </div>

          {/* Right Column: Settings, Scripts and Action Buttons */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* UGC Generation Details Card */}
            <div className="rounded-2xl p-6 border transition-all duration-300"
              style={{
                borderColor: isDark ? 'rgba(42, 42, 66, 0.6)' : 'rgba(232, 230, 240, 0.8)',
                background: isDark ? 'rgba(26, 26, 46, 0.7)' : 'rgba(255, 255, 255, 0.8)',
              }}
            >
              <h2 className="text-lg font-bold mb-4" style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}>
                Generation Summary
              </h2>

              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: isDark ? '#6e6c82' : '#9896a8' }}>
                    Product Name
                  </span>
                  <span className="font-semibold" style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}>
                    {productName}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: isDark ? '#6e6c82' : '#9896a8' }}>
                    Aspect Ratio
                  </span>
                  <span className="font-semibold px-2 py-0.5 rounded text-xs text-white" style={{ background: '#9b82ff' }}>
                    {aspectRatio}
                  </span>
                </div>
              </div>

              {/* AI Narration Script */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: isDark ? '#6e6c82' : '#9896a8' }}>
                  AI Generated Narration Script
                </span>
                <div 
                  className="p-4 rounded-xl text-sm leading-relaxed border"
                  style={{
                    borderColor: isDark ? 'rgba(42, 42, 66, 0.4)' : 'rgba(232, 230, 240, 0.6)',
                    background: isDark ? 'rgba(15, 15, 26, 0.4)' : 'rgba(250, 250, 254, 0.6)',
                    color: isDark ? '#d1cfe0' : '#4a485a'
                  }}
                >
                  {generatedScript}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch gap-4">
              <button 
                onClick={() => alert('Downloading high-quality render package...')}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #9b82ff, #7c52e3)',
                  boxShadow: '0 8px 32px -8px rgba(155, 130, 255, 0.5)',
                }}
              >
                <Download size={18} />
                Download UGC Video
              </button>

              <button 
                onClick={() => alert('Redirecting to Facebook Ads Integration...')}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                style={{
                  color: isDark ? '#b4a4ff' : '#7c52e3',
                  background: isDark ? 'rgba(155, 130, 255, 0.1)' : 'rgba(155, 130, 255, 0.06)',
                  border: '1px solid rgba(155, 130, 255, 0.25)',
                }}
              >
                <ExternalLink size={18} />
                Send to Ads Manager
              </button>
            </div>

            <div className="flex items-center justify-center mt-2">
              <Link 
                to="/create"
                className="flex items-center gap-1.5 text-sm font-semibold hover:underline"
                style={{ color: isDark ? '#a8a6b8' : '#64627a' }}
              >
                <RefreshCw size={14} />
                Generate another layout
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}