import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '@clerk/clerk-react';
import {
  ArrowLeft, Download, RefreshCw, Play, Loader2, Film, CheckCircle2, AlertCircle
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  productName: string;
  productDescription: string | null;
  aspectRatio: string | null;
  userPrompt: string | null;
  uploadedImages: string[];
  generatedImage: string | null;
  generatedVideo: string | null;
  isGenerating: boolean;
  isPublished: boolean;
}

export default function Results() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const { getToken } = useAuth();

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoGenerated, setVideoGenerated] = useState(false);

  // Fetch the project data from the API
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = await getToken();
        const response = await fetch(
          `${import.meta.env.VITE_BASEURL || 'http://localhost:2000'}/api/project/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to load project');
        }

        setProject(data.project);
        if (data.project.generatedVideo) {
          setVideoGenerated(true);
        }
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    } else {
      navigate('/create');
    }
  }, [projectId, getToken, navigate]);

  // Handle downloading the generated image
  const handleDownloadImage = async () => {
    if (!project?.generatedImage) return;

    try {
      const response = await fetch(project.generatedImage);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `${(project.name || 'ugc_ad').replace(/\s+/g, '_')}_generated.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open in new tab
      window.open(project.generatedImage, '_blank');
    }
  };

  // Handle generating video via real API
  const handleGenerateVideo = async () => {
    if (isGeneratingVideo || videoGenerated || !project) return;
    setIsGeneratingVideo(true);

    try {
      const token = await getToken();
      const response = await fetch(
        `${import.meta.env.VITE_BASEURL || 'http://localhost:2000'}/api/project/video`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ projectId: project.id }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Video generation failed');
      }

      setVideoGenerated(true);
      setProject((prev) =>
        prev ? { ...prev, generatedVideo: data.videoUrl } : prev
      );
    } catch (err: any) {
      setError(err.message || 'Video generation failed');
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  // Handle downloading the generated video
  const handleDownloadVideo = async () => {
    if (!project?.generatedVideo) return;

    try {
      const response = await fetch(project.generatedVideo);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `${(project.name || 'ugc_ad').replace(/\s+/g, '_')}_video.mp4`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(project.generatedVideo, '_blank');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-hero flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="animate-spin" style={{ color: '#9b82ff' }} />
          <span className="text-sm font-medium" style={{ color: isDark ? '#a8a6b8' : '#64627a' }}>
            Loading project...
          </span>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-hero flex items-center justify-center px-4">
        <div
          className="max-w-md w-full rounded-2xl p-8 border text-center"
          style={{
            borderColor: isDark ? 'rgba(42, 42, 66, 0.6)' : 'rgba(232, 230, 240, 0.8)',
            background: isDark ? 'rgba(26, 26, 46, 0.7)' : 'rgba(255, 255, 255, 0.8)',
          }}
        >
          <AlertCircle size={40} className="mx-auto mb-4" style={{ color: '#ff2d6f' }} />
          <h2 className="text-lg font-bold mb-2" style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}>
            {error || 'Project not found'}
          </h2>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 mt-4 text-sm font-semibold"
            style={{ color: '#9b82ff' }}
          >
            <ArrowLeft size={16} />
            Back to Generator
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-hero py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div
        className="absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(155,130,255,0.3), transparent)',
        }}
      />
      <div
        className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,96,144,0.2), transparent)',
        }}
      />

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
        <div className="mb-10 animate-slide-up">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Generation Complete</span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-1" style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}>
            {project.name}
          </h1>
        </div>

        {/* Side-by-side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column: Generated Image */}
          <div className="lg:col-span-5 animate-slide-up-delayed flex justify-center">
            <div
              className="relative rounded-2xl overflow-hidden border shadow-2xl transition-all duration-500 group"
              style={{
                borderColor: isDark ? 'rgba(42, 42, 66, 0.6)' : 'rgba(232, 230, 240, 0.8)',
                width: '100%',
                maxWidth: '420px',
              }}
            >
              {project.generatedImage ? (
                <img
                  src={project.generatedImage}
                  alt="Generated UGC Image"
                  className="w-full h-auto object-contain"
                  style={{ display: 'block' }}
                />
              ) : (
                /* Still generating */
                <div
                  className="w-full flex flex-col items-center justify-center gap-4"
                  style={{
                    aspectRatio: '9 / 16',
                    background: isDark ? 'rgba(26, 26, 46, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                  }}
                >
                  <Loader2 size={32} className="animate-spin" style={{ color: '#9b82ff' }} />
                  <span className="text-sm font-medium" style={{ color: isDark ? '#a8a6b8' : '#64627a' }}>
                    Image is being generated...
                  </span>
                </div>
              )}

              {/* Subtle gradient overlay at the bottom of the image */}
              {project.generatedImage && (
                <div
                  className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent)',
                  }}
                />
              )}
            </div>
          </div>

          {/* Right Column: Actions Panel */}
          <div className="lg:col-span-7 animate-slide-up-delayed-2 flex flex-col gap-8">

            {/* Actions Card */}
            <div
              className="rounded-2xl p-6 sm:p-8 border transition-all duration-300"
              style={{
                borderColor: isDark ? 'rgba(42, 42, 66, 0.6)' : 'rgba(232, 230, 240, 0.8)',
                background: isDark ? 'rgba(26, 26, 46, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <h2 className="text-lg font-bold mb-1" style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}>
                Actions
              </h2>
              <p className="text-sm mb-6" style={{ color: isDark ? '#6e6c82' : '#9896a8' }}>
                Download your generated image or create a video from it.
              </p>

              <div className="flex flex-col gap-4">

                {/* 1. Download Image */}
                <button
                  onClick={handleDownloadImage}
                  disabled={!project.generatedImage}
                  className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    background: 'linear-gradient(135deg, #9b82ff, #7c52e3)',
                    boxShadow: project.generatedImage ? '0 8px 32px -8px rgba(155, 130, 255, 0.5)' : 'none',
                  }}
                >
                  <Download size={18} />
                  Download Image
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 my-1">
                  <div className="flex-1 h-px" style={{ background: isDark ? 'rgba(42, 42, 66, 0.8)' : 'rgba(232, 230, 240, 0.8)' }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: isDark ? '#6e6c82' : '#9896a8' }}>
                    Video
                  </span>
                  <div className="flex-1 h-px" style={{ background: isDark ? 'rgba(42, 42, 66, 0.8)' : 'rgba(232, 230, 240, 0.8)' }} />
                </div>

                {/* 2. Generate Video */}
                <button
                  onClick={handleGenerateVideo}
                  disabled={isGeneratingVideo || videoGenerated || !project.generatedImage}
                  className="relative flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:scale-[1.02] cursor-pointer disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
                  style={{
                    color: videoGenerated
                      ? '#10b981'
                      : isDark ? '#b4a4ff' : '#7c52e3',
                    background: videoGenerated
                      ? isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.06)'
                      : isDark ? 'rgba(155, 130, 255, 0.1)' : 'rgba(155, 130, 255, 0.06)',
                    border: `1px solid ${
                      videoGenerated
                        ? 'rgba(16, 185, 129, 0.3)'
                        : 'rgba(155, 130, 255, 0.25)'
                    }`,
                  }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {isGeneratingVideo ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Generating Video...
                      </>
                    ) : videoGenerated ? (
                      <>
                        <CheckCircle2 size={18} />
                        Video Generated
                      </>
                    ) : (
                      <>
                        <Film size={18} />
                        Generate Video
                      </>
                    )}
                  </span>
                </button>

                {/* 3. Download Video */}
                <button
                  onClick={handleDownloadVideo}
                  disabled={!videoGenerated || !project.generatedVideo}
                  className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:scale-[1.02] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    color: videoGenerated
                      ? '#ffffff'
                      : isDark ? '#6e6c82' : '#9896a8',
                    background: videoGenerated
                      ? 'linear-gradient(135deg, #ff6090, #ff8a20)'
                      : isDark ? 'rgba(42, 42, 66, 0.4)' : 'rgba(232, 230, 240, 0.6)',
                    border: videoGenerated
                      ? 'none'
                      : `1px solid ${isDark ? 'rgba(42, 42, 66, 0.6)' : 'rgba(232, 230, 240, 0.8)'}`,
                    boxShadow: videoGenerated
                      ? '0 8px 32px -8px rgba(255, 96, 144, 0.4)'
                      : 'none',
                  }}
                >
                  <Play size={18} fill={videoGenerated ? 'currentColor' : 'none'} />
                  Download Video
                </button>
              </div>
            </div>

            {/* Back to Generator link */}
            <div className="flex items-center justify-center">
              <Link
                to="/create"
                className="flex items-center gap-1.5 text-sm font-semibold hover:underline"
                style={{ color: isDark ? '#a8a6b8' : '#64627a' }}
              >
                <RefreshCw size={14} />
                Generate another
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}