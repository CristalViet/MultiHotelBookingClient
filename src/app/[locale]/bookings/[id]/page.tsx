'use client';

import { useTranslations } from 'next-intl';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import BookingSummary from '@/components/BookingSummary';

export default function BookingDetailPage() {
  const t = useTranslations();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const bookingId = params.id as string;
  // Get current locale from pathname
  const currentLocale = pathname.split('/')[1] || 'en';

  useEffect(() => {
    // Simulate API call to fetch booking details
    const fetchBookingDetails = async () => {
      setLoading(true);
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock booking data - in real app, fetch from API based on bookingId
      const mockBooking = {
        id: bookingId,
        confirmationNumber: 'CN567ABC',
        room: {
          id: 'room-1',
          name: 'Deluxe King Room',
          price: 150,
          image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400',
          size: 35,
          capacity: 2,
          amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Coffee Machine', 'Mini Bar', 'Safe']
        },
        hotelName: 'Tuần Châu Resort Hạ Long',
        hotelLocation: 'Đảo Tuần Châu, Hạ Long, Quảng Ninh',
        hotelRating: 4.8,
        hotelPhone: '1900 93 88',
        hotelEmail: 'info@tuanchauresort.com.vn',
        checkIn: '2024-02-15',
        checkOut: '2024-02-17',
        guests: { adults: 2, children: 0, rooms: 1 },
        guestInfo: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '+1234567890'
        },
        pricing: {
          subtotal: 300,
          taxes: 30,
          serviceFee: 15,
          total: 345,
          nights: 2
        },
        status: 'confirmed' as const,
        paymentMethod: 'Credit Card',
        bookingDate: '2024-01-10T10:30:00Z',
        specialRequests: 'Late check-in requested. Non-smoking room preferred.'
      };
      
      setBooking(mockBooking);
      setLoading(false);
    };

    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId]);

  const handleEdit = () => {
    // Navigate to edit booking page (if applicable)
    router.push(`/${currentLocale}/booking?roomId=${booking.room.id}&hotelId=hotel-1&edit=${bookingId}`);
  };

  const handleBackToBookings = () => {
    router.push(`/${currentLocale}/bookings`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h1>
          <p className="text-gray-600 mb-6">The booking you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={handleBackToBookings}
            className="btn-primary px-6 py-3"
          >
            Back to My Bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <button
                  onClick={() => router.push(`/${currentLocale}`)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Home
                </button>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <button
                  onClick={handleBackToBookings}
                  className="text-gray-500 hover:text-gray-700"
                >
                  My Bookings
                </button>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-900 font-medium">
                  Booking {bookingId}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8">
        <BookingSummary
          bookingId={booking.id}
          room={booking.room}
          hotelName={booking.hotelName}
          hotelLocation={booking.hotelLocation}
          hotelRating={booking.hotelRating}
          checkIn={booking.checkIn}
          checkOut={booking.checkOut}
          guests={booking.guests}
          guestInfo={booking.guestInfo}
          pricing={booking.pricing}
          status={booking.status}
          paymentMethod={booking.paymentMethod}
          showEditButton={booking.status === 'confirmed' || booking.status === 'pending'}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
} 