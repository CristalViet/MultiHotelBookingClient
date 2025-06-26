'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { 
  DollarSign, 
  Star, 
  Wifi, 
  Car, 
  Utensils, 
  Waves,
  MapPin,
  Users,
  Heart,
  Crown,
  Briefcase,
  X
} from 'lucide-react';

interface FilterChipsProps {
  selectedFilters: FilterOption[];
  availableFilters: FilterOption[];
  onFilterChange: (filters: FilterOption[]) => void;
  maxVisible?: number;
}

interface FilterOption {
  id: string;
  type: 'price' | 'rating' | 'amenity' | 'category' | 'distance';
  label: string;
  value: string | number;
  icon?: string;
}

const filterIcons = {
  price: DollarSign,
  rating: Star,
  wifi: Wifi,
  parking: Car,
  restaurant: Utensils,
  beach: Waves,
  distance: MapPin,
  family: Users,
  romantic: Heart,
  luxury: Crown,
  business: Briefcase,
};

export default function FilterChips({ 
  selectedFilters, 
  availableFilters, 
  onFilterChange,
  maxVisible = 8 
}: FilterChipsProps) {
  const t = useTranslations('search');
  const [showAll, setShowAll] = useState(false);

  const handleFilterToggle = (filter: FilterOption) => {
    const isSelected = selectedFilters.some(f => f.id === filter.id);
    
    if (isSelected) {
      // Remove filter
      onFilterChange(selectedFilters.filter(f => f.id !== filter.id));
    } else {
      // Add filter
      onFilterChange([...selectedFilters, filter]);
    }
  };

  const handleRemoveFilter = (filterId: string) => {
    onFilterChange(selectedFilters.filter(f => f.id !== filterId));
  };

  const clearAllFilters = () => {
    onFilterChange([]);
  };

  const visibleFilters = showAll ? availableFilters : availableFilters.slice(0, maxVisible);
  const hasMoreFilters = availableFilters.length > maxVisible;

  return (
    <div className="space-y-4">
      {/* Selected Filters */}
      {selectedFilters.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">{t('activeFilters')}</h3>
            <button
              onClick={clearAllFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              {t('clearAll')}
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filter) => {
              const Icon = filterIcons[filter.icon as keyof typeof filterIcons] || Star;
              
              return (
                <div
                  key={filter.id}
                  className="flex items-center space-x-1 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  <Icon className="w-3 h-3" />
                  <span>{filter.label}</span>
                  <button
                    onClick={() => handleRemoveFilter(filter.id)}
                    className="ml-1 hover:bg-primary-700 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Available Filters */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">{t('filters')}</h3>
        
        <div className="flex flex-wrap gap-2">
          {visibleFilters.map((filter) => {
            const isSelected = selectedFilters.some(f => f.id === filter.id);
            const Icon = filterIcons[filter.icon as keyof typeof filterIcons] || Star;
            
            return (
              <button
                key={filter.id}
                onClick={() => handleFilterToggle(filter)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                  isSelected
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{filter.label}</span>
              </button>
            );
          })}

          {/* Show More/Less Button */}
          {hasMoreFilters && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium text-primary-600 border border-primary-200 hover:bg-primary-50 transition-colors"
            >
              <span>{showAll ? t('showLess') : t('showMore')}</span>
              <span className="text-xs">
                {showAll ? '−' : `+${availableFilters.length - maxVisible}`}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Filters for Popular Options */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">{t('quickFilters')}</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Price Range Quick Filters */}
          <button
            onClick={() => handleFilterToggle({
              id: 'budget',
              type: 'price',
              label: t('under100'),
              value: 100,
              icon: 'price'
            })}
            className={`flex items-center justify-center space-x-1 p-2 rounded-lg text-sm font-medium transition-colors ${
              selectedFilters.some(f => f.id === 'budget')
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>{t('under100')}</span>
          </button>

          {/* Rating Quick Filter */}
          <button
            onClick={() => handleFilterToggle({
              id: 'highRated',
              type: 'rating',
              label: t('4starPlus'),
              value: 4,
              icon: 'rating'
            })}
            className={`flex items-center justify-center space-x-1 p-2 rounded-lg text-sm font-medium transition-colors ${
              selectedFilters.some(f => f.id === 'highRated')
                ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>{t('4starPlus')}</span>
          </button>

          {/* Free WiFi Quick Filter */}
          <button
            onClick={() => handleFilterToggle({
              id: 'freeWifi',
              type: 'amenity',
              label: t('freeWifi'),
              value: 'wifi',
              icon: 'wifi'
            })}
            className={`flex items-center justify-center space-x-1 p-2 rounded-lg text-sm font-medium transition-colors ${
              selectedFilters.some(f => f.id === 'freeWifi')
                ? 'bg-blue-100 text-blue-700 border border-blue-300'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Wifi className="w-4 h-4" />
            <span>{t('freeWifi')}</span>
          </button>

          {/* Near Center Quick Filter */}
          <button
            onClick={() => handleFilterToggle({
              id: 'nearCenter',
              type: 'distance',
              label: t('nearCenter'),
              value: 2,
              icon: 'distance'
            })}
            className={`flex items-center justify-center space-x-1 p-2 rounded-lg text-sm font-medium transition-colors ${
              selectedFilters.some(f => f.id === 'nearCenter')
                ? 'bg-purple-100 text-purple-700 border border-purple-300'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>{t('nearCenter')}</span>
          </button>
        </div>
      </div>

      {/* Filter Summary */}
      {selectedFilters.length > 0 && (
        <div className="pt-3 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {selectedFilters.length} {t('filtersApplied')}
          </p>
        </div>
      )}
    </div>
  );
} 