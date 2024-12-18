import Link from 'next/link';
import React, { useState } from 'react';

// Define a type for the component props
type RecommendationProps = {
  affiliation: string;
  link?: string;
  imagePaths?: string[];
};

const Recommendation: React.FC<RecommendationProps> = ({
  affiliation,
  link,
  imagePaths = []
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  return (
    <div className="container">
      <div className='flex flex-row items-center justify-between'>
        {link ? (
          <Link href={link} className='text-decoration-line'>
            <h2 className="text-xl font-bold text-blue-500 mb-2 cursor-pointer relative 
                          hover:before:content-[''] hover:before:absolute hover:before:bottom-0 
                          hover:before:left-0 hover:before:w-full hover:before:h-[2px] hover:before:bg-blue-500 
                          hover:before:transition-all hover:before:duration-500">
                {affiliation}
            </h2>

          </Link>
        ) : (
          <h2 className="text-xl font-bold text-gray-500 mb-2">{affiliation}</h2>
        )}
        
      </div>
      
      <div className="image-container">
        {imagePaths.map((path, index) => (
          <img 
            key={index} 
            src={path} 
            alt={`Recommendation ${affiliation} Image ${index + 1}`} 
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


    </div>
  );
};

export default Recommendation;
