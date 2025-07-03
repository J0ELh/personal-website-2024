import Link from "next/link";
import React, { useState } from "react";
import usePostInfo from "@/hooks/usePostInfoContext";
import usePostInfoContext from "@/hooks/usePostInfoContext";

type PostProps = {
  postName?: string;
  affiliation?: string;
  caption?: string;
  date: string;
  location?: string;
  link?: string;
  imagePaths?: string[];
};

const Post: React.FC<PostProps> = ({
  postName,
  affiliation,
  caption,
  date,
  location,
  link,
  imagePaths = [],
}) => {
  // const isProd = process.env.NODE_ENV === 'production';
  // const basePath = isProd ? '/personal-website-2024' : '';

  const [isExpanded, setIsExpanded] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { previewLength, previewThreshold } = usePostInfoContext();

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const openOverlayAtIndex = (index: number) => {
    setCurrentIndex(index);
    setOverlayOpen(true);
  };

  const closeOverlay = () => {
    setOverlayOpen(false);
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imagePaths.length - 1 : prevIndex - 1
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === imagePaths.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target instanceof Element && event.target.id === "overlay") {
      closeOverlay();
    }
  };

  return (
    <div className="mx-auto my-6 p-3 sm:p-6 bg-white rounded-lg shadow-md w-full max-w-[600px]">
      {/* Header: Post title and affiliation side by side */}
      <div className="flex flex-row items-center justify-between">
        {link ? (
          <Link href={link} className="group flex-1">
            <h2 className="text-md sm:text-xl font-bold text-gray-800 hover:text-blue-500 transition-colors duration-300 text-left">
              {postName || ""}
            </h2>
          </Link>
        ) : (
          <h2 className="flex-1 text-md sm:text-xl font-bold text-gray-800 text-left">
            {postName || ""}
          </h2>
        )}
        {affiliation && (
          <h3 className="ml-4 text-xs sm:text-base text-blue-800 text-center sm:text-left">
            {affiliation}
          </h3>
        )}
      </div>

      {/* Meta Information: Date and Location */}
      <div className="border-t mt-4 pt-3 flex flex-col sm:flex-row justify-between items-center text-xs md:text-sm text-gray-600">
        <div className="mt-0">{date}</div>
        {location && <div className="mt-0">{location}</div>}
      </div>

      {imagePaths.length > 0 && (
        <div
          className="relative cursor-pointer w-full max-w-[600px] mx-auto"
          style={{ aspectRatio: "1 / 1" }}
          onClick={() => openOverlayAtIndex(currentIndex)}
        >
          <div className="w-full h-full overflow-hidden rounded border shadow-md flex items-center justify-center">
            <img
              src={imagePaths[currentIndex]}
              alt={`Post Image`}
              className="object-cover w-full h-full"
              fetchPriority="low"
              loading="lazy"
              decoding="async"
            />
          </div>
          {/* Navigation arrows */}
          {imagePaths.length > 1 && (
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

      {overlayOpen && imagePaths.length > 0 && (
        <div
          id="overlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80"
          onClick={handleOverlayClick}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={`${imagePaths[currentIndex]}`}
              alt="Zoomed in"
              width={1600}
              height={1600}
              className="object-contain max-w-full max-h-full rounded"
            />

            {imagePaths.length > 1 && (
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

      {/* ---------- caption & read‑more ---------- */}
      {isExpanded || (caption && caption.length <= previewThreshold) ? (
        <p className="text-gray-900">{caption}</p>
      ) : caption ? (
        <p className="text-gray-900">{caption.slice(0, previewLength)}…</p>
      ) : (
        <div></div>
      )}

      {caption && caption.length > previewThreshold && (
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

export default Post;
