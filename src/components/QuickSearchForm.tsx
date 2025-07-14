'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Calendar, Users, Search } from 'lucide-react';

export default function QuickSearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'vi';

  const [formData, setFormData] = useState({
    checkin: '',
    checkout: '',
    adults: 2,
    children: 0,
    roomType: '',
    promoCode: ''
  });

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Get tomorrow's date for default checkout
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  // Set default dates if not set
  const checkinDate = formData.checkin || today;
  const checkoutDate = formData.checkout || tomorrowStr;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchParams = new URLSearchParams({
      checkin: formData.checkin || today,
      checkout: formData.checkout || tomorrowStr,
      adults: formData.adults.toString(),
      children: formData.children.toString(),
      ...(formData.roomType && { room_type: formData.roomType }),
      ...(formData.promoCode && { promo_code: formData.promoCode })
    });

    router.push(`/${currentLocale}/search?${searchParams.toString()}`);
  };

  const roomTypes = [
    { value: '', label: 'Tất cả loại phòng' },
    { value: 'ancient-double-window', label: 'Ancient Double với Cửa sổ' },
    { value: 'elegance-junior-sea-view', label: 'Elegance Junior Nhìn ra Biển' },
    { value: 'elegance-family-sea-view', label: 'Elegance Family Nhìn ra Biển' },
    { value: 'paradise-suite-standard', label: 'Paradise Suite Standard' },
    { value: 'tuan-chau-villa', label: 'Tuần Châu Resort Villa' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-6xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Tìm kiếm phòng nhanh</h3>
        <p className="text-gray-600">Tìm phòng phù hợp cho kỳ nghỉ của bạn</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-0">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-2">
          {/* Check-in Date */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              <Calendar className="inline w-4 h-4 mr-1" />
              Ngày nhận phòng
            </label>
            <input
              type="date"
              value={formData.checkin}
              onChange={(e) => setFormData({...formData, checkin: e.target.value})}
              min={today}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Chọn ngày"
            />
          </div>

          {/* Check-out Date */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              <Calendar className="inline w-4 h-4 mr-1" />
              Ngày trả phòng
            </label>
            <input
              type="date"
              value={formData.checkout}
              onChange={(e) => setFormData({...formData, checkout: e.target.value})}
              min={checkinDate || today}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Chọn ngày"
            />
          </div>

          {/* Adults */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              <Users className="inline w-4 h-4 mr-1" />
              Người lớn
            </label>
            <select
              value={formData.adults}
              onChange={(e) => setFormData({...formData, adults: parseInt(e.target.value)})}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {[1,2,3,4,5,6,7,8].map(num => (
                <option key={num} value={num}>{num} người lớn</option>
              ))}
            </select>
          </div>

          {/* Children */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              <Users className="inline w-4 h-4 mr-1" />
              Trẻ em
            </label>
            <select
              value={formData.children}
              onChange={(e) => setFormData({...formData, children: parseInt(e.target.value)})}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {[0,1,2,3,4].map(num => (
                <option key={num} value={num}>{num} trẻ em</option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 opacity-0">
              Tìm kiếm
            </label>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Search className="w-5 h-5" />
              Tìm phòng
            </button>
          </div>
        </div>

        {/* Room Type & Promo Code - Two columns below */}
        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Room Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Loại phòng (tùy chọn)
              </label>
              <select
                value={formData.roomType}
                onChange={(e) => setFormData({...formData, roomType: e.target.value})}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {roomTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Promo Code */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <span className="inline-flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.79 21L3 11.21v2c0 .45.54.67.85.35l8.79-8.79c.2-.2.2-.51 0-.71L3.85 2.35C3.54 2.04 3 2.26 3 2.71v2L12.79 13.5c.78.78.78 2.05 0 2.83l-8.79 8.79c-.31.31-.31.85 0 1.16.31.31.85.31 1.16 0l8.79-8.79c1.37-1.37 1.37-3.58 0-4.95L4.16 3.75c-.31-.31-.85-.31-1.16 0-.31.31-.31.85 0 1.16L11.79 13.5z"/>
                  </svg>
                  Mã ưu đãi (tùy chọn)
                </span>
              </label>
              <input
                type="text"
                value={formData.promoCode}
                onChange={(e) => setFormData({...formData, promoCode: e.target.value.toUpperCase()})}
                placeholder="Ví dụ: SUMMER2024"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </form>

      {/* Quick Info */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600 justify-center">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span>Miễn phí hủy phòng</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          <span>Không phí đặt trước</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
          <span>Xác nhận ngay lập tức</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
          <span>Ưu đãi đặc biệt với mã giảm giá</span>
        </div>
      </div>
    </div>
  );
} 