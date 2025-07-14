'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import BookingSummary from '@/components/BookingSummary';

export default function BookingSummaryPage() {
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

  const handleEdit = () => {
    // Navigate back to booking form
    const roomId = searchParams.get('roomId');
    const hotelId = searchParams.get('hotelId');
    router.push(`/${currentLocale}/booking?roomId=${roomId}&hotelId=${hotelId}`);
  };

  const handleConfirmBooking = async () => {
    if (!bookingData) return;

    try {
      // Simulate booking API call
      const bookingResponse = await simulateBookingAPI(bookingData);
      
      // Store confirmation data
      localStorage.setItem('confirmationData', JSON.stringify(bookingResponse));
      
      // Navigate to confirmation page
      router.push(`/${currentLocale}/booking/confirmation?bookingId=${bookingResponse.bookingId}`);
    } catch (error) {
      console.error('Booking failed:', error);
      // Handle error (show toast, modal, etc.)
    }
  };

  // Simulate booking API
  const simulateBookingAPI = async (data: any) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock booking ID
    const bookingId = 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const confirmationNumber = 'CN' + Math.random().toString(36).substr(2, 6).toUpperCase();
    
    return {
      bookingId,
      confirmationNumber,
      status: 'confirmed',
      bookingDate: new Date().toISOString(),
      ...data
    };
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Mock data for demo
  const mockRoom = {
    id: searchParams.get('roomId') || 'room-1',
    name: 'Deluxe King Room',
    price: 150,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400',
    size: 35,
    capacity: 2,
    amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Coffee Machine']
  };

  const mockHotel = {
    name: 'Tuần Châu Resort Hạ Long',
    location: 'Đảo Tuần Châu, Hạ Long, Quảng Ninh',
    rating: 4.9
  };

  // Calculate pricing
  const checkIn = new Date(bookingData.checkIn);
  const checkOut = new Date(bookingData.checkOut);
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  const subtotal = mockRoom.price * nights * bookingData.guests.rooms;
  const taxes = subtotal * 0.1;
  const serviceFee = subtotal * 0.05;
  const total = subtotal + taxes + serviceFee;

  const primaryGuest = bookingData.guests && bookingData.guests.length > 0 
    ? bookingData.guests[0] 
    : bookingData.guestInfo || {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890'
      };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <BookingSummary
        room={mockRoom}
        hotelName={mockHotel.name}
        hotelLocation={mockHotel.location}
        hotelRating={mockHotel.rating}
        checkIn={bookingData.checkIn}
        checkOut={bookingData.checkOut}
        guests={bookingData.guests}
        guestInfo={primaryGuest}
        pricing={{
          subtotal,
          taxes,
          serviceFee,
          total,
          nights
        }}
        status="pending"
        paymentMethod={bookingData.paymentMethod || 'Credit Card'}
        showEditButton={true}
        onEdit={handleEdit}
      />
      
      {/* Confirm booking button */}
      <div className="max-w-4xl mx-auto mt-8 px-6">
        <div className="text-center">
          <button
            onClick={handleConfirmBooking}
            className="btn-primary px-8 py-4 text-lg"
          >
            Confirm Booking & Pay
          </button>
          <p className="text-sm text-gray-500 mt-2">
            By confirming, you agree to our Terms & Conditions
          </p>
        </div>
      </div>
    </div>
  );
} 