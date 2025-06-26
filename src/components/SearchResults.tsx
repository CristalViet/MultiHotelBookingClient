'use client';

import { useTranslations } from 'next-intl';
import { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, ChevronDown } from 'lucide-react';
import HotelCard from './HotelCard';
import MapToggleButton from './MapToggleButton';
import HotelMap from './HotelMap';

interface Hotel {
  id: string;
  name: string;
  images: string[];
  rating: number;
  reviewCount: number;
  location: string;
  distance: string;
  latitude: number;
  longitude: number;
  price: number;
  originalPrice?: number;
  currency: string;
  amenities: string[];
  description: string;
  featured?: boolean;
  category: string;
}

interface SearchResultsProps {
  hotels: Hotel[];
  loading?: boolean;
  onHotelSelect?: (hotelId: string) => void;
}

interface Filters {
  priceRange: [number, number];
  rating: number;
  amenities: string[];
  categories: string[];
}

type SortOption = 'recommended' | 'price-low' | 'price-high' | 'rating' | 'distance';

export default function SearchResults({ hotels, loading = false, onHotelSelect }: SearchResultsProps) {
  const t = useTranslations('search');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [selectedHotelId, setSelectedHotelId] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 10000],
    rating: 0,
    amenities: [],
    categories: []
  });

  const itemsPerPage = 10;

  // Available filter options
  const availableAmenities = ['wifi', 'parking', 'restaurant', 'pool', 'gym', 'spa'];
  const availableCategories = ['budget', 'luxury', 'business', 'family', 'romantic'];

  // Filter and sort hotels
  const filteredAndSortedHotels = useMemo(() => {
    let filtered = hotels.filter(hotel => {
      // Price filter
      if (hotel.price < filters.priceRange[0] || hotel.price > filters.priceRange[1]) {
        return false;
      }
      
      // Rating filter
      if (hotel.rating < filters.rating) {
        return false;
      }
      
      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity => 
          hotel.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }
      
      // Categories filter
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(hotel.category)) {
          return false;
        }
      }
      
      return true;
    });

    // Sort hotels
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        case 'recommended':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating;
      }
    });

    return filtered;
  }, [hotels, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedHotels.length / itemsPerPage);
  const paginatedHotels = filteredAndSortedHotels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleHotelSelect = (hotelId: string) => {
    setSelectedHotelId(hotelId);
    onHotelSelect?.(hotelId);
  };

  const toggleAmenityFilter = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const toggleCategoryFilter = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card p-4 animate-pulse">
            <div className="flex space-x-4">
              <div className="bg-gray-300 rounded-lg w-48 h-32"></div>
              <div className="flex-1 space-y-2">
                <div className="bg-gray-300 h-6 rounded w-3/4"></div>
                <div className="bg-gray-300 h-4 rounded w-1/2"></div>
                <div className="bg-gray-300 h-4 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Results Count and View Toggle */}
      <MapToggleButton
        viewMode={viewMode}
        onToggle={setViewMode}
        resultCount={filteredAndSortedHotels.length}
      />

      {/* Filters and Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Filters Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
            showFilters
              ? 'bg-primary-600 text-white border-primary-600'
              : 'bg-white text-gray-700 border-gray-300 hover:border-primary-300'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>{t('filters')}</span>
        </button>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:border-primary-500"
          >
            <option value="recommended">{t('sortRecommended')}</option>
            <option value="price-low">{t('sortPriceLow')}</option>
            <option value="price-high">{t('sortPriceHigh')}</option>
            <option value="rating">{t('sortRating')}</option>
            <option value="distance">{t('sortDistance')}</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="card p-6 space-y-6">
          {/* Price Range */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">{t('priceRange')}</h3>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                }))}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 min-w-0">
                ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </span>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">{t('minimumRating')}</h3>
            <div className="flex space-x-2">
              {[0, 3, 4, 4.5].map(rating => (
                <button
                  key={rating}
                  onClick={() => setFilters(prev => ({ ...prev, rating }))}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filters.rating === rating
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {rating === 0 ? t('any') : `${rating}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities Filter */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">{t('amenities')}</h3>
            <div className="flex flex-wrap gap-2">
              {availableAmenities.map(amenity => (
                <button
                  key={amenity}
                  onClick={() => toggleAmenityFilter(amenity)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filters.amenities.includes(amenity)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t(amenity)}
                </button>
              ))}
            </div>
          </div>

          {/* Categories Filter */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">{t('categories')}</h3>
            <div className="flex flex-wrap gap-2">
              {availableCategories.map(category => (
                <button
                  key={category}
                  onClick={() => toggleCategoryFilter(category)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filters.categories.includes(category)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t(category)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {viewMode === 'list' ? (
        <div className="space-y-4">
          {paginatedHotels.length > 0 ? (
            <>
              {paginatedHotels.map(hotel => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onSelect={handleHotelSelect}
                />
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 mt-8">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t('previous')}
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 rounded-lg border transition-colors ${
                            currentPage === page
                              ? 'bg-primary-600 text-white border-primary-600'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="px-2">...</span>;
                    }
                    return null;
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t('next')}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="card p-8 text-center">
              <div className="text-gray-400 mb-4">
                <Filter className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noResults')}</h3>
              <p className="text-gray-600">{t('noResultsDescription')}</p>
            </div>
          )}
        </div>
      ) : (
        <HotelMap
          hotels={filteredAndSortedHotels}
          onHotelSelect={handleHotelSelect}
          selectedHotelId={selectedHotelId}
        />
      )}
    </div>
  );
} 