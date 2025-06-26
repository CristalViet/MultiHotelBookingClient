'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { DollarSign, Crown, Users, Briefcase, Heart, Waves } from 'lucide-react';

const filterIcons = {
  budget: DollarSign,
  luxury: Crown,
  family: Users,
  business: Briefcase,
  romantic: Heart,
  beach: Waves,
};

export default function QuickFilterChips() {
  const t = useTranslations('home.quickFilters');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filters = [
    'budget',
    'luxury', 
    'family',
    'business',
    'romantic',
    'beach',
  ];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('title')}</h2>
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {filters.map((filter) => {
          const Icon = filterIcons[filter as keyof typeof filterIcons];
          const isSelected = selectedFilters.includes(filter);
          
          return (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
                isSelected
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-primary-300 hover:bg-primary-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t(filter as any)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}