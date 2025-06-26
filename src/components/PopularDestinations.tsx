'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const destinations = [
  {
    id: 'tokyo',
    image: 'https://images.pexels.com/photos/1510595/pexels-photo-1510595.jpeg',
    hotels: 1250,
    priceFrom: 85,
  },
  {
    id: 'paris',
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg',
    hotels: 980,
    priceFrom: 120,
  },
  {
    id: 'newyork',
    image: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg',
    hotels: 1150,
    priceFrom: 150,
  },
  {
    id: 'london',
    image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
    hotels: 890,
    priceFrom: 110,
  },
  {
    id: 'hanoi',
    image: 'https://images.pexels.com/photos/12966989/pexels-photo-12966989.jpeg',
    hotels: 450,
    priceFrom: 35,
  },
  {
    id: 'hochiminh',
    image: 'https://images.pexels.com/photos/15032806/pexels-photo-15032806.jpeg',
    hotels: 380,
    priceFrom: 30,
  },
];

export default function PopularDestinations() {
  const t = useTranslations();
  const homeT = useTranslations('home.destinations');
  const destT = useTranslations('destinations');

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{homeT('title')}</h2>
        <p className="text-lg text-gray-600 mb-6">{homeT('subtitle')}</p>
        <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center justify-center space-x-2 mx-auto transition-colors duration-200">
          <span>{homeT('viewAll')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="card group cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={destination.image}
                alt={destT(destination.id as any)}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{destT(destination.id as any)}</h3>
                <p className="text-sm text-white/90">
                  {destination.hotels} {destT('hotels')}
                </p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {destT('from')} ${destination.priceFrom}/night
                </span>
                <ArrowRight className="w-4 h-4 text-primary-600 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}