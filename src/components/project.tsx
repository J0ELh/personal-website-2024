import Link from "next/link";
import React, { useState } from "react";
import usePostInfoContext from "@/hooks/usePostInfoContext";

type ProjectProps = {
  projectName: string;
  affiliation: string;
  description: string;
  technologies?: string[];
  link?: string;
  imagePaths?: string[];
  media?: string[];
};

const technologyIcons: Record<string, string> = {
  Java: "/svgs/java.svg",
  Unity: "/svgs/unity-69.svg",
  FastAPI: "/svgs/fastapi-1.svg",
  NextJS: "/svgs/nextjs-2.svg",
  Python: "/svgs/python-5.svg",
  React: "/svgs/react-2.svg",
  Supabase: "/svgs/supabase.svg",
  Yolo: "/svgs/yolo.svg",
  ScikitLearn: "/svgs/scikit-learn.svg",
  ROS2: "/svgs/ros.svg",
  C: "/svgs/c.svg",
  Arduino: "/svgs/arduino.svg",
  IMU: "/svgs/imu.svg",
  Docker: "/svgs/docker.svg",
};

const Project: React.FC<ProjectProps> = ({
  projectName,
  affiliation,
  description,
  technologies = [],
  link,
  imagePaths = [],
  media = [],
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { previewLength, previewThreshold } = usePostInfoContext();

  // Use media array if provided, otherwise fall back to imagePaths for backward compatibility
  const mediaItems = media.length > 0 ? media : imagePaths;

  // Helper function to extract YouTube video ID
  const getYouTubeId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?v=)|(shorts\/))([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[8].length === 11) ? match[8] : null;
  };

  // Helper function to check if URL is a YouTube video
  const isYouTubeVideo = (url: string): boolean => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  // const isProd = process.env.NODE_ENV === 'production';
  // const basePath = isProd ? '/personal-website-2024' : '';

  /* ---------- helpers ---------- */
  const toggleDescription = () => setIsExpanded((p) => !p);
  const openOverlayAtIndex = (i: number) => {
    if (!isYouTubeVideo(mediaItems[i])) {
      setCurrentIndex(i);
      setOverlayOpen(true);
    }
  };
  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((i) => (i === 0 ? mediaItems.length - 1 : i - 1));
  };
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((i) => (i === mediaItems.length - 1 ? 0 : i + 1));
  };
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).id === "overlay") setOverlayOpen(false);
  };

  return (
    <div className="m-4 p-4 bg-white rounded-lg w-full md:w-[60vw] max-w-[600px]">
      {/* ---------- title / affiliation ---------- */}
      <div className="flex flex-col sm:flex-row items-center justify-between">
        {link ? (
          link.toLowerCase().endsWith(".pdf") ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center text-sm md:text-md lg:text-lg font-bold  mb-2 cursor-pointer"
            >
              <span className="text-gray-800 underline group-hover:text-blue-500 group-hover: transition-colors duration-300">
                {projectName}
              </span>
              <img
                src="/svgs/171454_link_icon.png"
                alt="link icon"
                className="ml-2 w-4 h-4 opacity-70 underline group-hover:opacity-100 "
                style={{ display: "inline-block" }}
              />
            </a>
          ) : (
            <Link href={link} passHref className="group flex items-center">
              <h2 className="text-sm md:text-md lg:text-lg font-bold underline mb-2 cursor-pointer text-gray-800 group-hover:text-blue-500 group-hover:underline transition-colors duration-300 flex items-center">
                {projectName}
                <img
                  src="/svgs/171454_link_icon.png"
                  alt="link icon"
                  className="ml-2 w-4 h-4 opacity-70  group-hover:opacity-100 "
                  style={{ display: "inline-block" }}
                />
              </h2>
            </Link>
          )
        ) : (
          <h2 className="text-sm md:text-md lg:text-lg font-bold text-gray-500 mb-2">
            {projectName}
          </h2>
        )}
        <h3 className="text-xs md:text-sm lg:text-md text-blue-800">
          {affiliation}
        </h3>
      </div>

      {/* ---------- tech badges ---------- */}
      <div className="bg-gray-50 rounded-md p-1 mb-4">
        <div className="flex flex-wrap ml-2">
          {technologies.map((tech) => (
            <div key={tech} className="relative h-6 w-6 m-1">
              <img
                src={`${technologyIcons[tech]}`}
                alt={`${tech} logo`}
                className="object-cover w-full h-full"
                sizes="24px"
                fetchPriority="low"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ---------- full‑width, centred thumbnail ---------- */}
      <div className="w-full flex justify-center mb-4">
        {mediaItems.length > 0 && (
          <div
            className="relative w-full aspect-square cursor-pointer max-w-[600px]"
            onClick={() => openOverlayAtIndex(currentIndex)}
          >
            {/* square thumbnail */}
            <div className="w-full h-full overflow-hidden rounded border shadow-md flex items-center justify-center">
              {isYouTubeVideo(mediaItems[currentIndex]) ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${getYouTubeId(mediaItems[currentIndex])}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <img
                  src={mediaItems[currentIndex]}
                  alt={`Project ${projectName} Image`}
                  className="object-cover w-full h-full"
                  fetchPriority="low"
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>

            {/* nav arrows */}
            {mediaItems.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute top-1/2 left-0 -translate-y-1/2 p-2 sm:p-3 text-2xl bg-gray-400/60 rounded hover:bg-gray-400/80"
                >
                  &#10094;
                </button>
                <button
                  onClick={handleNext}
                  className="absolute top-1/2 right-0 -translate-y-1/2 p-2 sm:p-3 text-2xl bg-gray-400/60 rounded hover:bg-gray-400/80"
                >
                  &#10095;
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* ---------- zoom overlay ---------- */}
      {overlayOpen && mediaItems.length > 0 && !isYouTubeVideo(mediaItems[currentIndex]) && (
        <div
          id="overlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80"
          onClick={handleOverlayClick}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={`${mediaItems[currentIndex]}`}
              alt="Zoomed in"
              width={1600}
              height={1600}
              className="object-contain max-w-full max-h-full max-w-[600px] max-h-[80vh] rounded bg-gray-900"
              fetchPriority="low"
              loading="lazy"
              decoding="async"
            />

            {mediaItems.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-0 top-1/2 -translate-y-1/2 p-3 text-3xl bg-gray-400/60 rounded hover:bg-gray-400/80"
                >
                  &#10094;
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-3 text-3xl bg-gray-400/60 rounded hover:bg-gray-400/80"
                >
                  &#10095;
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ---------- description & read‑more ---------- */}
      {isExpanded || description.length <= previewThreshold ? (
        <p className="text-gray-900">{description}</p>
      ) : (
        <p className="text-gray-900">{description.slice(0, previewLength)}…</p>
      )}

      {description.length > previewThreshold && (
        <button
          onClick={toggleDescription}
          className="mt-2 text-blue-500 hover:text-blue-700"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default Project;
