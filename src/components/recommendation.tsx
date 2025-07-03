import Link from "next/link";
import React, { useState } from "react";

// Define a type for the component props
type RecommendationProps = {
  affiliation: string;
  link?: string;
  imagePaths?: string[];
};

const Recommendation: React.FC<RecommendationProps> = ({
  affiliation,
  link,
  imagePaths = [],
}) => {
  // const isProd = process.env.NODE_ENV === 'production';
  // const basePath = isProd ? '/personal-website-2024' : '';

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
    <div className="flex flex-col items-center">
      <div className="flex flex-row items-center justify-between">
        {link ? (
          <Link href={link} className="text-decoration-line">
            <h2
              className="text-xl font-bold text-blue-500 mb-2 cursor-pointer relative 
                          hover:before:content-[''] hover:before:absolute hover:before:bottom-0 
                          hover:before:left-0 hover:before:w-full hover:before:h-[2px] hover:before:bg-blue-500 
                          hover:before:transition-all hover:before:duration-500"
            >
              {affiliation}
            </h2>
          </Link>
        ) : (
          <h2 className="text-md md:text-xl font-bold text-gray-500 mb-2">
            {affiliation}
          </h2>
        )}
      </div>

      <div className="image-container grid grid-cols-1 gap-4">
        {imagePaths.map((path, idx) => (
          <img
            key={idx}
            src={`${path}`}
            alt={`Recommendation ${affiliation} ${idx + 1}`}
            width={600} // real pixels
            height={338} // keeps 16 : 9
            sizes="(max-width:600px) 100vw, 600px" // never render wider
            className="rounded cursor-pointer"
            onClick={() => openImage(path)}
          />
        ))}
      </div>

      {selectedImage && (
        <div
          id="overlay"
          className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-center items-center"
          onClick={handleOverlayClick}
        >
          <div className="relative max-w-[600px] max-h-[90vh] flex justify-center items-center">
            <img
              src={`${selectedImage}`}
              alt="Zoomed in"
              className="rounded"
              layout="intrinsic"
              width={1600}
              height={900}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommendation;
