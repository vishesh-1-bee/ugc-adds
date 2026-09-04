import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import {
  Sparkles, Image, Video, Loader2, Plus, Clock, CheckCircle2, Film
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  productName: string;
  generatedImage: string;
  generatedVideo: string;
  isGenerating: boolean;
  createdAt: string;
  aspectRatio: string;
}

// Skeleton card shown while loading
function SkeletonCard({ isDark }: { isDark: boolean }) {
  return (
    <div
      className="rounded-2xl overflow-hidden border animate-pulse"
      style={{
        borderColor: isDark ? 'rgba(42,42,66,0.6)' : 'rgba(232,230,240,0.8)',
        background: isDark ? 'rgba(26,26,46,0.6)' : 'rgba(255,255,255,0.7)',
      }}
    >
      {/* Image placeholder */}
      <div
        className="w-full"
        style={{
          aspectRatio: '9/16',
          background: isDark ? 'rgba(42,42,66,0.5)' : 'rgba(232,230,240,0.6)',
        }}
      />
      <div className="p-4 flex flex-col gap-2">
        <div
          className="h-4 w-3/4 rounded-lg"
          style={{ background: isDark ? 'rgba(42,42,66,0.7)' : 'rgba(232,230,240,0.8)' }}
        />
        <div
          className="h-3 w-1/2 rounded-lg"
          style={{ background: isDark ? 'rgba(42,42,66,0.5)' : 'rgba(232,230,240,0.6)' }}
        />
      </div>
    </div>
  );
}

function ProjectCard({ project, isDark }: { project: Project; isDark: boolean }) {
  const date = new Date(project.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <Link
      to={`/results/${project.id}`}
      className="group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 flex flex-col"
      style={{
        borderColor: isDark ? 'rgba(42,42,66,0.6)' : 'rgba(232,230,240,0.8)',
        background: isDark ? 'rgba(26,26,46,0.7)' : 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        boxShadow: isDark
          ? '0 4px 24px -8px rgba(0,0,0,0.4)'
          : '0 4px 24px -8px rgba(0,0,0,0.08)',
      }}
    >
      {/* Thumbnail */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: project.aspectRatio === '16:9' ? '16/9' : '9/16' }}
      >
        {project.generatedImage ? (
          <img
            src={project.generatedImage}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2"
            style={{ background: isDark ? 'rgba(42,42,66,0.4)' : 'rgba(232,230,240,0.5)' }}
          >
            {project.isGenerating ? (
              <>
                <Loader2 size={24} className="animate-spin" style={{ color: '#9b82ff' }} />
                <span className="text-xs font-medium" style={{ color: isDark ? '#6e6c82' : '#9896a8' }}>
                  Generating...
                </span>
              </>
            ) : (
              <Image size={24} style={{ color: isDark ? '#4a4a62' : '#c8c6d8' }} />
            )}
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-2 right-2">
          {project.isGenerating ? (
            <span
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold"
              style={{ background: 'rgba(155,130,255,0.85)', color: '#fff' }}
            >
              <Loader2 size={9} className="animate-spin" />
              Processing
            </span>
          ) : project.generatedVideo ? (
            <span
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold"
              style={{ background: 'rgba(16,185,129,0.85)', color: '#fff' }}
            >
              <Film size={9} />
              Video
            </span>
          ) : project.generatedImage ? (
            <span
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold"
              style={{ background: 'rgba(26,26,46,0.75)', color: '#b4a4ff' }}
            >
              <CheckCircle2 size={9} />
              Done
            </span>
          ) : null}
        </div>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          style={{ background: 'rgba(15,15,26,0.5)' }}
        >
          <span
            className="text-xs font-bold text-white px-4 py-2 rounded-xl"
            style={{ background: 'rgba(155,130,255,0.8)' }}
          >
            View Results →
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1 flex-1">
        <p
          className="text-sm font-bold truncate"
          style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}
        >
          {project.name}
        </p>
        <p
          className="text-xs truncate"
          style={{ color: isDark ? '#6e6c82' : '#9896a8' }}
        >
          {project.productName}
        </p>
        <div
          className="flex items-center gap-1 mt-1"
          style={{ color: isDark ? '#4a4a62' : '#c8c6d8' }}
        >
          <Clock size={11} />
          <span className="text-[11px]">{date}</span>
        </div>
      </div>
    </Link>
  );
}

// Empty state when user has no projects yet
function EmptyState({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
        style={{
          background: isDark ? 'rgba(155,130,255,0.1)' : 'rgba(155,130,255,0.08)',
          border: '1px solid rgba(155,130,255,0.2)',
        }}
      >
        <Sparkles size={36} style={{ color: '#9b82ff' }} />
      </div>
      <h2
        className="font-display text-2xl font-bold mb-2"
        style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}
      >
        No generations yet
      </h2>
      <p className="text-sm mb-8 max-w-xs" style={{ color: isDark ? '#6e6c82' : '#9896a8' }}>
        Create your first AI-powered UGC ad and it will show up here.
      </p>
      <Link
        to="/create"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
        style={{
          background: 'linear-gradient(135deg, #9b82ff, #7c52e3)',
          boxShadow: '0 8px 32px -8px rgba(155,130,255,0.5)',
        }}
      >
        <Plus size={16} />
        Create your first ad
      </Link>
    </div>
  );
}

export default function MyGeneration() {
  const { isDark } = useTheme();
  const { getToken } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const BASE = import.meta.env.VITE_BASEURL || 'http://localhost:2000';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = await getToken();
        const res = await fetch(`${BASE}/api/user/projects`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setProjects(data.project || []);
      } catch {
        // silent fail — empty state shown
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, [getToken]);

  const imageCount = projects.filter((p) => p.generatedImage).length;
  const videoCount = projects.filter((p) => p.generatedVideo).length;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-hero py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient orbs */}
      <div
        className="absolute top-10 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(155,130,255,0.3), transparent)' }}
      />
      <div
        className="absolute bottom-10 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,96,144,0.25), transparent)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 animate-slide-up">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#9b82ff' }}>
              Your Studio
            </span>
            <h1
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-1"
              style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}
            >
              My Generations
            </h1>
          </div>

          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg self-start sm:self-auto"
            style={{
              background: 'linear-gradient(135deg, #9b82ff, #7c52e3)',
              boxShadow: '0 4px 20px -6px rgba(155,130,255,0.5)',
            }}
          >
            <Plus size={16} />
            New Generation
          </Link>
        </div>

        {/* Stats row — only when there are projects */}
        {!isLoading && projects.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-10 animate-slide-up-delayed">
            {[
              { label: 'Total Projects', value: projects.length, icon: Sparkles, color: '#9b82ff' },
              { label: 'Images Generated', value: imageCount, icon: Image, color: '#ff6090' },
              { label: 'Videos Generated', value: videoCount, icon: Video, color: '#10b981' },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-2xl p-4 border flex items-center gap-3"
                  style={{
                    borderColor: isDark ? 'rgba(42,42,66,0.6)' : 'rgba(232,230,240,0.8)',
                    background: isDark ? 'rgba(26,26,46,0.6)' : 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div
                    className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0"
                    style={{ background: `${stat.color}18`, border: `1px solid ${stat.color}33` }}
                  >
                    <Icon size={16} style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p
                      className="text-xl font-bold font-display"
                      style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-[11px]" style={{ color: isDark ? '#6e6c82' : '#9896a8' }}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} isDark={isDark} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <EmptyState isDark={isDark} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 animate-slide-up-delayed-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} isDark={isDark} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}