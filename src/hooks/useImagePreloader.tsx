import { useEffect, useState } from 'react';

const useImagePreloader = (imagePaths: string[], preloadCount: number = 2) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const preloadImages = () => {
      imagePaths.slice(0, preloadCount).forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setLoadedImages(prev => new Set(prev).add(src));
        };
      });
    };

    preloadImages();
  }, [imagePaths, preloadCount]);

  const preloadNextBatch = (currentIndex: number, batchSize: number = 2) => {
    const startIndex = currentIndex + 1;
    const endIndex = Math.min(startIndex + batchSize, imagePaths.length);
    
    for (let i = startIndex; i < endIndex; i++) {
      if (!loadedImages.has(imagePaths[i])) {
        const img = new Image();
        img.src = imagePaths[i];
        img.onload = () => {
          setLoadedImages(prev => new Set(prev).add(imagePaths[i]));
        };
      }
    }
  };

  return { loadedImages, preloadNextBatch };
};

export default useImagePreloader;