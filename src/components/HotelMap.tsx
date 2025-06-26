'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import MapContainer to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface Hotel {
  id: string;
  name: string;
  images: string[];
  rating: number;
  reviewCount: number;
  location: string;
  latitude: number;
  longitude: number;
  price: number;
  currency: string;
  featured?: boolean;
}

interface HotelMapProps {
  hotels: Hotel[];
  onHotelSelect?: (hotelId: string) => void;
  selectedHotelId?: string;
  center?: { lat: number; lng: number };
  zoom?: number;
}

// Custom marker component
const CustomMarker = ({ 
  hotel, 
  isSelected, 
  onSelect 
}: { 
  hotel: Hotel; 
  isSelected: boolean; 
  onSelect: (id: string) => void;
}) => {
  const [leaflet, setLeaflet] = useState<any>(null);

  useEffect(() => {
    import('leaflet').then((L) => {
      setLeaflet(L);
    });
  }, []);

  if (!leaflet) return null;

  // Create custom icon
  const createCustomIcon = (price: number, currency: string, selected: boolean) => {
    const iconHtml = `
      <div style="
        background: ${selected ? '#DC2626' : '#2563EB'};
        color: white;
        padding: 4px 8px;
        border-radius: 16px;
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        min-width: 40px;
      ">
        ${currency}${price}
      </div>
    `;

    return leaflet.divIcon({
      html: iconHtml,
      className: 'custom-price-marker',
      iconSize: [40, 24],
      iconAnchor: [20, 24],
      popupAnchor: [0, -24]
    });
  };

  const customIcon = createCustomIcon(hotel.price, hotel.currency, isSelected);

  return (
    <Marker
      position={[hotel.latitude, hotel.longitude]}
      icon={customIcon}
      eventHandlers={{
        click: () => onSelect(hotel.id)
      }}
    >
      <Popup>
        <div className="w-64 p-2">
          <div className="flex items-start space-x-3">
            <img 
              src={hotel.images[0]} 
              alt={hotel.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">
                {hotel.name}
              </h3>
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span className="text-xs font-medium ml-1">{hotel.rating}</span>
                  <span className="text-xs text-gray-500 ml-1">({hotel.reviewCount})</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-baseline">
                  <span className="font-bold text-blue-600 text-sm">
                    {hotel.currency}{hotel.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">/night</span>
                </div>
                <button 
                  className="text-blue-600 text-xs font-medium hover:text-blue-700"
                  onClick={() => onSelect(hotel.id)}
                >
                  View →
                </button>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default function HotelMap({ 
  hotels, 
  onHotelSelect, 
  selectedHotelId,
  center = { lat: 21.0285, lng: 105.8542 }, // Hanoi default
  zoom = 12 
}: HotelMapProps) {
  const t = useTranslations('search');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleHotelSelect = (hotelId: string) => {
    onHotelSelect?.(hotelId);
  };

  if (!isClient) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
          <p className="text-gray-600">{t('loadingMap')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Map Container */}
      <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg relative z-0">
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          className="leaflet-container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {hotels.map((hotel) => (
            <CustomMarker
              key={hotel.id}
              hotel={hotel}
              isSelected={hotel.id === selectedHotelId}
              onSelect={handleHotelSelect}
            />
          ))}
        </MapContainer>
      </div>
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-2 z-10">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{hotels.length} {t('hotelsOnMap')}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3 z-10">
        <h4 className="text-sm font-medium text-gray-900 mb-2">{t('legend')}</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span className="text-gray-600">{t('availableHotel')}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <span className="text-gray-600">{t('selectedHotel')}</span>
          </div>
        </div>
      </div>

      {/* CSS for Leaflet */}
      <style jsx global>{`
        @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
        
        .leaflet-container {
          height: 100%;
          width: 100%;
          z-index: 1;
        }
        
        .custom-price-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .leaflet-popup-content-wrapper {
          padding: 0;
          border-radius: 8px;
        }
        
        .leaflet-popup-content {
          margin: 0;
          padding: 0;
        }
        
        .leaflet-popup-tip {
          background: white;
        }
      `}</style>
    </div>
  );
} 