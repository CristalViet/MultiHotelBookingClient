'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Star, MapPin, Wifi, Car, Utensils, Heart, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface HotelCardProps {
  hotel: {
    id: string;
    name: string;
    images: string[];
    rating: number;
    reviewCount: number;
    location: string;
    distance: string;
    price: number;
    originalPrice?: number;
    currency: string;
    amenities: string[];
    description: string;
    featured?: boolean;
  };
  onSelect?: (hotelId: string) => void;
}

export default function HotelCard({ hotel, onSelect }: HotelCardProps) {
  const t = useTranslations('search');
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const amenityIcons = {
    wifi: Wifi,
    parking: Car,
    restaurant: Utensils,
  };

  const discount = hotel.originalPrice 
    ? Math.round(((hotel.originalPrice - hotel.price) / hotel.originalPrice) * 100)
    : 0;

  const handleImageNavigation = (direction: 'prev' | 'next', e: React.MouseEvent) => {
    e.stopPropagation();
    if (direction === 'prev') {
      setCurrentImageIndex(prev => 
        prev === 0 ? hotel.images.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex(prev => 
        prev === hotel.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    onSelect?.(hotel.id);
  };

  return (
    <div 
      className="card hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-lg h-48">
        <Image
          src={hotel.images[currentImageIndex]}
          alt={hotel.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Image Navigation */}
        {hotel.images.length > 1 && (
          <>
            <button
              onClick={(e) => handleImageNavigation('prev', e)}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
            >
              ‹
            </button>
            <button
              onClick={(e) => handleImageNavigation('next', e)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
            >
              ›
            </button>
          </>
        )}

        {/* Image Indicators */}
        {hotel.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {hotel.images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Featured Badge */}
        {hotel.featured && (
          <div className="absolute top-3 left-3 bg-secondary-500 text-white px-2 py-1 rounded-full text-sm font-medium">
            {t('featured')}
          </div>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
            -{discount}%
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
            discount > 0 ? 'top-12' : ''
          } ${
            isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Hotel Name & Rating */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {hotel.name}
          </h3>
          <div className="flex items-center space-x-1 ml-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-sm">{hotel.rating}</span>
            <span className="text-gray-500 text-sm">({hotel.reviewCount})</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="line-clamp-1">{hotel.location}</span>
          <span className="mx-2">•</span>
          <span>{hotel.distance}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {hotel.description}
        </p>

        {/* Amenities */}
        <div className="flex items-center space-x-3 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity) => {
            const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
            return Icon ? (
              <div key={amenity} className="flex items-center text-gray-500">
                <Icon className="w-4 h-4" />
              </div>
            ) : null;
          })}
          {hotel.amenities.length > 3 && (
            <span className="text-gray-500 text-sm">
              +{hotel.amenities.length - 3} {t('moreAmenities')}
            </span>
          )}
        </div>

        {/* Price Section */}
        <div className="flex justify-between items-end">
          <div className="flex items-center space-x-2">
            {hotel.originalPrice && (
              <span className="text-gray-400 text-sm line-through">
                {hotel.currency}{hotel.originalPrice.toLocaleString()}
              </span>
            )}
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-primary-600">
                {hotel.currency}{hotel.price.toLocaleString()}
              </span>
              <span className="text-gray-500 text-sm ml-1">/{t('night')}</span>
            </div>
          </div>
          
          <button className="btn-primary px-4 py-2 text-sm flex items-center space-x-1 group-hover:shadow-md transition-shadow">
            <span>{t('viewDetails')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 