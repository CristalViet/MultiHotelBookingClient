'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';
import { 
  Users, 
  Bed, 
  Wifi, 
  Car, 
  Coffee,
  Bath,
  Maximize2,
  CheckCircle,
  XCircle,
  Info,
  Calendar,
  CreditCard
} from 'lucide-react';

interface RoomCardProps {
  room: {
    id: string;
    name: string;
    images: string[];
    description: string;
    maxGuests: number;
    bedInfo: string;
    size: number;
    amenities: string[];
    inclusions: string[];
    restrictions?: string[];
    price: {
      original?: number;
      current: number;
      currency: string;
      taxesIncluded: boolean;
    };
    availability: {
      available: number;
      total: number;
    };
    cancellation: {
      free: boolean;
      deadline?: string;
    };
    breakfast: boolean;
    refundable: boolean;
  };
  onBookNow?: (roomId: string) => void;
  onViewDetails?: (roomId: string) => void;
}

export default function RoomCard({ room, onBookNow, onViewDetails }: RoomCardProps) {
  const t = useTranslations('hotelDetail');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const amenityIcons = {
    wifi: Wifi,
    parking: Car,
    coffee: Coffee,
    bath: Bath,
  };

  const handleBookNow = () => {
    onBookNow?.(room.id);
  };

  const handleViewDetails = () => {
    setShowDetails(!showDetails);
    onViewDetails?.(room.id);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  const discount = room.price.original 
    ? Math.round(((room.price.original - room.price.current) / room.price.original) * 100)
    : 0;

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Room Images */}
        <div className="lg:w-1/3 relative">
          <div className="relative aspect-[4/3] group">
            <Image
              src={room.images[currentImageIndex]}
              alt={room.name}
              fill
              className="object-cover"
            />
            
            {/* Image Navigation */}
            {room.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ›
                </button>
              </>
            )}

            {/* Image Indicators */}
            {room.images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {room.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Room Features Badge */}
            <div className="absolute top-3 left-3 space-y-1">
              {room.breakfast && (
                <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  🍽️ {t('breakfastIncluded')}
                </span>
              )}
              {room.cancellation.free && (
                <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  ✅ {t('freeCancellation')}
                </span>
              )}
            </div>

            {/* Discount Badge */}
            {discount > 0 && (
              <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                -{discount}%
              </div>
            )}
          </div>
        </div>

        {/* Room Details */}
        <div className="lg:w-2/3 p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{room.description}</p>
              
              {/* Room Specs */}
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{room.maxGuests} {t('guests')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bed className="w-4 h-4" />
                  <span>{room.bedInfo}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Maximize2 className="w-4 h-4" />
                  <span>{room.size}m²</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex items-center gap-3 mb-4">
                {room.amenities.slice(0, 4).map((amenity) => {
                  const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
                  return Icon ? (
                    <div key={amenity} className="flex items-center gap-1 text-gray-500">
                      <Icon className="w-4 h-4" />
                      <span className="text-xs">{t(`amenity.${amenity}`)}</span>
                    </div>
                  ) : null;
                })}
                {room.amenities.length > 4 && (
                  <span className="text-xs text-gray-500">
                    +{room.amenities.length - 4} {t('more')}
                  </span>
                )}
              </div>

              {/* Inclusions & Restrictions */}
              <div className="space-y-2 mb-4">
                {room.inclusions.slice(0, 2).map((inclusion, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>{inclusion}</span>
                  </div>
                ))}
                
                {room.restrictions && room.restrictions.slice(0, 1).map((restriction, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-red-600">
                    <XCircle className="w-4 h-4" />
                    <span>{restriction}</span>
                  </div>
                ))}
              </div>

              {/* Expandable Details */}
              {showDetails && (
                <div className="border-t pt-4 mt-4 space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">{t('whatsIncluded')}</h4>
                    <ul className="space-y-1">
                      {room.inclusions.map((inclusion, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          {inclusion}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {room.restrictions && room.restrictions.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">{t('restrictions')}</h4>
                      <ul className="space-y-1">
                        {room.restrictions.map((restriction, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <XCircle className="w-3 h-3 text-red-500" />
                            {restriction}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* View Details Button */}
              <button
                onClick={handleViewDetails}
                className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium mt-2"
              >
                <Info className="w-4 h-4" />
                {showDetails ? t('hideDetails') : t('viewDetails')}
              </button>
            </div>

            {/* Price & Booking */}
            <div className="ml-6 text-right min-w-0 flex-shrink-0">
              {/* Availability */}
              <div className="mb-3">
                {room.availability.available > 0 ? (
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">
                      {room.availability.available} {t('roomsLeft')}
                    </span>
                    <div className="text-xs text-gray-500">
                      {t('of')} {room.availability.total}
                    </div>
                  </div>
                ) : (
                  <span className="text-red-600 font-medium text-sm">{t('soldOut')}</span>
                )}
              </div>

              {/* Price */}
              <div className="mb-4">
                {room.price.original && (
                  <div className="text-gray-400 text-sm line-through">
                    {room.price.currency}{room.price.original.toLocaleString()}
                  </div>
                )}
                <div className="text-2xl font-bold text-gray-900">
                  {room.price.currency}{room.price.current.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  {t('perNight')}
                  {room.price.taxesIncluded && (
                    <span className="block text-xs">{t('taxesIncluded')}</span>
                  )}
                </div>
              </div>

              {/* Cancellation Info */}
              <div className="mb-4 text-xs text-gray-600">
                {room.cancellation.free ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <Calendar className="w-3 h-3" />
                    <span>{t('freeCancellation')}</span>
                    {room.cancellation.deadline && (
                      <span className="block">{t('until')} {room.cancellation.deadline}</span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-red-600">
                    <XCircle className="w-3 h-3" />
                    <span>{t('nonRefundable')}</span>
                  </div>
                )}
              </div>

              {/* Book Button */}
              <button
                onClick={handleBookNow}
                disabled={room.availability.available === 0}
                className={`w-full px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  room.availability.available > 0
                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                {room.availability.available > 0 ? t('bookNow') : t('soldOut')}
              </button>

              {/* Payment Security */}
              <div className="mt-2 text-xs text-gray-500 text-center">
                🔒 {t('securePayment')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 