'use client';

import { useTranslations } from 'next-intl';
import { Clock, Calendar } from 'lucide-react';

export default function Promotions() {
  const t = useTranslations('home.promotions');

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h2>
        <p className="text-lg text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Offer 1 */}
        <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-8 h-8" />
              <h3 className="text-2xl font-bold">{t('offer1.title')}</h3>
            </div>
            <p className="text-lg mb-6 text-white/90">
              {t('offer1.description')}
            </p>
            <button className="bg-white text-accent-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              {t('offer1.cta')}
            </button>
          </div>
        </div>

        {/* Offer 2 */}
        <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-4">
              <Calendar className="w-8 h-8" />
              <h3 className="text-2xl font-bold">{t('offer2.title')}</h3>
            </div>
            <p className="text-lg mb-6 text-white/90">
              {t('offer2.description')}
            </p>
            <button className="bg-white text-secondary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              {t('offer2.cta')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}