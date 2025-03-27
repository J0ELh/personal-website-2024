import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';


// Define a type for the component props
type ProjectProps = {
  projectName: string;
  affiliation: string;
  description: string;
  technologies?: string[];  // Added to include technology identifiers
  link?: string;
  imagePaths?: string[];
};

const technologyIcons: Record<string, string> = {
  Java: '/svgs/java.svg',  // Path to the SVG for Java
  Unity: '/svgs/unity-69.svg',  // Path to the SVG for Unity
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
};

const Project: React.FC<ProjectProps> = ({
  projectName,
  affiliation,
  description,
  technologies = [],
  link,
  imagePaths = []
}) => {

  const isProd = process.env.NODE_ENV === 'production';
  const basePath = isProd ? '/personal-website-2024' : '';

  const [isExpanded, setIsExpanded] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // Move to the previous image (circular).
  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the overlay click from closing
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imagePaths.length - 1 : prevIndex - 1
    );
  };

  // Move to the next image (circular).
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the overlay click from closing
    setCurrentIndex((prevIndex) =>
      prevIndex === imagePaths.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Clicking outside of the image will close the overlay
    if (event.target instanceof Element && event.target.id === 'overlay') {
      closeOverlay();
    }
  };

  const previewLength = 250;

  return (
    <div className="container">
      <div className="flex flex-row items-center justify-between">
        {link ? (
          <Link href={link} passHref>
            <h2 className="text-xl font-bold text-blue-500 mb-2 cursor-pointer relative 
                              hover:before:content-[''] hover:before:absolute hover:before:bottom-0 
                              hover:before:left-0 hover:before:w-full hover:before:h-[2px] hover:before:bg-blue-500 
                              hover:before:transition-all hover:before:duration-500">
              {projectName}
            </h2>
          </Link>
        ) : (
          <h2 className="text-xl font-bold text-gray-500 mb-2">{projectName}</h2>
        )}
        <h3 className="text-md text-blue-800 select-none">{affiliation}</h3>
      </div>

      <div className="bg-gray-50 rounded-md p-1">
        <div className="flex ml-2">
          {technologies.map((tech, index) => (
            <div key={index} className="relative h-6 w-6 m-1">
              <Image
                src={`${basePath}${technologyIcons[tech]}`}
                alt={`${tech} logo`}
                layout="fill"
                objectFit="contain"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="image-container grid grid-cols-2 gap-4"
        style={{ height: '500px' }}
      >
        {imagePaths.length > 0 && (
          <div
            className="relative cursor-pointer"
            style={{ height: '90%', width: '90%' }}
            onClick={() => openOverlayAtIndex(currentIndex)}
          >
            
            <Image
              src={`${basePath}${imagePaths.at(currentIndex) as string}`}
              alt={`Project ${projectName} Image`}
              layout="fill"
              objectFit="cover"
              className="rounded border-black border shadow-md"
              unoptimized
            />
            {/* Only show arrows if there’s more than one image */}
            {imagePaths.length > 1 && (
              <>
                {/* Left arrow */}
                <button
                  onClick={handlePrevious}
                  className="absolute top-1/2 left-0 transform -translate-y-1/2  text-2xl bg-gray-400 bg-opacity-50 rounded h-1/4 p-2 m-2 hover:bg-opacity-70"
                >
                  &#10094;
                </button>

                {/* Right arrow */}
                <button
                  onClick={handleNext}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 text-2xl bg-gray-400 bg-opacity-50 rounded h-1/4 p-2 m-2 hover:bg-opacity-70"
                >
                  &#10095;
                </button>
              </>
            )}
          </div>
        )}
        
      </div>


      {/* Overlay for images */}
      {overlayOpen && imagePaths.length > 0 && (
        <div
          id="overlay"
          className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-center items-center"
          onClick={handleOverlayClick}
        >
          <div className="relative w-full h-full max-w-4xl max-h-[90vh] flex justify-center items-center">
            <Image
              src={`${basePath}${imagePaths[currentIndex]}`}
              alt="Zoomed In"
              layout="intrinsic"
              width={1600}
              height={900}
              className="rounded"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Only show arrows if there’s more than one image */}
            {imagePaths.length > 1 && (
              <>
                {/* Left arrow */}
                <button
                  onClick={handlePrevious}
                  className="absolute left-0  text-2xl bg-gray-400 bg-opacity-50 rounded h-1/4 p-2 m-2 hover:bg-opacity-70"
                >
                  &#10094;
                </button>

                {/* Right arrow */}
                <button
                  onClick={handleNext}
                  className="absolute right-0  text-2xl bg-gray-400 bg-opacity-50 rounded h-1/4 p-2 m-2 hover:bg-opacity-70"
                >
                  &#10095;
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {isExpanded || description.length <= previewLength ? (
        <p className="text-gray-900">{description}</p>
      ) : (
        <p className="text-gray-900">
          {description.substring(0, previewLength)}...
        </p>
      )}

      {description.length > previewLength && (
        <button
          onClick={toggleDescription}
          className="text-blue-500 hover:text-blue-700"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

export default Project;