'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';

// Mock hotel data for demo
const mockHotels = [
  {
    id: '1',
    name: 'Luxury Grand Hotel',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'
    ],
    rating: 4.8,
    reviewCount: 1247,
    location: 'Hanoi Old Quarter, Vietnam',
    distance: '0.5 km from city center',
    latitude: 21.0285,
    longitude: 105.8542,
    price: 120,
    originalPrice: 150,
    currency: '$',
    amenities: ['wifi', 'parking', 'restaurant', 'pool', 'gym'],
    description: 'A luxurious hotel in the heart of Hanoi with stunning views and world-class amenities.',
    featured: true,
    category: 'luxury'
  },
  {
    id: '2',
    name: 'Budget Backpacker Inn',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'
    ],
    rating: 4.2,
    reviewCount: 892,
    location: 'Ba Dinh District, Hanoi',
    distance: '1.2 km from city center',
    latitude: 21.0245,
    longitude: 105.8412,
    price: 25,
    currency: '$',
    amenities: ['wifi', 'restaurant'],
    description: 'Clean and comfortable budget accommodation perfect for backpackers and budget travelers.',
    featured: false,
    category: 'budget'
  },
  {
    id: '3',
    name: 'Family Resort & Spa',
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'
    ],
    rating: 4.6,
    reviewCount: 654,
    location: 'Tay Ho District, Hanoi',
    distance: '3.5 km from city center',
    latitude: 21.0583,
    longitude: 105.8267,
    price: 85,
    originalPrice: 110,
    currency: '$',
    amenities: ['wifi', 'parking', 'pool', 'spa', 'restaurant'],
    description: 'Perfect family destination with kids club, multiple pools and spa facilities.',
    featured: false,
    category: 'family'
  },
  {
    id: '4',
    name: 'Business Executive Hotel',
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800'
    ],
    rating: 4.4,
    reviewCount: 432,
    location: 'Dong Da District, Hanoi',
    distance: '2.1 km from city center',
    latitude: 21.0122,
    longitude: 105.8376,
    price: 95,
    currency: '$',
    amenities: ['wifi', 'parking', 'gym', 'restaurant'],
    description: 'Modern business hotel with excellent conference facilities and high-speed internet.',
    featured: false,
    category: 'business'
  },
  {
    id: '5',
    name: 'Romantic Boutique Hotel',
    images: [
      'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'
    ],
    rating: 4.7,
    reviewCount: 328,
    location: 'French Quarter, Hanoi',
    distance: '0.8 km from city center',
    latitude: 21.0267,
    longitude: 105.8419,
    price: 140,
    originalPrice: 180,
    currency: '$',
    amenities: ['wifi', 'restaurant', 'spa'],
    description: 'Intimate boutique hotel perfect for couples with romantic ambiance and personalized service.',
    featured: true,
    category: 'romantic'
  }
];

export default function SearchPage() {
  const t = useTranslations('search');
  const [selectedHotelId, setSelectedHotelId] = useState<string | undefined>();

  const handleHotelSelect = (hotelId: string) => {
    setSelectedHotelId(hotelId);
    console.log('Selected hotel:', hotelId);
    // Here you would typically navigate to hotel details or open a modal
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Search Hotels in Hanoi
            </h1>
            <p className="text-xl text-white/90">
              {mockHotels.length} hotels found
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-5xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchResults
            hotels={mockHotels}
            loading={false}
            onHotelSelect={handleHotelSelect}
          />
        </div>
      </section>
    </div>
  );
} 