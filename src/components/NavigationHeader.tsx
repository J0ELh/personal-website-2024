"use client";
import Link from 'next/link';
import React from 'react';
import { Home, ChevronLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';

const NavigationHeader: React.FC = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  if (isHomePage) return null;

  const getPageTitle = () => {
    switch(pathname) {
      case '/projects':
        return 'Projects';
      case '/about':
        return 'About Me';
      case '/recommendations_awards':
        return 'Recognition';
      case '/experience':
        return 'Experience';
      default:
        return '';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-gray-100 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-2 text-sm
                     text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100
                     transition-colors duration-200 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-900"
            aria-label="Go back home"
          >
            <ChevronLeft className="w-4 h-4" />
            <Home className="w-4 h-4" />
            <span className="font-medium">Home</span>
          </Link>

          {getPageTitle() && (
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {getPageTitle()}
            </h1>
          )}

          <div className="w-20" />
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;