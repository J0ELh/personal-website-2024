import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import LazyImage from '@/components/LazyImage';

interface MediaCarouselProps {
  media: string[];
  onImageClick?: (index: number) => void;
  className?: string;
  showDots?: boolean;
  allowSwipe?: boolean;
}

const MediaCarousel: React.FC<MediaCarouselProps> = ({
  media,
  onImageClick,
  className = '',
  showDots = true,
  allowSwipe = true,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: false,
    containScroll: 'trimSnaps',
    draggable: allowSwipe,
  });

  const getYouTubeId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?v=)|(shorts\/))([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[8].length === 11 ? match[8] : null;
  };

  const isYouTubeVideo = (url: string): boolean => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const scrollPrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const handleMediaClick = useCallback((e: React.MouseEvent, index: number) => {
    // Prevent triggering if clicking on navigation areas
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      e.stopPropagation();
      return;
    }

    if (!isYouTubeVideo(media[index]) && onImageClick) {
      onImageClick(index);
    }
  }, [media, onImageClick]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      if (emblaApi) emblaApi.scrollPrev();
    } else if (e.key === 'ArrowRight') {
      if (emblaApi) emblaApi.scrollNext();
    }
  }, [emblaApi]);

  if (!media || media.length === 0) return null;

  return (
    <div className={`embla relative ${className}`} onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="embla__viewport overflow-hidden rounded-lg border shadow-md" ref={emblaRef}>
        <div className="embla__container flex">
          {media.map((item, index) => {
            const isVideo = isYouTubeVideo(item);
            return (
              <div
                key={index}
                className="embla__slide flex-[0_0_100%] min-w-0 relative aspect-square cursor-pointer"
                onClick={(e) => handleMediaClick(e, index)}
              >
                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  {isVideo ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${getYouTubeId(item)}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  ) : (
                    <LazyImage
                      src={item}
                      alt={`Media ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Arrows - Only show if more than one item */}
      {media.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            onTouchEnd={(e) => e.stopPropagation()}
            className="embla__prev absolute left-2 top-1/2 -translate-y-1/2 p-2 sm:p-3
                       bg-white/90 dark:bg-black/90 rounded-full
                       hover:bg-white dark:hover:bg-black
                       shadow-lg transition-all duration-200 z-20
                       text-gray-800 dark:text-gray-200
                       hover:scale-110 focus:outline-none focus:ring-2
                       focus:ring-accent touch-manipulation"
            aria-label="Previous image"
            type="button"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={scrollNext}
            onTouchEnd={(e) => e.stopPropagation()}
            className="embla__next absolute right-2 top-1/2 -translate-y-1/2 p-2 sm:p-3
                       bg-white/90 dark:bg-black/90 rounded-full
                       hover:bg-white dark:hover:bg-black
                       shadow-lg transition-all duration-200 z-20
                       text-gray-800 dark:text-gray-200
                       hover:scale-110 focus:outline-none focus:ring-2
                       focus:ring-accent touch-manipulation"
            aria-label="Next image"
            type="button"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Dot Indicators with overflow handling */}
      {showDots && media.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
          <div className="relative flex items-center gap-2 max-w-[200px] sm:max-w-[300px]">
            {/* Show limited dots with fade effect */}
            {media.length <= 10 ? (
              // Show all dots if 10 or fewer
              media.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollTo(index);
                  }}
                  className={`rounded-full transition-all duration-200 touch-manipulation flex-shrink-0
                             ${index === selectedIndex
                               ? 'bg-white w-6 h-2'
                               : 'bg-white/50 hover:bg-white/75 w-2 h-2'}`}
                  aria-label={`Go to image ${index + 1}`}
                  type="button"
                />
              ))
            ) : (
              // Show smart dots with ellipsis for many items
              <>
                <div className="flex items-center gap-2 overflow-hidden">
                  {/* Always show first dot */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollTo(0);
                    }}
                    className={`rounded-full transition-all duration-200 touch-manipulation flex-shrink-0
                               ${selectedIndex === 0
                                 ? 'bg-white w-6 h-2'
                                 : 'bg-white/50 hover:bg-white/75 w-2 h-2'}`}
                    aria-label="Go to first image"
                    type="button"
                  />

                  {/* Show ellipsis or dots near the start */}
                  {selectedIndex > 3 && (
                    <div className="flex gap-1 px-1">
                      <div className="w-1 h-1 rounded-full bg-white/30" />
                      <div className="w-1 h-1 rounded-full bg-white/30" />
                      <div className="w-1 h-1 rounded-full bg-white/30" />
                    </div>
                  )}

                  {/* Show 5 dots around current position */}
                  {media.map((_, index) => {
                    const distance = Math.abs(index - selectedIndex);
                    const showDot =
                      (selectedIndex <= 3 && index <= 6) || // Near start
                      (selectedIndex >= media.length - 4 && index >= media.length - 7) || // Near end
                      (distance <= 2 && index !== 0 && index !== media.length - 1); // Around current

                    if (!showDot) return null;

                    return (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollTo(index);
                        }}
                        className={`rounded-full transition-all duration-200 touch-manipulation flex-shrink-0
                                   ${index === selectedIndex
                                     ? 'bg-white w-6 h-2'
                                     : 'bg-white/50 hover:bg-white/75 w-2 h-2'}`}
                        aria-label={`Go to image ${index + 1}`}
                        type="button"
                      />
                    );
                  })}

                  {/* Show ellipsis or dots near the end */}
                  {selectedIndex < media.length - 4 && (
                    <div className="flex gap-1 px-1">
                      <div className="w-1 h-1 rounded-full bg-white/30" />
                      <div className="w-1 h-1 rounded-full bg-white/30" />
                      <div className="w-1 h-1 rounded-full bg-white/30" />
                    </div>
                  )}

                  {/* Always show last dot */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollTo(media.length - 1);
                    }}
                    className={`rounded-full transition-all duration-200 touch-manipulation flex-shrink-0
                               ${selectedIndex === media.length - 1
                                 ? 'bg-white w-6 h-2'
                                 : 'bg-white/50 hover:bg-white/75 w-2 h-2'}`}
                    aria-label="Go to last image"
                    type="button"
                  />
                </div>

                {/* Counter text for many images */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-white/80 text-xs whitespace-nowrap">
                  {selectedIndex + 1} / {media.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Media counter for accessibility */}
      {media.length > 1 && (
        <div className="sr-only" aria-live="polite">
          Image {selectedIndex + 1} of {media.length}
        </div>
      )}
    </div>
  );
};

export default MediaCarousel;