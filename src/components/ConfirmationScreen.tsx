'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { 
  CheckCircle, 
  Calendar, 
  Users, 
  MapPin, 
  Star, 
  Download, 
  Mail, 
  Phone, 
  Share2,
  Printer,
  CreditCard,
  Clock,
  Home,
  ExternalLink
} from 'lucide-react';

interface Room {
  id: string;
  name: string;
  price: number;
  image: string;
  size: number;
  capacity: number;
  amenities: string[];
}

interface Guest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface ConfirmationScreenProps {
  bookingId: string;
  confirmationNumber: string;
  room: Room;
  hotelName: string;
  hotelLocation: string;
  hotelRating: number;
  hotelPhone?: string;
  hotelEmail?: string;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
    rooms: number;
  };
  primaryGuest: Guest;
  pricing: {
    subtotal: number;
    taxes: number;
    serviceFee: number;
    total: number;
    nights: number;
  };
  paymentMethod: string;
  bookingDate: string;
  checkInTime?: string;
  checkOutTime?: string;
  cancellationPolicy?: string;
  specialRequests?: string;
}

export default function ConfirmationScreen({
  bookingId,
  confirmationNumber,
  room,
  hotelName,
  hotelLocation,
  hotelRating,
  hotelPhone,
  hotelEmail,
  checkIn,
  checkOut,
  guests,
  primaryGuest,
  pricing,
  paymentMethod,
  bookingDate,
  checkInTime = '3:00 PM',
  checkOutTime = '11:00 AM',
  cancellationPolicy = 'Free cancellation until 24 hours before check-in',
  specialRequests
}: ConfirmationScreenProps) {
  const t = useTranslations();
  const [emailSent, setEmailSent] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSendConfirmationEmail = () => {
    // Simulate sending email
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  const handleDownloadReceipt = () => {
    // Implement download functionality
    console.log('Downloading receipt...');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Booking Confirmation - ${hotelName}`,
          text: `My booking at ${hotelName} is confirmed! Booking ID: ${bookingId}`,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`Booking confirmed at ${hotelName}! Booking ID: ${bookingId}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Success Header */}
      <div className="text-center py-8">
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
        <p className="text-lg text-gray-600 mb-2">
          Your reservation has been successfully confirmed
        </p>
        <p className="text-gray-500">
          Confirmation sent to {primaryGuest.email}
        </p>
      </div>

      {/* Booking Details Card */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{hotelName}</h2>
            <div className="flex items-center space-x-2 text-gray-600 mt-1">
              <MapPin className="w-4 h-4" />
              <span>{hotelLocation}</span>
            </div>
            <div className="flex items-center space-x-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < hotelRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
              <span className="text-sm text-gray-600 ml-1">({hotelRating}/5)</span>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-600">Booking ID</p>
            <p className="text-lg font-mono font-semibold">{bookingId}</p>
            <p className="text-sm text-gray-600 mt-1">Confirmation #</p>
            <p className="text-md font-mono font-medium">{confirmationNumber}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={handleDownloadReceipt}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Receipt</span>
          </button>
          
          <button
            onClick={handleSendConfirmationEmail}
            disabled={emailSent}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <Mail className="w-4 h-4" />
            <span>{emailSent ? 'Email Sent!' : 'Resend Email'}</span>
          </button>
          
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Room Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Room Details</h3>
              <div className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
                <img 
                  src={room.image} 
                  alt={room.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-medium text-blue-600">{room.name}</p>
                  <p className="text-sm text-gray-600">{room.size} m² • Up to {room.capacity} guests</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-white text-gray-600 px-2 py-1 rounded border"
                      >
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{room.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Stay Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Check-in</p>
                      <p className="font-medium">{formatDate(checkIn)}</p>
                      <p className="text-sm text-gray-500">After {checkInTime}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Check-out</p>
                      <p className="font-medium">{formatDate(checkOut)}</p>
                      <p className="text-sm text-gray-500">Before {checkOutTime}</p>
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
            <div>
              <h3 className="text-lg font-semibold mb-4">Primary Guest</h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-lg">{primaryGuest.firstName} {primaryGuest.lastName}</p>
                <p className="text-gray-600">{primaryGuest.email}</p>
                <p className="text-gray-600">{primaryGuest.phone}</p>
              </div>
            </div>

            {/* Special Requests */}
            {specialRequests && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Special Requests</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{specialRequests}</p>
                </div>
              </div>
            )}

            {/* Hotel Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Hotel Contact</h3>
              <div className="space-y-3">
                {hotelPhone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span>{hotelPhone}</span>
                  </div>
                )}
                {hotelEmail && (
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span>{hotelEmail}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Important Information</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Please bring a valid ID and credit card for check-in</li>
                <li>• {cancellationPolicy}</li>
                <li>• Contact the hotel directly for any special arrangements</li>
                <li>• Check-in time: {checkInTime}, Check-out time: {checkOutTime}</li>
              </ul>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
              
              <div className="space-y-3 mb-6">
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
                  <span>Total Paid</span>
                  <span className="text-green-600">${pricing.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Payment Method</h4>
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{paymentMethod}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Booking date: {formatDate(bookingDate)}
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button className="w-full btn-primary py-3">
                  View Booking Details
                </button>
                
                <button className="w-full btn-secondary py-3">
                  Modify Booking
                </button>
                
                <button className="w-full flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Home className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">What's Next?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium mb-2">Check Your Email</h4>
            <p className="text-sm text-gray-600">
              Confirmation details have been sent to your email address
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium mb-2">Add to Calendar</h4>
            <p className="text-sm text-gray-600">
              Save your travel dates to your calendar for easy reference
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ExternalLink className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-medium mb-2">Plan Your Trip</h4>
            <p className="text-sm text-gray-600">
              Explore local attractions and book activities for your stay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 