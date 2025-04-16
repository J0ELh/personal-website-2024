import Link from 'next/link';
import React from 'react';

const HomeButton: React.FC = () => {
  return (
    <Link
      href="/"
      className="fixed top-4 left-4 inline-flex items-center space-x-2 
                 px-4 py-2 bg-gray-800 text-white rounded-full shadow-md
                 hover:bg-blue-600 transition-colors duration-300
                 text-sm sm:text-base"
      aria-label="Go back home"
    >
      {/* SVG back arrow icon */}
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M15 19l-7-7 7-7" />
      </svg>

      {/* "Back" text (always visible, but sized a bit smaller on mobile) */}
      <span>Back</span>
    </Link>
  );
};

export default HomeButton;
