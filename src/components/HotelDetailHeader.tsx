'use client';

import { useTranslations } from 'next-intl';
import { Star, MapPin, Heart, Share2, Award, Verified } from 'lucide-react';
import { useState } from 'react';

interface HotelDetailHeaderProps {
  hotel: {
    id: string;
    name: string;
    rating: number;
    reviewCount: number;
    location: string;
    address: string;
    category: string;
    verified?: boolean;
    awards?: string[];
    priceRange: {
      min: number;
      max: number;
      currency: string;
    };
  };
  onShareClick?: () => void;
  onFavoriteClick?: () => void;
}

export default function HotelDetailHeader({ 
  hotel, 
  onShareClick, 
  onFavoriteClick 
}: HotelDetailHeaderProps) {
  const t = useTranslations('hotelDetail');
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavoriteClick?.();
  };

  const handleShare = () => {
    onShareClick?.();
  };

  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return t('excellent');
    if (rating >= 4.0) return t('veryGood');
    if (rating >= 3.5) return t('good');
    if (rating >= 3.0) return t('average');
    return t('poor');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'luxury':
        return '👑';
      case 'business':
        return '💼';
      case 'family':
        return '👨‍👩‍👧‍👦';
      case 'romantic':
        return '💕';
      case 'budget':
        return '💰';
      default:
        return '🏨';
    }
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Main Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Left Side - Hotel Info */}
          <div className="flex-1">
            {/* Category & Verification */}
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                <span className="mr-1">{getCategoryIcon(hotel.category)}</span>
                {t(`category.${hotel.category}`)}
              </span>
              
              {hotel.verified && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <Verified className="w-3 h-3 mr-1" />
                  {t('verified')}
                </span>
              )}
              
              {hotel.awards && hotel.awards.length > 0 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <Award className="w-3 h-3 mr-1" />
                  {hotel.awards.length} {t('awards')}
                </span>
              )}
            </div>

            {/* Hotel Name */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {hotel.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center bg-primary-600 text-white px-3 py-1 rounded-lg">
                <Star className="w-4 h-4 fill-current mr-1" />
                <span className="font-bold">{hotel.rating}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">
                  {getRatingLabel(hotel.rating)}
                </span>
                <span className="text-sm text-gray-600">
                  {hotel.reviewCount.toLocaleString()} {t('reviews')}
                </span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2 text-gray-600 mb-4">
              <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">{hotel.location}</p>
                <p className="text-sm">{hotel.address}</p>
              </div>
            </div>
          </div>

          {/* Right Side - Actions & Price */}
          <div className="lg:text-right">
            {/* Action Buttons */}
            <div className="flex lg:justify-end gap-3 mb-4">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-medium">{t('share')}</span>
              </button>
              
              <button
                onClick={handleFavorite}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                  isFavorite
                    ? 'bg-red-50 border-red-300 text-red-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">
                  {isFavorite ? t('saved') : t('save')}
                </span>
              </button>
            </div>

            {/* Price Range */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">{t('priceFrom')}</div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-primary-600">
                  {hotel.priceRange.currency}{hotel.priceRange.min.toLocaleString()}
                </span>
                <span className="text-gray-600">- {hotel.priceRange.currency}{hotel.priceRange.max.toLocaleString()}</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">{t('perNight')}</div>
            </div>
          </div>
        </div>

        {/* Awards Section */}
        {hotel.awards && hotel.awards.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">{t('awardsRecognition')}</h3>
            <div className="flex flex-wrap gap-2">
              {hotel.awards.map((award, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-50 text-yellow-800 border border-yellow-200"
                >
                  <Award className="w-3 h-3 mr-1" />
                  {award}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 