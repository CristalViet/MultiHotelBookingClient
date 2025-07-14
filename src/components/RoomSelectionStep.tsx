'use client';

import { useState, useEffect } from 'react';
import { Calendar, Users, Minus, Plus, MapPin, Star } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  price: number;
  image: string;
  size: number;
  capacity: number;
  amenities: string[];
  description?: string;
}

interface Hotel {
  name: string;
  location: string;
  rating: number;
}

interface GuestSelection {
  adults: number;
  children: number;
  rooms: number;
}

interface RoomSelectionStepProps {
  room: Room;
  hotel: Hotel;
  defaultCheckIn?: string;
  defaultCheckOut?: string;
  defaultGuests?: GuestSelection;
  onNext: (data: {
    room: Room;
    hotel: Hotel;
    checkIn: string;
    checkOut: string;
    guests: GuestSelection;
    nights: number;
    subtotal: number;
    total: number;
  }) => void;
  onBack?: () => void;
}

export default function RoomSelectionStep({
  room,
  hotel,
  defaultCheckIn = '',
  defaultCheckOut = '',
  defaultGuests = { adults: 2, children: 0, rooms: 1 },
  onNext,
  onBack
}: RoomSelectionStepProps) {
  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [guests, setGuests] = useState<GuestSelection>(defaultGuests);

  // Set default dates if not provided
  useEffect(() => {
    if (!checkIn) {
      const today = new Date();
      setCheckIn(today.toISOString().split('T')[0]);
    }
    if (!checkOut) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setCheckOut(tomorrow.toISOString().split('T')[0]);
    }
  }, [checkIn, checkOut]);

  // Calculate nights and pricing
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const subtotal = room.price * nights * guests.rooms;
  const taxes = subtotal * 0.1; // 10% tax
  const serviceFee = subtotal * 0.05; // 5% service fee
  const total = subtotal + taxes + serviceFee;

  const updateGuests = (type: keyof GuestSelection, increment: boolean) => {
    setGuests(prev => {
      const newValue = increment ? prev[type] + 1 : prev[type] - 1;
      const minValue = type === 'children' ? 0 : 1;
      const maxValue = type === 'adults' ? 8 : type === 'children' ? 4 : 5;
      
      return {
        ...prev,
        [type]: Math.max(minValue, Math.min(maxValue, newValue))
      };
    });
  };

  const handleNext = () => {
    if (!checkIn || !checkOut || nights <= 0) {
      alert('Vui lòng chọn ngày hợp lệ');
      return;
    }

    onNext({
      room,
      hotel,
      checkIn,
      checkOut,
      guests,
      nights,
      subtotal,
      total
    });
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6">
          <h1 className="text-2xl font-bold mb-2">Xác nhận thông tin đặt phòng</h1>
          <p className="opacity-90">Bước 1 của 4: Chọn phòng và thời gian lưu trú</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
          {/* Left: Room & Hotel Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hotel Info */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600">{hotel.location}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{hotel.name}</h2>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-medium">{hotel.rating}</span>
                <span className="text-gray-500">/5</span>
              </div>
            </div>

            {/* Room Info */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={room.image} 
                    alt={room.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
                  <p className="text-gray-600 mb-4">{room.description || `Phòng ${room.size}m² có thể chứa tối đa ${room.capacity} khách`}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Kích thước:</span>
                      <span className="text-sm font-medium">{room.size}m²</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Sức chứa:</span>
                      <span className="text-sm font-medium">{room.capacity} khách</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Giá/đêm:</span>
                      <span className="text-lg font-bold text-primary-600">{formatPrice(room.price)}</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Tiện nghi:</h4>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.slice(0, 4).map((amenity, index) => (
                        <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 4 && (
                        <span className="text-xs text-gray-500">+{room.amenities.length - 4} thêm</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Chọn ngày lưu trú</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Ngày nhận phòng
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Ngày trả phòng
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              {nights > 0 && (
                <p className="text-sm text-gray-600">
                  Tổng cộng: <span className="font-medium">{nights} đêm</span>
                </p>
              )}
            </div>

            {/* Guest Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Số lượng khách</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Adults */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <Users className="inline w-4 h-4 mr-1 text-gray-500" />
                      <span className="text-sm font-medium">Người lớn</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateGuests('adults', false)}
                        disabled={guests.adults <= 1}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{guests.adults}</span>
                      <button
                        type="button"
                        onClick={() => updateGuests('adults', true)}
                        disabled={guests.adults >= 8}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Từ 18 tuổi trở lên</p>
                </div>

                {/* Children */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <Users className="inline w-4 h-4 mr-1 text-gray-500" />
                      <span className="text-sm font-medium">Trẻ em</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateGuests('children', false)}
                        disabled={guests.children <= 0}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{guests.children}</span>
                      <button
                        type="button"
                        onClick={() => updateGuests('children', true)}
                        disabled={guests.children >= 4}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Từ 0-17 tuổi</p>
                </div>

                {/* Rooms */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-medium">Số phòng</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateGuests('rooms', false)}
                        disabled={guests.rooms <= 1}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{guests.rooms}</span>
                      <button
                        type="button"
                        onClick={() => updateGuests('rooms', true)}
                        disabled={guests.rooms >= 5}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Cùng loại phòng</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Pricing Summary */}
          <div>
            <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tóm tắt đặt phòng</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{formatPrice(room.price)} × {nights} đêm × {guests.rooms} phòng</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Thuế & phí (15%)</span>
                  <span className="font-medium">{formatPrice(taxes + serviceFee)}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng</span>
                  <span className="text-primary-600">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nhận phòng:</span>
                  <span className="font-medium">{checkIn ? new Date(checkIn).toLocaleDateString('vi-VN') : '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Trả phòng:</span>
                  <span className="font-medium">{checkOut ? new Date(checkOut).toLocaleDateString('vi-VN') : '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Khách:</span>
                  <span className="font-medium">{guests.adults} người lớn{guests.children > 0 ? `, ${guests.children} trẻ em` : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phòng:</span>
                  <span className="font-medium">{guests.rooms} phòng</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleNext}
                  disabled={!checkIn || !checkOut || nights <= 0}
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Tiếp tục → Thông tin khách hàng
                </button>
                
                {onBack && (
                  <button
                    onClick={onBack}
                    className="w-full border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    ← Quay lại
                  </button>
                )}
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Miễn phí hủy trong 24h</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Thanh toán an toàn</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Xác nhận ngay lập tức</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 