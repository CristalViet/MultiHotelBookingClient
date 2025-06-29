'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { MapPin, Calendar, Users, Search, Globe } from 'lucide-react';

export default function SearchBar() {
  const t = useTranslations('home.search');
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

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
    // Implement search logic here
    console.log('Searching...', { 
      destination, 
      checkIn, 
      checkOut, 
      guests, 
      currency: selectedCurrency 
    });
  };

  const updateGuests = (type: 'adults' | 'children' | 'rooms', increment: boolean) => {
    setGuests(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + (increment ? 1 : -1))
    }));
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
              {`${guests.adults + guests.children} ${t('guests')}, ${guests.rooms} ${t('rooms')}`}
            </button>

            {showGuestDropdown && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-100 p-4 z-10">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{t('adults')}</span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateGuests('adults', false)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{guests.adults}</span>
                      <button
                        onClick={() => updateGuests('adults', true)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{t('children')}</span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateGuests('children', false)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{guests.children}</span>
                      <button
                        onClick={() => updateGuests('children', true)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{t('rooms')}</span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateGuests('rooms', false)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{guests.rooms}</span>
                      <button
                        onClick={() => updateGuests('rooms', true)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
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
            Currency
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
                    Currency preference will be saved
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSearch}
          className="btn-primary px-8 py-3 text-lg flex items-center space-x-2 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <Search className="w-5 h-5" />
          <span>{t('searchButton')}</span>
        </button>
      </div>

      {/* Currency Info */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center space-x-2 bg-gray-50 rounded-full px-4 py-2">
          <Globe className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            Prices will be shown in {selectedCurrencyData.name} ({selectedCurrencyData.symbol})
          </span>
        </div>
      </div>
    </div>
  );
}