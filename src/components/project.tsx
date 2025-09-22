import Link from "next/link";
import React, { useState } from "react";
import usePostInfoContext from "@/hooks/usePostInfoContext";
import MediaCarousel from "@/components/MediaCarousel";

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
  const [overlayIndex, setOverlayIndex] = useState(0);
  const { previewLength, previewThreshold } = usePostInfoContext();

  // Use media array if provided, otherwise fall back to imagePaths for backward compatibility
  const mediaItems = media.length > 0 ? media : imagePaths;

  // Helper function to check if URL is a YouTube video
  const isYouTubeVideo = (url: string): boolean => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  /* ---------- helpers ---------- */
  const toggleDescription = () => setIsExpanded((p) => !p);
  const openOverlayAtIndex = (index: number) => {
    if (!isYouTubeVideo(mediaItems[index])) {
      setOverlayIndex(index);
      setOverlayOpen(true);
    }
  };
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).id === "overlay") setOverlayOpen(false);
  };
  const handleOverlayPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOverlayIndex((i) => (i === 0 ? mediaItems.length - 1 : i - 1));
  };
  const handleOverlayNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOverlayIndex((i) => (i === mediaItems.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="card p-6 w-full md:w-[60vw] max-w-[700px]">
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
              <span className="text-gray-800 dark:text-gray-200 underline group-hover:text-accent transition-colors duration-200">
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
              <h2 className="text-sm md:text-md lg:text-lg font-bold underline mb-2 cursor-pointer text-gray-800 dark:text-gray-200 group-hover:text-accent transition-colors duration-200 flex items-center">
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
          <h2 className="text-sm md:text-md lg:text-lg font-bold text-gray-600 dark:text-gray-400 mb-2">
            {projectName}
          </h2>
        )}
        <h3 className="text-xs md:text-sm lg:text-md text-accent dark:text-accent-light">
          {affiliation}
        </h3>
      </div>

      {/* ---------- tech badges ---------- */}
      <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-2 mb-4">
        <div className="flex flex-wrap">
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

      {/* ---------- Media Carousel ---------- */}
      {mediaItems.length > 0 && (
        <div className="w-full flex justify-center mb-4">
          <MediaCarousel
            media={mediaItems}
            onImageClick={openOverlayAtIndex}
            className="max-w-[600px]"
            showDots={true}
            allowSwipe={true}
          />
        </div>
      )}

      {/* ---------- zoom overlay ---------- */}
      {overlayOpen && mediaItems.length > 0 && !isYouTubeVideo(mediaItems[overlayIndex]) && (
        <div
          id="overlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/90 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={`${mediaItems[overlayIndex]}`}
              alt="Zoomed in"
              width={1600}
              height={1600}
              className="object-contain max-w-full max-h-full rounded"
              fetchPriority="high"
              loading="eager"
              decoding="sync"
            />

            {mediaItems.length > 1 && (
              <>
                <button
                  onClick={handleOverlayPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 dark:bg-black/90 rounded-full hover:bg-white dark:hover:bg-black shadow-lg transition-all duration-200"
                  aria-label="Previous image"
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleOverlayNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 dark:bg-black/90 rounded-full hover:bg-white dark:hover:bg-black shadow-lg transition-all duration-200"
                  aria-label="Next image"
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Close button */}
            <button
              onClick={() => setOverlayOpen(false)}
              className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-black/90 rounded-full hover:bg-white dark:hover:bg-black shadow-lg transition-all duration-200"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ---------- description & read‑more ---------- */}
      {isExpanded || description.length <= previewThreshold ? (
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">{description.slice(0, previewLength)}…</p>
      )}

      {description.length > previewThreshold && (
        <button
          onClick={toggleDescription}
          className="mt-2 text-accent hover:text-accent-dark transition-colors duration-200"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default Project;
