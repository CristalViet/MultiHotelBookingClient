'use client';

import { useTranslations } from 'next-intl';
import { Map, List, MapPin } from 'lucide-react';

interface MapToggleButtonProps {
  viewMode: 'list' | 'map';
  onToggle: (mode: 'list' | 'map') => void;
  resultCount?: number;
}

export default function MapToggleButton({ viewMode, onToggle, resultCount }: MapToggleButtonProps) {
  const t = useTranslations('search');

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Results Count */}
      {resultCount !== undefined && (
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="font-medium">
            {resultCount.toLocaleString()} {t('resultsFound')}
          </span>
        </div>
      )}

      {/* Toggle Buttons */}
      <div className="flex items-center bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <button
          onClick={() => onToggle('list')}
          className={`flex items-center space-x-2 px-4 py-2 font-medium transition-all duration-200 ${
            viewMode === 'list'
              ? 'bg-primary-600 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <List className="w-4 h-4" />
          <span>{t('listView')}</span>
        </button>
        
        <button
          onClick={() => onToggle('map')}
          className={`flex items-center space-x-2 px-4 py-2 font-medium transition-all duration-200 ${
            viewMode === 'map'
              ? 'bg-primary-600 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Map className="w-4 h-4" />
          <span>{t('mapView')}</span>
        </button>
      </div>
    </div>
  );
} 