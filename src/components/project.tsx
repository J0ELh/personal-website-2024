import Link from 'next/link';
import React, { useState } from 'react';

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
  Java: './svgs/java.svg',  // Path to the SVG for Java
  Unity: './svgs/unity-69.svg',  // Path to the SVG for Unity
  FastAPI: './svgs/fastapi-1.svg',
  NextJS: './svgs/nextjs-2.svg',
  Python: './svgs/python-5.svg',
  React: './svgs/react-2.svg',
  Supabase: './svgs/supabase.svg',
  Yolo: './svgs/yolo.svg',
  ScikitLearn: './svgs/scikit-learn.svg'
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
      <div className='flex flex-row items-center'>
        {link ? (
          <Link href={link} className='text-decoration-line'>
            <h2 className="text-xl font-bold text-blue-500 mb-2 cursor-pointer">{projectName}</h2>
          </Link>
        ) : (
          <h2 className="text-xl font-bold text-gray-500 mb-2">{projectName}</h2>
        )}
        {/* Render technology badges next to the project name */}
        <div className="flex ml-2">
          {technologies.map((tech, index) => (
            <img key={index} src={technologyIcons[tech]} alt={`${tech} logo`} className="h-6 w-6 m-1" />
          ))}
        </div>
        <div className="flex-grow"></div> {/* This pushes the affiliation to the right */}
        <h3 className="text-md text-blue-800 select-none">{affiliation}</h3>
    </div>

      
      

      <div className="image-container">
        {imagePaths.map((path, index) => (
          <img 
            key={index} 
            src={path} 
            alt={`Project ${projectName} Image ${index + 1}`} 
            className="m-2 max-w-1/2 h-auto rounded border-black border-1 shadow-md cursor-pointer"
            onClick={() => openImage(path)}
          />
        ))}
      </div>

      {selectedImage && (
        <div 
          id="overlay" 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center"
          onClick={handleOverlayClick}
        >
          <img 
            src={selectedImage}
            style={{ padding: "5px", margin: '20px', maxWidth: '90%', maxHeight: '90%' }}
            alt="Zoomed in" 
            className="rounded rounded" 
            onClick={(e) => e.stopPropagation()} 
          />
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
