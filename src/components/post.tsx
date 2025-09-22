import Link from "next/link";
import React, { useState, useEffect } from "react";
import usePostInfo from "@/hooks/usePostInfoContext";
import usePostInfoContext from "@/hooks/usePostInfoContext";
import LazyImage from "@/components/LazyImage";
import useImagePreloader from "@/hooks/useImagePreloader";
import MediaCarousel from "@/components/MediaCarousel";

type PostProps = {
  postName?: string;
  affiliation?: string;
  caption?: string;
  date: string;
  location?: string;
  link?: string;
  media?: string[];
};

const Post: React.FC<PostProps> = ({
  postName,
  affiliation,
  caption,
  date,
  location,
  link,
  media = [],
}) => {
  // const isProd = process.env.NODE_ENV === 'production';
  // const basePath = isProd ? '/personal-website-2024' : '';

  const [isExpanded, setIsExpanded] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayIndex, setOverlayIndex] = useState(0);
  const { previewLength, previewThreshold } = usePostInfoContext();

  // Use media array directly
  const mediaItems = media;
  const imageOnlyItems = mediaItems.filter(item => !item.includes('youtube.com') && !item.includes('youtu.be'));
  const { preloadNextBatch } = useImagePreloader(imageOnlyItems, 2);

  // Helper function to check if URL is a YouTube video
  const isYouTubeVideo = (url: string): boolean => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const openOverlayAtIndex = (index: number) => {
    if (!isYouTubeVideo(mediaItems[index])) {
      setOverlayIndex(index);
      setOverlayOpen(true);
      preloadNextBatch(index, 3);
    }
  };

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target instanceof Element && event.target.id === "overlay") {
      setOverlayOpen(false);
    }
  };

  const handleOverlayPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOverlayIndex((prevIndex) =>
      prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1
    );
  };

  const handleOverlayNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = overlayIndex === mediaItems.length - 1 ? 0 : overlayIndex + 1;
    setOverlayIndex(nextIndex);
    if (!isYouTubeVideo(mediaItems[nextIndex])) {
      preloadNextBatch(nextIndex, 2);
    }
  };

  return (
    <div className="card p-6 w-full max-w-[700px] mx-auto my-6">
      {/* Header: Post title and affiliation side by side */}
      <div className="flex flex-row items-center justify-between">
        {link ? (
          <Link href={link} className="group flex-1">
            <h2 className="text-md sm:text-xl font-bold text-gray-800 dark:text-gray-200 hover:text-accent transition-colors duration-200 text-left">
              {postName || ""}
            </h2>
          </Link>
        ) : (
          <h2 className="flex-1 text-md sm:text-xl font-bold text-gray-800 dark:text-gray-200 text-left">
            {postName || ""}
          </h2>
        )}
        {affiliation && (
          <h3 className="ml-4 text-xs sm:text-base text-accent dark:text-accent-light text-center sm:text-left">
            {affiliation}
          </h3>
        )}
      </div>

      {/* Meta Information: Date and Location */}
      <div className="border-t border-gray-200 dark:border-neutral-800 mt-4 pt-3 flex flex-col sm:flex-row justify-between items-center text-xs md:text-sm text-gray-500 dark:text-gray-400">
        <div className="mt-0">{date}</div>
        {location && <div className="mt-0">{location}</div>}
      </div>

      {/* Media Carousel */}
      {mediaItems.length > 0 && (
        <div className="mt-4">
          <MediaCarousel
            media={mediaItems}
            onImageClick={openOverlayAtIndex}
            className="max-w-[600px] mx-auto"
            showDots={true}
            allowSwipe={true}
          />
        </div>
      )}

      {/* Zoom overlay */}
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

      {/* ---------- caption & read‑more ---------- */}
      {isExpanded || (caption && caption.length <= previewThreshold) ? (
        <p className="text-gray-700 dark:text-gray-300">{caption}</p>
      ) : caption ? (
        <p className="text-gray-700 dark:text-gray-300">{caption.slice(0, previewLength)}…</p>
      ) : (
        <div></div>
      )}

      {caption && caption.length > previewThreshold && (
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

export default Post;
