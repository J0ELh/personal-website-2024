"use client"
// hooks/useMediaQuery.js
import { useState, useEffect } from 'react';

export default function useMediaQuery(query: any) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Update state if the media query’s match status changes
    const handler = () => setMatches(media.matches);
    media.addEventListener('change', handler);

    // Check immediately on mount
    setMatches(media.matches);

    // Cleanup
    return () => {
      media.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
}
