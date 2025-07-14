'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Users, Search, Globe } from 'lucide-react';

interface SearchBarProps {
  initialCheckin?: string;
  initialCheckout?: string;
  initialAdults?: number;
  initialChildren?: number;
  initialRooms?: number;
  initialPromoCode?: string;
  onSearch?: (searchData: SearchData) => void;
  showSearchButton?: boolean;
}

interface SearchData {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
    rooms: number;
  };
  currency: string;
  promoCode?: string;
}

export default function SearchBar({ 
  initialCheckin = '',
  initialCheckout = '',
  initialAdults = 2,
  initialChildren = 0,
  initialRooms = 1,
  initialPromoCode = '',
  onSearch,
  showSearchButton = true
}: SearchBarProps = {}) {
  const t = useTranslations('home.search');
  const router = useRouter();
  
  const [destination, setDestination] = useState('Tuần Châu Resort Hạ Long');
  const [checkIn, setCheckIn] = useState(initialCheckin);
  const [checkOut, setCheckOut] = useState(initialCheckout);
  const [guests, setGuests] = useState({ 
    adults: initialAdults, 
    children: initialChildren, 
    rooms: initialRooms 
  });
  const [promoCode, setPromoCode] = useState(initialPromoCode);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  // Update state when props change
  useEffect(() => {
    if (initialCheckin) setCheckIn(initialCheckin);
    if (initialCheckout) setCheckOut(initialCheckout);
    setGuests({
      adults: initialAdults,
      children: initialChildren,
      rooms: initialRooms
    });
    if (initialPromoCode) setPromoCode(initialPromoCode);
  }, [initialCheckin, initialCheckout, initialAdults, initialChildren, initialRooms, initialPromoCode]);

  // Popular currencies for quick selection
  const popularCurrencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
    { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' }
  ];

  const handleSearch = () => {
    const searchData: SearchData = {
      destination, 
      checkIn, 
      checkOut, 
      guests, 
      currency: selectedCurrency,
      promoCode: promoCode || undefined
    };

    // Call custom onSearch handler if provided
    if (onSearch) {
      onSearch(searchData);
      return;
    }

    // Default behavior: redirect to new booking flow with hotel ID
    const params = new URLSearchParams();
    params.set('hotel_id', '1'); // Tuần Châu Resort ID
    params.set('hotel_name', 'Tuần Châu Resort Hạ Long');
    if (checkIn) params.set('checkin', checkIn);
    if (checkOut) params.set('checkout', checkOut);
    params.set('adults', guests.adults.toString());
    params.set('children', guests.children.toString());
    params.set('rooms', guests.rooms.toString());
    if (promoCode) params.set('promo_code', promoCode);
    
    router.push(`/new-booking?${params.toString()}`);
  };

  const updateGuests = (type: 'adults' | 'children' | 'rooms', increment: boolean) => {
    setGuests(prev => {
      const newValue = increment ? prev[type] + 1 : prev[type] - 1;
      
      // Set limits
      if (type === 'adults' && newValue < 1) return prev;
      if (type === 'adults' && newValue > 8) return prev;
      if (type === 'children' && newValue < 0) return prev;
      if (type === 'children' && newValue > 4) return prev;
      if (type === 'rooms' && newValue < 1) return prev;
      if (type === 'rooms' && newValue > 5) return prev;
      
      return { ...prev, [type]: newValue };
    });
  };

  const handleCurrencySelect = (currencyCode: string) => {
    setSelectedCurrency(currencyCode);
    setShowCurrencyDropdown(false);
    // Store currency preference in localStorage
    localStorage.setItem('preferredCurrency', currencyCode);
  };

  const selectedCurrencyData = popularCurrencies.find(c => c.code === selectedCurrency) || popularCurrencies[0];

  return (
    <div className="card p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Destination */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('destination')}
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('destinationPlaceholder')}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="input-field pl-10"
              readOnly
            />
          </div>
        </div>

        {/* Check-in */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('checkin')}
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="input-field pl-10"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        {/* Check-out */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('checkout')}
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="input-field pl-10"
              min={checkIn || new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        {/* Guests */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('guests')}
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <button
              onClick={() => setShowGuestDropdown(!showGuestDropdown)}
              className="input-field pl-10 text-left"
            >
              {`${guests.adults + guests.children} khách, ${guests.rooms} phòng`}
            </button>

            {showGuestDropdown && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-100 p-4 z-10">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Người lớn</span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateGuests('adults', false)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        disabled={guests.adults <= 1}
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{guests.adults}</span>
                      <button
                        onClick={() => updateGuests('adults', true)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        disabled={guests.adults >= 8}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Trẻ em</span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateGuests('children', false)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        disabled={guests.children <= 0}
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{guests.children}</span>
                      <button
                        onClick={() => updateGuests('children', true)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        disabled={guests.children >= 4}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Số phòng</span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateGuests('rooms', false)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        disabled={guests.rooms <= 1}
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{guests.rooms}</span>
                      <button
                        onClick={() => updateGuests('rooms', true)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        disabled={guests.rooms >= 5}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Currency Selector */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tiền tệ
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <button
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="input-field pl-10 text-left flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{selectedCurrencyData.flag}</span>
                <span className="font-medium">{selectedCurrencyData.code}</span>
              </div>
              <span className="text-gray-400">▼</span>
            </button>

            {showCurrencyDropdown && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-100 p-2 z-10">
                <div className="space-y-1">
                  {popularCurrencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => handleCurrencySelect(currency.code)}
                      className={`w-full flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors ${
                        selectedCurrency === currency.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{currency.flag}</span>
                      <div className="flex-1 text-left">
                        <div className="font-medium">{currency.code}</div>
                        <div className="text-xs text-gray-500">{currency.name}</div>
                      </div>
                      <span className="text-sm font-medium">{currency.symbol}</span>
                    </button>
                  ))}
                </div>
                
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <div className="text-xs text-gray-500 text-center">
                    Tỷ giá sẽ được lưu tự động
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Promo Code Field */}
      {initialPromoCode && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mã khuyến mãi
          </label>
          <input
            type="text"
            placeholder="Nhập mã khuyến mãi"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            className="input-field max-w-xs"
          />
        </div>
      )}

      {/* Search Button */}
      {showSearchButton && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSearch}
            className="btn-primary px-8 py-3 text-lg flex items-center space-x-2 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            disabled={!checkIn || !checkOut}
          >
            <Search className="w-5 h-5" />
            <span>Tìm kiếm & Đặt phòng</span>
          </button>
        </div>
      )}

      {/* Currency Info */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center space-x-2 bg-gray-50 rounded-full px-4 py-2">
          <Globe className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            Giá sẽ hiển thị bằng {selectedCurrencyData.name} ({selectedCurrencyData.symbol})
          </span>
        </div>
      </div>
    </div>
  );
}