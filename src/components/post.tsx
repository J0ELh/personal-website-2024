import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';

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
            <h2 className="text-xl font-bold text-gray-500  mb-2 cursor-pointer relative 
                          hover:before:content-[''] hover:before:absolute hover:before:bottom-0 
                          hover:before:left-0 hover:before:w-full hover:before:h-[2px] hover:before:bg-blue-500 
                          hover:before:transition-all hover:before:duration-500 hover:text-blue-500 ">
              {postName || ""}
            </h2>
          </Link>
        ) : (
          <h2 className="select:none text-xl font-bold text-gray-500 mb-2">
            {postName || ""}
          </h2>
        )}
        {affiliation && (
          <h3 className="text-md text-blue-800 select-none">{affiliation}</h3>
        )}
      </div>

      <div className="p-2 flex justify-between items-center">
        <div className="ml-2 text-sm text-gray-700">{date}</div>
        {location && (
          <div className="mr-2 text-sm text-gray-700">{location}</div>
        )}
      </div>

      {imagePaths.length > 0 && (
        <div
          className="image-container grid grid-cols-2 gap-4"
          style={{ height: '500px' }}
        >
          <div
            className="relative cursor-pointer"
            style={{ height: '90%', width: '90%' }}
            onClick={() => openOverlayAtIndex(currentIndex)}
          >
            <Image
              src={`${basePath}${imagePaths.at(currentIndex) as string}`}
              alt={`Image for ${postName || 'Untitled Post'}`}
              layout="fill"
              objectFit="cover"
              className="rounded border-black border shadow-md"
              unoptimized
            />
            {imagePaths.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 text-2xl bg-gray-400 bg-opacity-50 rounded h-1/4 p-2 m-2 hover:bg-opacity-70"
                >
                  &#10094;
                </button>
                <button
                  onClick={handleNext}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 text-2xl bg-gray-400 bg-opacity-50 rounded h-1/4 p-2 m-2 hover:bg-opacity-70"
                >
                  &#10095;
                </button>
              </>
            )}
          </div>
        </div>
      )}

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
            {imagePaths.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-0 text-2xl bg-gray-400 bg-opacity-50 rounded h-1/4 p-2 m-2 hover:bg-opacity-70"
                >
                  &#10094;
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-0 text-2xl bg-gray-400 bg-opacity-50 rounded h-1/4 p-2 m-2 hover:bg-opacity-70"
                >
                  &#10095;
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {caption && (
        <>
          {isExpanded || caption.length <= previewLength ? (
            <p className="text-gray-900">{caption}</p>
          ) : (
            <p className="text-gray-900">
              {caption.substring(0, previewLength)}...
            </p>
          )}
          {caption.length > previewLength && (
            <button
              onClick={toggleDescription}
              className="text-blue-500 hover:text-blue-700"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Post;
