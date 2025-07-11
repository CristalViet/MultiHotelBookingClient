import { useTranslations } from 'next-intl';
import SearchBar from '@/components/SearchBar';
import QuickFilterChips from '@/components/QuickFilterChips';
import PopularDestinations from '@/components/PopularDestinations';
import Promotions from '@/components/Promotions';
import CTAButton from '@/components/CTAButton';
import TrustBadges from '@/components/TrustBadges';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-slide-up">
            {t('hero.subtitle')}
          </p>
          <CTAButton text={t('hero.cta')} />
        </div>
      </section>

      {/* Search Section */}
      <section className="relative -mt-12 z-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <SearchBar />
        </div>
      </section>

      {/* Quick Filters */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuickFilterChips />
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustBadges
            layout="horizontal"
            showDescription={false}
            showVerifiedBadge={true}
            size="small"
            categories={['security', 'rating', 'guarantee']}
            className="mb-8"
          />
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PopularDestinations />
        </div>
      </section>

      {/* Promotions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Promotions />
        </div>
      </section>

      {/* Comprehensive Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your security and satisfaction are our top priorities. Book with confidence knowing you're protected.
            </p>
          </div>
          
          <TrustBadges
            layout="grid"
            showDescription={true}
            showVerifiedBadge={true}
            size="medium"
          />
        </div>
      </section>
    </div>
  );
}