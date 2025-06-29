'use client';

import { useTranslations } from 'next-intl';
import { Calendar, Users, MapPin, Star, Clock, CheckCircle } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  price: number;
  image: string;
  size: number;
  capacity: number;
  amenities: string[];
}

interface BookingSummaryProps {
  bookingId?: string;
  room: Room;
  hotelName: string;
  hotelLocation: string;
  hotelRating: number;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
    rooms: number;
  };
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  pricing: {
    subtotal: number;
    taxes: number;
    serviceFee: number;
    total: number;
    nights: number;
  };
  status?: 'pending' | 'confirmed' | 'cancelled';
  paymentMethod?: string;
  showEditButton?: boolean;
  onEdit?: () => void;
}

export default function BookingSummary({
  bookingId,
  room,
  hotelName,
  hotelLocation,
  hotelRating,
  checkIn,
  checkOut,
  guests,
  guestInfo,
  pricing,
  status = 'pending',
  paymentMethod = 'Credit Card',
  showEditButton = false,
  onEdit
}: BookingSummaryProps) {
  const t = useTranslations();

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'confirmed':
        return (
          <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Confirmed</span>
          </div>
        );
      case 'cancelled':
        return (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-1 rounded-full">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Cancelled</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Pending</span>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="card p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Summary</h1>
            {bookingId && (
              <p className="text-gray-600">Booking ID: <span className="font-mono font-medium">{bookingId}</span></p>
            )}
          </div>
          <div className="flex items-center space-x-3">
            {getStatusBadge()}
            {showEditButton && onEdit && (
              <button
                onClick={onEdit}
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Edit Booking
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hotel & Room Information */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Accommodation Details</h2>
            <div className="flex space-x-4">
              <img 
                src={room.image} 
                alt={room.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-900 mb-2">{hotelName}</h3>
                <div className="flex items-center space-x-2 text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{hotelLocation}</span>
                </div>
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < hotelRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">({hotelRating}/5)</span>
                </div>
                <p className="font-medium text-lg text-blue-600 mb-1">{room.name}</p>
                <p className="text-gray-600">{room.size} m² • Up to {room.capacity} guests</p>
                
                {/* Amenities */}
                {room.amenities.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Room amenities:</p>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.slice(0, 4).map((amenity, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                        >
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 4 && (
                        <span className="text-xs text-gray-500">
                          +{room.amenities.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stay Details */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Stay Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Check-in</p>
                    <p className="font-medium">{formatDate(checkIn)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Check-out</p>
                    <p className="font-medium">{formatDate(checkOut)}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Guests</p>
                    <p className="font-medium">
                      {guests.adults} Adult{guests.adults > 1 ? 's' : ''}
                      {guests.children > 0 && `, ${guests.children} Child${guests.children > 1 ? 'ren' : ''}`}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Rooms</p>
                    <p className="font-medium">{guests.rooms} Room{guests.rooms > 1 ? 's' : ''}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-medium">{pricing.nights} Night{pricing.nights > 1 ? 's' : ''}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Guest Information */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Guest Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Primary Guest</p>
                <p className="font-medium text-lg">{guestInfo.firstName} {guestInfo.lastName}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">Contact Information</p>
                <p className="font-medium">{guestInfo.email}</p>
                <p className="text-gray-600">{guestInfo.phone}</p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
              <div>
                <p className="font-medium">{paymentMethod}</p>
                <p className="text-sm text-gray-600">Payment processed securely</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Price Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Room rate ({pricing.nights} nights)</span>
                <span className="font-medium">${pricing.subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes & fees</span>
                <span className="font-medium">${pricing.taxes.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Service fee</span>
                <span className="font-medium">${pricing.serviceFee.toFixed(2)}</span>
              </div>
              
              <hr className="my-4" />
              
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-blue-600">${pricing.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Status-specific actions */}
            {status === 'confirmed' && (
              <div className="mt-6 space-y-3">
                <button className="w-full btn-primary py-2">
                  Download Receipt
                </button>
                <button className="w-full btn-secondary py-2">
                  Contact Hotel
                </button>
              </div>
            )}

            {status === 'pending' && (
              <div className="mt-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-700">
                    Your booking is being processed. You will receive a confirmation email shortly.
                  </p>
                </div>
              </div>
            )}

            {status === 'cancelled' && (
              <div className="mt-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-700">
                    This booking has been cancelled. Refund processing may take 3-5 business days.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 