'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, Maximize2, Play, Pause } from 'lucide-react';

interface ImageCarouselProps {
  images: {
    id: string;
    url: string;
    alt: string;
    caption?: string;
    type: 'photo' | 'video';
  }[];
  hotelName: string;
  onImageClick?: (index: number) => void;
}

export default function ImageCarousel({ images, hotelName, onImageClick }: ImageCarouselProps) {
  const t = useTranslations('hotelDetail');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
    onImageClick?.(currentIndex);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const toggleSlideshow = () => {
    setIsPlaying(!isPlaying);
  };

  // Auto-play slideshow
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(nextImage, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const currentImage = images[currentIndex];

  return (
    <>
      {/* Main Carousel */}
      <div className="relative group">
        {/* Main Image Display */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-gray-200">
          <Image
            src={currentImage.url}
            alt={currentImage.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
          
          {/* Image Type Indicator */}
          {currentImage.type === 'video' && (
            <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
              📹 Video
            </div>
          )}

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-label={t('previousImage')}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-label={t('nextImage')}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={openFullscreen}
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label={t('fullscreen')}
          >
            <Maximize2 className="w-5 h-5" />
          </button>

          {/* Slideshow Controls */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={toggleSlideshow}
              className="w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center"
              aria-label={isPlaying ? t('pauseSlideshow') : t('playSlideshow')}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Image Caption */}
          {currentImage.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <p className="text-sm">{currentImage.caption}</p>
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="mt-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => goToImage(index)}
                  className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === currentIndex
                      ? 'border-primary-500 ring-2 ring-primary-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Video Indicator */}
                  {image.type === 'video' && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  {/* Active Indicator */}
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-primary-500/20" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Progress Dots */}
        {images.length > 1 && (
          <div className="flex justify-center mt-4">
            <div className="flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-primary-600 w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`${t('goToImage')} ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center z-10"
            aria-label={t('close')}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center"
                aria-label={t('previousImage')}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center"
                aria-label={t('nextImage')}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Fullscreen Image */}
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center p-4">
            <div className="relative max-w-full max-h-full">
              <Image
                src={currentImage.url}
                alt={currentImage.alt}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain"
              />
              
              {/* Fullscreen Caption */}
              {currentImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                  <p className="text-center">{currentImage.caption}</p>
                </div>
              )}
            </div>
          </div>

          {/* Fullscreen Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 text-white px-4 py-2 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
} 