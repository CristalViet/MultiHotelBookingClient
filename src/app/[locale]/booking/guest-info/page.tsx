'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import GuestInfoForm from '@/components/GuestInfoForm';

export default function GuestInfoPage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [bookingData, setBookingData] = useState<any>(null);

  // Get current locale from pathname
  const currentLocale = pathname.split('/')[1] || 'en';

  useEffect(() => {
    // Get booking data from localStorage
    const storedData = localStorage.getItem('bookingData');
    if (storedData) {
      setBookingData(JSON.parse(storedData));
          } else {
        // If no booking data, redirect back to booking
        router.push(`/${currentLocale}`);
      }
  }, [router]);

  const handleGuestsUpdate = (guests: any[]) => {
    // Update booking data with guest information
    if (bookingData) {
      const updatedData = { ...bookingData, guests };
      setBookingData(updatedData);
      localStorage.setItem('bookingData', JSON.stringify(updatedData));
    }
  };

  const handleNext = () => {
    // Navigate to summary page
    const roomId = searchParams.get('roomId');
    const hotelId = searchParams.get('hotelId');
    router.push(`/${currentLocale}/booking/summary?roomId=${roomId}&hotelId=${hotelId}`);
  };

  const handleBack = () => {
    // Navigate back to booking form
    const roomId = searchParams.get('roomId');
    const hotelId = searchParams.get('hotelId');
    router.push(`/${currentLocale}/booking?roomId=${roomId}&hotelId=${hotelId}`);
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const totalGuests = bookingData.guests.adults + bookingData.guests.children;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <GuestInfoForm
        totalGuests={totalGuests}
        onGuestsUpdate={handleGuestsUpdate}
        showPassportFields={true}
        requiredFields={{
          dateOfBirth: false,
          nationality: true,
          passport: false
        }}
      />
      
      {/* Navigation buttons */}
      <div className="max-w-4xl mx-auto mt-8 px-6">
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Booking
          </button>
          
          <button
            onClick={handleNext}
            className="btn-primary px-6 py-3"
          >
            Continue to Summary
          </button>
        </div>
      </div>
    </div>
  );
} 