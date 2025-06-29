'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import BookingSummary from '@/components/BookingSummary';
import { Calendar, MapPin, Star } from 'lucide-react';

export default function BookingsPage() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'confirmed' | 'pending' | 'cancelled'>('all');

  // Get current locale from pathname
  const currentLocale = pathname.split('/')[1] || 'en';

  // Mock booking data - in real app, fetch from API
  const mockBookings = [
    {
      id: 'BK123456789',
      confirmationNumber: 'CN567ABC',
      room: {
        id: 'room-1',
        name: 'Deluxe King Room',
        price: 150,
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400',
        size: 35,
        capacity: 2,
        amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Coffee Machine']
      },
      hotelName: 'Luxury Grand Hotel',
      hotelLocation: 'Hanoi Old Quarter, Vietnam',
      hotelRating: 4.8,
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
      bookingDate: '2024-01-10'
    },
    {
      id: 'BK987654321',
      confirmationNumber: 'CN890DEF',
      room: {
        id: 'room-2',
        name: 'Superior Suite',
        price: 220,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        size: 55,
        capacity: 4,
        amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Balcony']
      },
      hotelName: 'Business Executive Hotel',
      hotelLocation: 'Dong Da District, Hanoi',
      hotelRating: 4.4,
      checkIn: '2024-03-20',
      checkOut: '2024-03-23',
      guests: { adults: 2, children: 1, rooms: 1 },
      guestInfo: {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+1234567891'
      },
      pricing: {
        subtotal: 660,
        taxes: 66,
        serviceFee: 33,
        total: 759,
        nights: 3
      },
      status: 'pending' as const,
      paymentMethod: 'PayPal',
      bookingDate: '2024-02-01'
    },
    {
      id: 'BK456789123',
      confirmationNumber: 'CN234GHI',
      room: {
        id: 'room-3',
        name: 'Budget Double Room',
        price: 80,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
        size: 25,
        capacity: 2,
        amenities: ['Free WiFi', 'Air Conditioning', 'TV']
      },
      hotelName: 'Budget Backpacker Inn',
      hotelLocation: 'Ba Dinh District, Hanoi',
      hotelRating: 4.2,
      checkIn: '2024-01-05',
      checkOut: '2024-01-07',
      guests: { adults: 1, children: 0, rooms: 1 },
      guestInfo: {
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mike.johnson@example.com',
        phone: '+1234567892'
      },
      pricing: {
        subtotal: 160,
        taxes: 16,
        serviceFee: 8,
        total: 184,
        nights: 2
      },
      status: 'cancelled' as const,
      paymentMethod: 'Credit Card',
      bookingDate: '2023-12-20'
    }
  ];

  // Filter bookings by status
  const filteredBookings = selectedStatus === 'all' 
    ? mockBookings 
    : mockBookings.filter(booking => booking.status === selectedStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleBookingClick = (bookingId: string) => {
    router.push(`/${currentLocale}/bookings/${bookingId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">My Bookings</h1>
            <p className="text-gray-600">Manage and view your hotel reservations</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filter Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All Bookings', count: mockBookings.length },
                { key: 'confirmed', label: 'Confirmed', count: mockBookings.filter(b => b.status === 'confirmed').length },
                { key: 'pending', label: 'Pending', count: mockBookings.filter(b => b.status === 'pending').length },
                { key: 'cancelled', label: 'Cancelled', count: mockBookings.filter(b => b.status === 'cancelled').length }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedStatus(tab.key as any)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    selectedStatus === tab.key
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>

          {/* Bookings List */}
          {filteredBookings.length > 0 ? (
            <div className="space-y-6">
              {filteredBookings.map((booking) => (
                <div 
                  key={booking.id} 
                  className="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleBookingClick(booking.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{booking.hotelName}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600 mb-1">
                        <MapPin className="w-4 h-4" />
                        <span>{booking.hotelLocation}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < booking.hotelRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">({booking.hotelRating}/5)</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Booking ID</p>
                      <p className="font-mono font-medium">{booking.id}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Booked on {formatDate(booking.bookingDate)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Room Image */}
                    <div className="md:col-span-1">
                      <img 
                        src={booking.room.image} 
                        alt={booking.room.name}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="md:col-span-2 space-y-2">
                      <p className="font-medium text-blue-600">{booking.room.name}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}</span>
                        </div>
                        <span>•</span>
                        <span>{booking.pricing.nights} night{booking.pricing.nights > 1 ? 's' : ''}</span>
                        <span>•</span>
                        <span>{booking.guests.adults + booking.guests.children} guest{booking.guests.adults + booking.guests.children > 1 ? 's' : ''}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Guest: {booking.guestInfo.firstName} {booking.guestInfo.lastName}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-1 text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        ${booking.pricing.total.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">Total paid</p>
                      <p className="text-xs text-gray-500">{booking.paymentMethod}</p>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Click to view full details
                      </div>
                      
                      <div className="flex space-x-3">
                        {booking.status === 'confirmed' && (
                          <>
                            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                              Download Receipt
                            </button>
                            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                              Contact Hotel
                            </button>
                          </>
                        )}
                        {booking.status === 'pending' && (
                          <button className="text-sm text-yellow-600 hover:text-yellow-700 font-medium">
                            Modify Booking
                          </button>
                        )}
                        {booking.status === 'cancelled' && (
                          <span className="text-sm text-gray-500">Booking cancelled</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Calendar className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {selectedStatus !== 'all' ? selectedStatus : ''} bookings found
              </h3>
              <p className="text-gray-600 mb-6">
                {selectedStatus === 'all' 
                  ? "You haven't made any bookings yet. Start exploring hotels!"
                  : `You don't have any ${selectedStatus} bookings.`
                }
              </p>
              <button
                onClick={() => router.push(`/${currentLocale}`)}
                className="btn-primary px-6 py-3"
              >
                Explore Hotels
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 