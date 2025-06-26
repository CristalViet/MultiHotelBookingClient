'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { 
  Wifi, 
  Car, 
  Utensils, 
  Waves, 
  Dumbbell, 
  Coffee,
  Bath,
  Tv,
  Wind,
  Shield,
  Baby,
  Users,
  Briefcase,
  Heart,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Search
} from 'lucide-react';

interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: string;
  available: boolean;
  description?: string;
  isPremium?: boolean;
}

interface AmenitiesListProps {
  amenities: Amenity[];
  title?: string;
  showCategories?: boolean;
  searchable?: boolean;
  compactMode?: boolean;
}

const amenityIcons = {
  wifi: Wifi,
  parking: Car,
  restaurant: Utensils,
  pool: Waves,
  gym: Dumbbell,
  coffee: Coffee,
  bath: Bath,
  tv: Tv,
  aircon: Wind,
  security: Shield,
  childcare: Baby,
  concierge: Users,
  business: Briefcase,
  spa: Heart,
};

const categoryIcons = {
  internet: Wifi,
  parking: Car,
  dining: Utensils,
  recreation: Waves,
  wellness: Heart,
  business: Briefcase,
  family: Baby,
  convenience: Coffee,
  safety: Shield,
  room: Tv,
};

export default function AmenitiesList({ 
  amenities, 
  title, 
  showCategories = true,
  searchable = false,
  compactMode = false
}: AmenitiesListProps) {
  const t = useTranslations('hotelDetail');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Group amenities by category
  const groupedAmenities = amenities.reduce((acc, amenity) => {
    if (!acc[amenity.category]) {
      acc[amenity.category] = [];
    }
    acc[amenity.category].push(amenity);
    return acc;
  }, {} as Record<string, Amenity[]>);

  // Filter amenities based on search
  const filteredAmenities = searchQuery
    ? amenities.filter(amenity =>
        amenity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (amenity.description && amenity.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : amenities;

  const filteredGroupedAmenities = showCategories
    ? Object.entries(groupedAmenities).reduce((acc, [category, categoryAmenities]) => {
        const filtered = categoryAmenities.filter(amenity => 
          filteredAmenities.includes(amenity)
        );
        if (filtered.length > 0) {
          acc[category] = filtered;
        }
        return acc;
      }, {} as Record<string, Amenity[]>)
    : { all: filteredAmenities };

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const getAmenityIcon = (iconName: string) => {
    const Icon = amenityIcons[iconName as keyof typeof amenityIcons];
    return Icon || CheckCircle;
  };

  const getCategoryIcon = (category: string) => {
    const Icon = categoryIcons[category as keyof typeof categoryIcons];
    return Icon || CheckCircle;
  };

  const availableCount = amenities.filter(a => a.available).length;
  const totalCount = amenities.length;

  if (compactMode) {
    return (
      <div className="space-y-4">
        {title && (
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <span className="text-sm text-gray-500">
              {availableCount}/{totalCount} {t('available')}
            </span>
          </div>
        )}
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {amenities.filter(a => a.available).slice(0, 8).map((amenity) => {
            const Icon = getAmenityIcon(amenity.icon);
            return (
              <div
                key={amenity.id}
                className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
              >
                <Icon className="w-4 h-4 text-primary-600" />
                <span className="text-sm text-gray-700 truncate">{amenity.name}</span>
              </div>
            );
          })}
          
          {amenities.filter(a => a.available).length > 8 && (
            <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg text-gray-500">
              <span className="text-sm">+{amenities.filter(a => a.available).length - 8} {t('more')}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          <p className="text-sm text-gray-600">
            {availableCount} {t('amenitiesAvailable')} • {totalCount - availableCount} {t('notAvailable')}
          </p>
        </div>

        {/* Search */}
        {searchable && (
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t('searchAmenities')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 w-full"
            />
          </div>
        )}
      </div>

      {/* Amenities by Category */}
      {showCategories ? (
        <div className="space-y-4">
          {Object.entries(filteredGroupedAmenities).map(([category, categoryAmenities]) => {
            const isExpanded = expandedCategories.has(category);
            const CategoryIcon = getCategoryIcon(category);
            const availableInCategory = categoryAmenities.filter(a => a.available).length;
            
            return (
              <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <CategoryIcon className="w-5 h-5 text-primary-600" />
                    <div className="text-left">
                      <h4 className="font-medium text-gray-900">{t(`category.${category}`)}</h4>
                      <p className="text-sm text-gray-600">
                        {availableInCategory}/{categoryAmenities.length} {t('available')}
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {/* Category Content */}
                {isExpanded && (
                  <div className="p-4 bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {categoryAmenities.map((amenity) => {
                        const Icon = getAmenityIcon(amenity.icon);
                        
                        return (
                          <div
                            key={amenity.id}
                            className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                              amenity.available
                                ? 'border-green-200 bg-green-50'
                                : 'border-gray-200 bg-gray-50'
                            }`}
                          >
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                              amenity.available
                                ? 'bg-green-100 text-green-600'
                                : 'bg-gray-100 text-gray-400'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h5 className={`font-medium ${
                                  amenity.available ? 'text-gray-900' : 'text-gray-500'
                                }`}>
                                  {amenity.name}
                                </h5>
                                
                                {amenity.isPremium && (
                                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                    Premium
                                  </span>
                                )}
                                
                                {amenity.available ? (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                                )}
                              </div>
                              
                              {amenity.description && (
                                <p className={`text-sm mt-1 ${
                                  amenity.available ? 'text-gray-600' : 'text-gray-400'
                                }`}>
                                  {amenity.description}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Simple List View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAmenities.map((amenity) => {
            const Icon = getAmenityIcon(amenity.icon);
            
            return (
              <div
                key={amenity.id}
                className={`flex items-center gap-3 p-4 rounded-lg border transition-colors ${
                  amenity.available
                    ? 'border-green-200 bg-green-50 hover:bg-green-100'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${
                  amenity.available ? 'text-green-600' : 'text-gray-400'
                }`} />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${
                      amenity.available ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {amenity.name}
                    </span>
                    
                    {amenity.isPremium && (
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Premium
                      </span>
                    )}
                  </div>
                  
                  {amenity.description && (
                    <p className={`text-sm mt-1 ${
                      amenity.available ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {amenity.description}
                    </p>
                  )}
                </div>
                
                {amenity.available ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* No Results */}
      {filteredAmenities.length === 0 && searchQuery && (
        <div className="text-center py-8">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">{t('noAmenitiesFound')}</h4>
          <p className="text-gray-600">{t('tryDifferentSearch')}</p>
        </div>
      )}
    </div>
  );
} 