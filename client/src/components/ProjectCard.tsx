import { useNavigate } from "react-router-dom";
import { Project } from "../types";
import React, { useState, useRef, useEffect } from "react";

const ProjectCard = ({
  gen,
  setGeneration,
  forCommnity = false,
}: {
  gen: Project;
  setGeneration: React.Dispatch<React.SetStateAction<Project[]>>;
  forCommnity?: boolean;
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isHovered) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isHovered]);

  // Check if details should be at the top (for 16:9 ratio)
  const detailsAtTop = gen.aspectRatio === "16:9";

  const formatDate = (dateStr?: Date | string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return `Created: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, 5:30:00 am`;
  };

  const previewImage = gen.generatedImage || gen.productImage || gen.uploadedImages?.[0];

  const renderDetails = () => (
    <div className="p-5 flex flex-col gap-3 bg-[#13112b] text-white">
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-lg font-bold font-display tracking-tight text-white line-clamp-1">
          {gen.productName || "Untitled Project"}
        </h3>
        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#242145] text-lavender-300 font-semibold border border-[#37356b] whitespace-nowrap">
          Aspect: {gen.aspectRatio || "9:16"}
        </span>
      </div>

      <p className="text-[11px] text-gray-400 -mt-1">
        {formatDate(gen.createdAt)}
      </p>

      <div className="mt-2">
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
          Description
        </span>
        <div className="mt-1 px-3 py-2 rounded-lg bg-[#1c1a3b] border border-[#2c2a54] text-gray-300 text-xs font-sans line-clamp-2">
          {gen.productDescription || "No description provided"}
        </div>
      </div>

      <p className="text-xs text-gray-300 mt-2 line-clamp-3 leading-relaxed">
        {gen.userPrompt || "No prompt provided"}
      </p>
    </div>
  );

  const renderMedia = () => (
    <div
      className="relative w-full overflow-hidden bg-gray-950 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        aspectRatio: gen.aspectRatio === "16:9" ? "16/9" : gen.aspectRatio === "1:1" ? "1/1" : "9/16",
      }}
    >
      {/* Video element */}
      {gen.generatedVideo ? (
        <div className="w-full h-full relative">
          <video
            ref={videoRef}
            src={gen.generatedVideo}
            poster={gen.generatedImage}
            muted
            loop
            playsInline
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Hover play overlay */}
          {!isHovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/15 transition-opacity duration-300">
              <div className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      ) : previewImage ? (
        <img
          src={previewImage}
          alt={gen.productName || "Generated Asset"}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            gen.isGenerating ? "animate-pulse brightness-75" : ""
          }`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[#1c1a3b]">
          <span className="text-xs text-gray-500">No media preview</span>
        </div>
      )}

      {/* Badges overlay */}
      {gen.isPublished && (
        <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
          Published
        </div>
      )}

      {gen.isGenerating && (
        <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 backdrop-blur-md flex items-center gap-1.5 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
          Generating
        </div>
      )}

      {/* Uploaded assets thumbnail bubbles */}
      {gen.uploadedImages && gen.uploadedImages.length > 0 && (
        <div className="absolute bottom-3 right-3 flex -space-x-3 items-end">
          {gen.uploadedImages.slice(0, 2).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Input ${idx + 1}`}
              className={`${
                idx === 0 ? "w-11 h-11 z-10" : "w-8 h-8 z-20 shadow-[-4px_0_10px_rgba(0,0,0,0.3)]"
              } rounded-full border-2 border-[#13112b] object-cover`}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="mb-6 break-inside-avoid group/card">
      <div className="border border-[#2b285a] rounded-2xl overflow-hidden shadow-lg bg-[#13112b] transition-all duration-300 hover:shadow-lavender-500/10 hover:border-lavender-500/30 hover:scale-[1.01]">
        {detailsAtTop ? (
          <>
            {renderDetails()}
            {renderMedia()}
          </>
        ) : (
          <>
            {renderMedia()}
            {renderDetails()}
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;