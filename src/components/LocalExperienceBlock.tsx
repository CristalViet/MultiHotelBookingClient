'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';
import { 
  MapPin, 
  Clock, 
  Star, 
  Camera, 
  Utensils, 
  ShoppingBag, 
  Mountain, 
  Waves,
  Building,
  Trees,
  Car,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface Experience {
  id: string;
  name: string;
  description: string;
  category: 'restaurant' | 'attraction' | 'shopping' | 'nature' | 'culture' | 'nightlife';
  image: string;
  rating: number;
  reviewCount: number;
  distance: number;
  walkingTime?: number;
  drivingTime?: number;
  price?: {
    min: number;
    max: number;
    currency: string;
  };
  highlights: string[];
  openingHours?: string;
  website?: string;
  recommended: boolean;
}

interface LocalExperienceBlockProps {
  experiences: Experience[];
  title?: string;
  showCategories?: boolean;
  maxItems?: number;
  onExperienceClick?: (experience: Experience) => void;
}

const categoryIcons = {
  restaurant: Utensils,
  attraction: Camera,
  shopping: ShoppingBag,
  nature: Trees,
  culture: Building,
  nightlife: Star,
};

const categoryColors = {
  restaurant: 'bg-orange-100 text-orange-600',
  attraction: 'bg-blue-100 text-blue-600',
  shopping: 'bg-purple-100 text-purple-600',
  nature: 'bg-green-100 text-green-600',
  culture: 'bg-red-100 text-red-600',
  nightlife: 'bg-yellow-100 text-yellow-600',
};

export default function LocalExperienceBlock({ 
  experiences, 
  title,
  showCategories = true,
  maxItems = 6,
  onExperienceClick 
}: LocalExperienceBlockProps) {
  const t = useTranslations('localExperience');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Group experiences by category
  const groupedExperiences = experiences.reduce((acc, experience) => {
    if (!acc[experience.category]) {
      acc[experience.category] = [];
    }
    acc[experience.category].push(experience);
    return acc;
  }, {} as Record<string, Experience[]>);

  // Filter experiences by category
  const filteredExperiences = selectedCategory === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.category === selectedCategory);

  // Get displayed experiences (limited by maxItems)
  const displayedExperiences = filteredExperiences.slice(0, maxItems);

  // Categories for filter
  const categories = Object.keys(groupedExperiences);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(displayedExperiences.length / 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(displayedExperiences.length / 3)) % Math.ceil(displayedExperiences.length / 3));
  };

  const formatDistance = (distance: number) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const getCategoryIcon = (category: string) => {
    const Icon = categoryIcons[category as keyof typeof categoryIcons];
    return Icon || MapPin;
  };

  const getCategoryColor = (category: string) => {
    return categoryColors[category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {title || t('nearbyExperiences')}
          </h3>
          <p className="text-gray-600 mt-1">
            {t('discoverAround')}
          </p>
        </div>
        
        {displayedExperiences.length > 3 && (
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label={t('previous')}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label={t('next')}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Category Filters */}
      {showCategories && categories.length > 1 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('all')} ({experiences.length})
          </button>
          
          {categories.map(category => {
            const Icon = getCategoryIcon(category);
            const count = groupedExperiences[category].length;
            
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {t(`category.${category}`)} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Experiences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedExperiences.map((experience, index) => {
          const Icon = getCategoryIcon(experience.category);
          const categoryColor = getCategoryColor(experience.category);
          
          return (
            <div
              key={experience.id}
              className="card overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              onClick={() => onExperienceClick?.(experience)}
            >
              {/* Image */}
              <div className="relative aspect-[4/3]">
                <Image
                  src={experience.image}
                  alt={experience.name}
                  fill
                  className="object-cover"
                />
                
                {/* Category Badge */}
                <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
                  <Icon className="w-3 h-3 inline mr-1" />
                  {t(`category.${experience.category}`)}
                </div>
                
                {/* Recommended Badge */}
                {experience.recommended && (
                  <div className="absolute top-3 right-3 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    ⭐ {t('recommended')}
                  </div>
                )}
                
                {/* Distance */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {formatDistance(experience.distance)}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Name and Rating */}
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 line-clamp-2 flex-1">
                    {experience.name}
                  </h4>
                  
                  <div className="flex items-center gap-1 ml-3 flex-shrink-0">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{experience.rating}</span>
                    <span className="text-xs text-gray-500">({experience.reviewCount})</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {experience.description}
                </p>

                {/* Highlights */}
                {experience.highlights.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {experience.highlights.slice(0, 2).map((highlight, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                        >
                          {highlight}
                        </span>
                      ))}
                      {experience.highlights.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{experience.highlights.length - 2} {t('more')}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Distance & Time */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{formatDistance(experience.distance)}</span>
                  </div>
                  
                  {experience.walkingTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(experience.walkingTime)} {t('walk')}</span>
                    </div>
                  )}
                  
                  {experience.drivingTime && (
                    <div className="flex items-center gap-1">
                      <Car className="w-4 h-4" />
                      <span>{formatTime(experience.drivingTime)}</span>
                    </div>
                  )}
                </div>

                {/* Price & Opening Hours */}
                <div className="flex items-center justify-between">
                  <div>
                    {experience.price && (
                      <div className="text-sm">
                        <span className="font-semibold text-gray-900">
                          {experience.price.currency}{experience.price.min}
                          {experience.price.max > experience.price.min && 
                            ` - ${experience.price.currency}${experience.price.max}`
                          }
                        </span>
                      </div>
                    )}
                    
                    {experience.openingHours && (
                      <div className="text-xs text-gray-500 mt-1">
                        {experience.openingHours}
                      </div>
                    )}
                  </div>

                  {experience.website && (
                    <button className="text-primary-600 hover:text-primary-700 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More Button */}
      {filteredExperiences.length > maxItems && (
        <div className="text-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className="btn-secondary"
          >
            {t('viewAll')} {filteredExperiences.length} {t('experiences')}
          </button>
        </div>
      )}

      {/* No Results */}
      {filteredExperiences.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            {t('noExperiencesFound')}
          </h4>
          <p className="text-gray-600 mb-4">
            {t('tryDifferentCategory')}
          </p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            {t('showAll')}
          </button>
        </div>
      )}

      {/* Quick Stats */}
      {selectedCategory === 'all' && categories.length > 1 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
          {categories.slice(0, 4).map(category => {
            const Icon = getCategoryIcon(category);
            const count = groupedExperiences[category].length;
            const avgRating = groupedExperiences[category].reduce((sum, exp) => sum + exp.rating, 0) / count;
            
            return (
              <div key={category} className="text-center">
                <div className={`w-12 h-12 rounded-lg ${getCategoryColor(category)} flex items-center justify-center mx-auto mb-2`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="font-medium text-gray-900">{count}</div>
                <div className="text-sm text-gray-600">{t(`category.${category}`)}</div>
                <div className="text-xs text-gray-500 flex items-center justify-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  {avgRating.toFixed(1)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
} 