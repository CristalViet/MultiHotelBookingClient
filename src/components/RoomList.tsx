'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Filter, SortAsc, Calendar, Users, Grid, List } from 'lucide-react';
import RoomCard from './RoomCard';

interface Room {
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
  category: string;
}

interface RoomListProps {
  rooms: Room[];
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  adults?: number;
  children?: number;
  roomsCount?: number;
  hotelId?: string;
  onRoomBook?: (roomId: string) => void;
  onRoomDetails?: (roomId: string) => void;
}

type SortOption = 'price-low' | 'price-high' | 'size' | 'guests' | 'popular';
type ViewMode = 'grid' | 'list';

export default function RoomList({ 
  rooms, 
  checkIn, 
  checkOut, 
  guests, 
  adults = 2,
  children = 0,
  roomsCount = 1,
  hotelId,
  onRoomBook, 
  onRoomDetails 
}: RoomListProps) {
  const t = useTranslations('hotelDetail');
  const router = useRouter();
  const pathname = usePathname();

  // Get current locale from pathname
  const currentLocale = pathname.split('/')[1] || 'en';
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [filters, setFilters] = useState({
    maxPrice: 0,
    breakfast: false,
    freeCancellation: false,
    categories: [] as string[],
    minSize: 0,
  });
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort rooms
  const filteredAndSortedRooms = (() => {
    let filtered = rooms.filter(room => {
      // Price filter
      if (filters.maxPrice > 0 && room.price.current > filters.maxPrice) {
        return false;
      }
      
      // Breakfast filter
      if (filters.breakfast && !room.breakfast) {
        return false;
      }
      
      // Free cancellation filter
      if (filters.freeCancellation && !room.cancellation.free) {
        return false;
      }
      
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(room.category)) {
        return false;
      }
      
      // Size filter
      if (filters.minSize > 0 && room.size < filters.minSize) {
        return false;
      }
      
      // Guest capacity filter
      if (guests && room.maxGuests < guests) {
        return false;
      }
      
      return true;
    });

    // Sort rooms
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price.current - b.price.current;
        case 'price-high':
          return b.price.current - a.price.current;
        case 'size':
          return b.size - a.size;
        case 'guests':
          return b.maxGuests - a.maxGuests;
        case 'popular':
        default:
          // Sort by availability and features
          const aScore = (a.breakfast ? 1 : 0) + (a.cancellation.free ? 1 : 0) + (a.availability.available / a.availability.total);
          const bScore = (b.breakfast ? 1 : 0) + (b.cancellation.free ? 1 : 0) + (b.availability.available / b.availability.total);
          return bScore - aScore;
      }
    });

    return filtered;
  })();

  const availableRooms = filteredAndSortedRooms.filter(room => room.availability.available > 0);
  const unavailableRooms = filteredAndSortedRooms.filter(room => room.availability.available === 0);

  const resetFilters = () => {
    setFilters({
      maxPrice: 0,
      breakfast: false,
      freeCancellation: false,
      categories: [],
      minSize: 0,
    });
  };

  const toggleCategory = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const maxPrice = Math.max(...rooms.map(room => room.price.current));
  const categories = Array.from(new Set(rooms.map(room => room.category)));

  // Handle room booking navigation
  const handleRoomBooking = (roomId: string) => {
    if (onRoomBook) {
      onRoomBook(roomId);
    } else {
      // Default navigation to booking page
      const params = new URLSearchParams({
        roomId,
        ...(hotelId && { hotelId }),
        ...(checkIn && { checkIn }),
        ...(checkOut && { checkOut }),
        adults: adults.toString(),
        children: children.toString(),
        rooms: roomsCount.toString()
      });
      
      router.push(`/${currentLocale}/booking?${params.toString()}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t('availableRooms')}</h2>
          <p className="text-gray-600 mt-1">
            {checkIn && checkOut && (
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {checkIn} - {checkOut}
              </span>
            )}
            {guests && (
              <span className="flex items-center gap-1 mt-1">
                <Users className="w-4 h-4" />
                {guests} {t('guests')}
              </span>
            )}
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Filters Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
            showFilters
              ? 'bg-primary-600 text-white border-primary-600'
              : 'border-gray-300 hover:border-primary-600'
          }`}
        >
          <Filter className="w-4 h-4" />
          {t('filters')}
        </button>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <SortAsc className="w-4 h-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
          >
            <option value="popular">{t('sortPopular')}</option>
            <option value="price-low">{t('sortPriceLow')}</option>
            <option value="price-high">{t('sortPriceHigh')}</option>
            <option value="size">{t('sortBySize')}</option>
            <option value="guests">{t('sortByCapacity')}</option>
          </select>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600 flex items-center">
          {filteredAndSortedRooms.length} {t('roomsFound')}
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="card p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">{t('filters')}</h3>
            <button
              onClick={resetFilters}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              {t('reset')}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('maxPrice')}
              </label>
              <input
                type="range"
                min="0"
                max={maxPrice}
                step="10"
                value={filters.maxPrice || maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }))}
                className="w-full"
              />
              <div className="text-sm text-gray-600 mt-1">
                ${filters.maxPrice || maxPrice}
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('features')}
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.breakfast}
                    onChange={(e) => setFilters(prev => ({ ...prev, breakfast: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm">{t('breakfastIncluded')}</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.freeCancellation}
                    onChange={(e) => setFilters(prev => ({ ...prev, freeCancellation: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm">{t('freeCancellation')}</span>
                </label>
              </div>
            </div>

            {/* Room Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('roomTypes')}
              </label>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm">{t(`category.${category}`)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Minimum Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('minRoomSize')}
              </label>
              <input
                type="number"
                value={filters.minSize}
                onChange={(e) => setFilters(prev => ({ ...prev, minSize: parseInt(e.target.value) || 0 }))}
                placeholder="0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
              />
              <div className="text-sm text-gray-600 mt-1">m²</div>
            </div>
          </div>
        </div>
      )}

      {/* Room Results */}
      <div className="space-y-8">
        {/* Available Rooms */}
        {availableRooms.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('availableNow')} ({availableRooms.length})
            </h3>
            <div className={`space-y-4 ${viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : ''}`}>
              {availableRooms.map(room => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onBookNow={handleRoomBooking}
                  onViewDetails={onRoomDetails}
                />
              ))}
            </div>
          </div>
        )}

        {/* Unavailable Rooms */}
        {unavailableRooms.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('currentlyUnavailable')} ({unavailableRooms.length})
            </h3>
            <div className={`space-y-4 opacity-60 ${viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : ''}`}>
              {unavailableRooms.map(room => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onBookNow={handleRoomBooking}
                  onViewDetails={onRoomDetails}
                />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredAndSortedRooms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noRoomsFound')}</h3>
            <p className="text-gray-600 mb-4">{t('tryAdjustingFilters')}</p>
            <button
              onClick={resetFilters}
              className="btn-primary"
            >
              {t('resetFilters')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 