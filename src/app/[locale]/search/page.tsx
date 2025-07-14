'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';

// Resort data for Tuan Chau Resort
const tuanChauResort = [
  {
    id: '1',
    name: 'Tuần Châu Resort Hạ Long',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'
    ],
    rating: 4.9,
    reviewCount: 1847,
    location: 'Đảo Tuần Châu, Hạ Long, Quảng Ninh',
    distance: '100m từ Công viên Tuần Châu',
    latitude: 20.9101,
    longitude: 107.0837,
    price: 200,
    originalPrice: 250,
    currency: '$',
    amenities: ['wifi', 'parking', 'restaurant', 'pool', 'spa'],
    description: 'Resort nghỉ dưỡng đẳng cấp trên đảo Tuần Châu với kiến trúc giao thoa Việt-Pháp và tầm nhìn tuyệt đẹp ra Vịnh Hạ Long.',
    featured: true,
    category: 'luxury'
  },
];

export default function SearchPage() {
  const t = useTranslations('search');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedHotelId, setSelectedHotelId] = useState<string | undefined>();
  
  // Read URL parameters
  const checkin = searchParams.get('checkin') || '';
  const checkout = searchParams.get('checkout') || '';
  const adults = parseInt(searchParams.get('adults') || '2');
  const children = parseInt(searchParams.get('children') || '0');
  const rooms = parseInt(searchParams.get('rooms') || '1');
  const promoCode = searchParams.get('promo_code') || '';

  const handleHotelSelect = (hotelId: string) => {
    setSelectedHotelId(hotelId);
    
    // Redirect to new booking flow with all parameters
    const params = new URLSearchParams();
    params.set('hotel_id', hotelId);
    params.set('hotel_name', 'Tuần Châu Resort Hạ Long');
    
    if (checkin) params.set('checkin', checkin);
    if (checkout) params.set('checkout', checkout);
    params.set('adults', adults.toString());
    params.set('children', children.toString());
    params.set('rooms', rooms.toString());
    if (promoCode) params.set('promo_code', promoCode);
    
    router.push(`/new-booking?${params.toString()}`);
  };

  // Calculate search result info
  const totalGuests = adults + children;
  const formatDateRange = () => {
    if (!checkin || !checkout) return '';
    
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const nights = Math.ceil((checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 3600 * 24));
    
    return `${checkinDate.toLocaleDateString('vi-VN')} - ${checkoutDate.toLocaleDateString('vi-VN')} (${nights} đêm)`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Tuần Châu Resort Hạ Long
            </h1>
            <p className="text-xl text-white/90">
              Kiểm tra tình trạng phòng trống và đặt phòng
            </p>
            
            {/* Search Summary */}
            {(checkin || checkout || totalGuests > 0) && (
              <div className="mt-4 text-lg text-white/80">
                <div className="flex flex-wrap justify-center items-center gap-4">
                  {formatDateRange() && (
                    <span className="bg-white/20 rounded-full px-4 py-2">
                      📅 {formatDateRange()}
                    </span>
                  )}
                  <span className="bg-white/20 rounded-full px-4 py-2">
                    👥 {totalGuests} khách • {rooms} phòng
                  </span>
                  {promoCode && (
                    <span className="bg-green-500/30 rounded-full px-4 py-2">
                      🏷️ {promoCode}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Search Bar */}
          <div className="max-w-5xl mx-auto">
            <SearchBar 
              initialCheckin={checkin}
              initialCheckout={checkout}
              initialAdults={adults}
              initialChildren={children}
              initialRooms={rooms}
              initialPromoCode={promoCode}
            />
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Kết quả tìm kiếm
              </h2>
              <p className="text-gray-600 mt-1">
                Tìm thấy {tuanChauResort.length} khách sạn phù hợp
              </p>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center space-x-4">
              <button className="text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg px-4 py-2">
                📊 Sắp xếp theo giá
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg px-4 py-2">
                🔍 Bộ lọc
              </button>
            </div>
          </div>

          {/* Search Criteria Summary */}
          {(checkin && checkout) && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-blue-800">
                  <span className="font-medium">Tiêu chí tìm kiếm:</span>
                  <span>{formatDateRange()}</span>
                  <span>• {totalGuests} khách, {rooms} phòng</span>
                  {promoCode && <span>• Mã KM: {promoCode}</span>}
                </div>
                <button 
                  onClick={() => router.push('/search')}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  Tìm kiếm mới
                </button>
              </div>
            </div>
          )}
          
          <SearchResults
            hotels={tuanChauResort}
            loading={false}
            onHotelSelect={handleHotelSelect}
          />
          
          {/* Additional Info */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              📍 Về Tuần Châu Resort
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Vị trí</h4>
                <p>Tọa lạc trên đảo Tuần Châu xinh đẹp, cách trung tâm Hạ Long 5km. Resort có vị trí thuận lợi để khám phá Vịnh Hạ Long và các điểm du lịch nổi tiếng.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Tiện ích</h4>
                <ul className="space-y-1">
                  <li>• Hồ bơi ngoài trời với view vịnh Hạ Long</li>
                  <li>• Spa & trung tâm chăm sóc sức khỏe</li>
                  <li>• Nhà hàng phục vụ ẩm thực đa dạng</li>
                  <li>• Dịch vụ đưa đón miễn phí</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 