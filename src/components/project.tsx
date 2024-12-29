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
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const openImage = (path: string) => {
    setSelectedImage(path);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.id === "overlay") {
      closeImage();
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
                src={technologyIcons[tech]} 
                alt={`${tech} logo`} 
                layout="fill" 
                objectFit="contain" 
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

      <div className="image-container grid grid-cols-2 gap-4" style={{ height: '500px' }}> {/* Parent with defined height */}
        {imagePaths.map((path, index) => (
          <div 
            key={index} 
            className="relative cursor-pointer" 
            style={{ height: '90%', width: '90%' }} // 90% relative to parent
          >
            <Image 
              src={path} 
              alt={`Project ${projectName} Image ${index + 1}`} 
              layout="fill"
              objectFit="cover"
              className="rounded border-black border shadow-md"
              onClick={() => openImage(path)}
            />
          </div>
        ))}
      </div>


      {selectedImage && (
        <div 
          id="overlay" 
          className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-center items-center"
          onClick={handleOverlayClick}
        >
          <div className="relative w-full h-full max-w-4xl max-h-[90vh] flex justify-center items-center">
            <Image 
              src={selectedImage}
              alt="Zoomed in" 
              layout="intrinsic" 
              width={1600} 
              height={900}
              className="rounded"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        </div>
      )}

      {isExpanded || description.length <= previewLength ? (
        <p className="text-gray-900">{description}</p>
      ) : (
        <p className="text-gray-900">{description.substring(0, previewLength)}...</p>
      )}

      {description.length > previewLength && (
        <button onClick={toggleDescription} className="text-blue-500 hover:text-blue-700">
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

export default Project;
