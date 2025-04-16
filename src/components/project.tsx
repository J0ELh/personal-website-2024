import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import usePostInfoContext from '@/hooks/usePostInfoContext';

type ProjectProps = {
  projectName: string;
  affiliation: string;
  description: string;
  technologies?: string[];
  link?: string;
  imagePaths?: string[];
};

const technologyIcons: Record<string, string> = {
  Java: '/svgs/java.svg',
  Unity: '/svgs/unity-69.svg',
  FastAPI: '/svgs/fastapi-1.svg',
  NextJS: '/svgs/nextjs-2.svg',
  Python: '/svgs/python-5.svg',
  React: '/svgs/react-2.svg',
  Supabase: '/svgs/supabase.svg',
  Yolo: '/svgs/yolo.svg',
  ScikitLearn: '/svgs/scikit-learn.svg',
  ROS2: '/svgs/ros.svg',
  C: '/svgs/c.svg',
  Arduino: '/svgs/arduino.svg',
  IMU: '/svgs/imu.svg',
  Docker: '/svgs/docker.svg'
};

const Project: React.FC<ProjectProps> = ({
  projectName,
  affiliation,
  description,
  technologies = [],
  link,
  imagePaths = [],
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {previewLength, previewThreshold} = usePostInfoContext();
  

  const isProd = process.env.NODE_ENV === 'production';
  const basePath = isProd ? '/personal-website-2024' : '';

  /* ---------- helpers ---------- */
  const toggleDescription = () => setIsExpanded((p) => !p);
  const openOverlayAtIndex = (i: number) => {
    setCurrentIndex(i);
    setOverlayOpen(true);
  };
  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((i) => (i === 0 ? imagePaths.length - 1 : i - 1));
  };
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((i) => (i === imagePaths.length - 1 ? 0 : i + 1));
  };
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).id === 'overlay') setOverlayOpen(false);
  };


  return (
    <div className="m-4 p-4 bg-white rounded-lg w-full md:w-[60vw] max-w-[600px]">
      {/* ---------- title / affiliation ---------- */}
      <div className="flex flex-col sm:flex-row items-center justify-between">
        {link ? (
          <Link href={link} passHref>
            <h2 className="text-sm md:text-md lg:text-lg font-bold text-blue-500 mb-2 cursor-pointer hover:underline">
              {projectName}
            </h2>
          </Link>
        ) : (
          <h2 className="text-sm md:text-md lg:text-lg font-bold text-gray-500 mb-2">{projectName}</h2>
        )}
        <h3 className="text-xs md:text-sm lg:text-md text-blue-800">{affiliation}</h3>
      </div>

      {/* ---------- tech badges ---------- */}
      <div className="bg-gray-50 rounded-md p-1 mb-4">
        <div className="flex flex-wrap ml-2">
          {technologies.map((tech) => (
            <div key={tech} className="relative h-6 w-6 m-1">
              <Image
                src={`${basePath}${technologyIcons[tech]}`}
                alt={`${tech} logo`}
                fill
                sizes="24px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

        {/* ---------- full‑width, centred thumbnail ---------- */}
        <div className="w-full flex justify-center mb-4">
        {imagePaths.length > 0 && (
          <div
            className="relative w-full aspect-square cursor-pointer max-w-[600px]"
            onClick={() => openOverlayAtIndex(currentIndex)}
          >
            {/* square thumbnail */}
            <Image
              src={`${basePath}${imagePaths[currentIndex]}`}
              alt={`Project ${projectName} Image`}
              fill
              className="object-cover rounded border shadow-md"
              sizes="(max-width: 640px) 100vw, 50vw"
              priority
            />

            {/* nav arrows */}
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
      </div>

      {/* ---------- zoom overlay ---------- */}
      {overlayOpen && imagePaths.length > 0 && (
        <div
          id="overlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80"
          onClick={handleOverlayClick}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <Image
              src={`${basePath}${imagePaths[currentIndex]}`}
              alt="Zoomed in"
              width={1600}
              height={1600}
              className="object-contain max-w-full max-h-full rounded"
              priority
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

      {/* ---------- description & read‑more ---------- */}
      {isExpanded || description.length <= previewThreshold ? (
        <p className="text-gray-900">{description}</p>
      ) : (
        <p className="text-gray-900">
          {description.slice(0, previewLength)}…
        </p>
      )}

      {description.length > previewThreshold && (
        <button
          onClick={toggleDescription}
          className="mt-2 text-blue-500 hover:text-blue-700"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

export default Project;
