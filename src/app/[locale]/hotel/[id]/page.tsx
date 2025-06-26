'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import HotelDetailHeader from '@/components/HotelDetailHeader';
import ImageCarousel from '@/components/ImageCarousel';
import RoomList from '@/components/RoomList';
import AmenitiesList from '@/components/AmenitiesList';
import LocalExperienceBlock from '@/components/LocalExperienceBlock';
import LanguageCurrencySelector from '@/components/LanguageCurrencySelector';

export default function HotelDetailPage() {
  const t = useTranslations('demo');
  const router = useRouter();
  const pathname = usePathname();
  
  // Get current locale from pathname
  const currentLocale = pathname.split('/')[1] || 'en';
  const [currentCurrency, setCurrentCurrency] = useState('USD');

  // Mock data for demo
  const mockHotel = {
    id: 'hotel-1',
    name: t('hotelName'),
    rating: 4.6,
    reviewCount: 2847,
    location: t('hotelLocation'),
    address: t('hotelAddress'),
    category: 'luxury' as const,
    verified: true,
    awards: [t('awards.tripAdvisor'), t('awards.bestHeritage')],
    priceRange: {
      min: 120,
      max: 350,
      currency: '$'
    }
  };

  const mockImages = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      alt: 'Hotel exterior',
      caption: t('images.hotelExterior'),
      type: 'photo' as const
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
      alt: 'Hotel lobby',
      caption: t('images.hotelLobby'),
      type: 'photo' as const
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      alt: 'Hotel room',
      caption: t('images.hotelRoom'),
      type: 'photo' as const
    }
  ];

  const mockRooms = [
    {
      id: 'room-1',
      name: t('rooms.deluxeKing'),
      images: [
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'
      ],
      description: t('rooms.deluxeKingDesc'),
      maxGuests: 2,
      bedInfo: t('rooms.kingBed'),
      size: 35,
      amenities: ['wifi', 'tv', 'aircon', 'coffee'],
      inclusions: [t('rooms.inclusions.freeWifi'), t('rooms.inclusions.dailyBreakfast'), t('rooms.inclusions.airportShuttle')],
      restrictions: [t('rooms.restrictions.noSmoking'), t('rooms.restrictions.noPets')],
      price: {
        original: 180,
        current: 150,
        currency: '$',
        taxesIncluded: true
      },
      availability: {
        available: 3,
        total: 5
      },
      cancellation: {
        free: true,
        deadline: t('rooms.cancellationDeadline')
      },
      breakfast: true,
      refundable: true,
      category: 'deluxe'
    }
  ];

  const mockAmenities = [
    {
      id: 'wifi',
      name: t('amenities.freeWifi'),
      icon: 'wifi',
      category: 'internet',
      available: true,
      description: t('amenities.freeWifiDesc')
    },
    {
      id: 'pool',
      name: t('amenities.outdoorPool'),
      icon: 'pool',
      category: 'recreation',
      available: true,
      description: t('amenities.outdoorPoolDesc')
    },
    {
      id: 'gym',
      name: t('amenities.fitnessCenter'),
      icon: 'gym',
      category: 'wellness',
      available: true,
      description: t('amenities.fitnessCenterDesc')
    }
  ];

  const mockExperiences = [
    {
      id: 'exp-1',
      name: t('experiences.hoanKiemLake'),
      description: t('experiences.hoanKiemDesc'),
      category: 'nature' as const,
      image: 'https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?w=400',
      rating: 4.5,
      reviewCount: 1250,
      distance: 0.2,
      walkingTime: 3,
      highlights: [t('experiences.scenicViews'), t('experiences.historicSignificance')],
      recommended: true
    }
  ];

  const mockLanguages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
    { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' }
  ];

  const mockCurrencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1 },
    { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', rate: 24000 },
    { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.85 },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rate: 7.3 },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 148 },
    { code: 'KRW', name: 'Korean Won', symbol: '₩', rate: 1320 },
    { code: 'THB', name: 'Thai Baht', symbol: '฿', rate: 35.5 },
    { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.79 },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.52 },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 1.36 }
  ];

  // Handle language change
  const handleLanguageChange = (languageCode: string) => {
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
    router.push(`/${languageCode}${pathWithoutLocale}`);
  };

  // Handle currency change
  const handleCurrencyChange = (currencyCode: string) => {
    setCurrentCurrency(currencyCode);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hotel Header */}
      <HotelDetailHeader
        hotel={mockHotel}
        onShareClick={() => console.log('Share')}
        onFavoriteClick={() => console.log('Favorite')}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Carousel */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('sections.hotelGallery')}</h2>
              <ImageCarousel
                images={mockImages}
                hotelName={mockHotel.name}
              />
            </section>

            {/* Room List */}
            <section>
              <RoomList
                rooms={mockRooms}
                checkIn="2024-01-15"
                checkOut="2024-01-17"
                guests={2}
              />
            </section>

            {/* Amenities */}
            <section>
              <AmenitiesList
                amenities={mockAmenities}
                title={t('sections.hotelAmenities')}
                showCategories={true}
                searchable={true}
              />
            </section>

            {/* Local Experiences */}
            <section>
              <LocalExperienceBlock
                experiences={mockExperiences}
                title={t('sections.whatsAround')}
              />
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Booking Widget */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('sections.bookYourStay')}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('sections.checkIn')}</label>
                  <input
                    type="date"
                    defaultValue="2024-01-15"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('sections.checkOut')}</label>
                  <input
                    type="date"
                    defaultValue="2024-01-17"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
                  />
                </div>
                <button className="w-full btn-primary">
                  {t('sections.checkAvailability')}
                </button>
              </div>
            </div>

            {/* Settings */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('sections.preferences')}</h3>
              <LanguageCurrencySelector
                currentLanguage={currentLocale}
                currentCurrency={currentCurrency}
                languages={mockLanguages}
                currencies={mockCurrencies}
                onLanguageChange={handleLanguageChange}
                onCurrencyChange={handleCurrencyChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 