'use client';

import { useState } from 'react';
import { 
  ArrowLeft, Phone, Mail, MapPin, Calendar, CreditCard, 
  Star, Gift, Edit, Eye, Download, User, Crown
} from 'lucide-react';

interface GuestInfo {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  joinDate: string;
  nationality: string;
  dateOfBirth: string;
  loyaltyTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  loyaltyPoints: number;
}

interface BookingInfo {
  bookingId: string;
  hotelName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  status: 'Confirmed' | 'Checked-in' | 'Checked-out' | 'Cancelled';
  amount: number;
}

interface BookingHistory {
  id: string;
  hotelName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  status: 'Completed' | 'Cancelled' | 'No-show';
  amount: number;
  rating?: number;
}

export default function GuestProfile() {
  const [activeTab, setActiveTab] = useState<'info' | 'bookings' | 'history'>('info');

  const guestInfo: GuestInfo = {
    id: 'G-B00109',
    name: 'Angus Cooper',
    phone: '+1 (555) 789-1234',
    email: 'angus.cooper@example.com',
    avatar: '/api/placeholder/80/80',
    joinDate: 'June 15, 2022',
    nationality: 'American',
    dateOfBirth: 'April 12, 1985',
    loyaltyTier: 'Platinum',
    loyaltyPoints: 15000
  };

  const currentBooking: BookingInfo = {
    bookingId: 'LG-B00109',
    hotelName: 'Grand Hotel Downtown',
    roomType: 'Deluxe Suite',
    checkIn: 'June 18, 2024',
    checkOut: 'June 22, 2024',
    nights: 4,
    guests: 2,
    status: 'Confirmed',
    amount: 1280.00
  };

  const bookingHistory: BookingHistory[] = [
    {
      id: 'LG-B00095',
      hotelName: 'Seaside Resort',
      roomType: 'Ocean View',
      checkIn: 'Jan 15, 2024',
      checkOut: 'Jan 22, 2024',
      nights: 7,
      status: 'Completed',
      amount: 2100.00,
      rating: 5
    },
    {
      id: 'LG-B00087',
      hotelName: 'Mountain Lodge',
      roomType: 'Standard Room',
      checkIn: 'Dec 20, 2023',
      checkOut: 'Dec 27, 2023',
      nights: 7,
      status: 'Completed',
      amount: 1400.00,
      rating: 4
    },
    {
      id: 'LG-B00072',
      hotelName: 'City Center Hotel',
      roomType: 'Business Suite',
      checkIn: 'Sep 10, 2023',
      checkOut: 'Sep 15, 2023',
      nights: 5,
      status: 'Completed',
      amount: 750.00,
      rating: 5
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Silver': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-orange-100 text-orange-800 border-orange-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-blue-100 text-blue-800';
      case 'Checked-in': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'No-show': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Guest Profile</h1>
          <p className="text-gray-600">Manage guest information and bookings</p>
        </div>
      </div>

      {/* Guest Summary Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-start gap-6">
          <img
            src={guestInfo.avatar}
            alt={guestInfo.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{guestInfo.name}</h2>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {guestInfo.phone}
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {guestInfo.email}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getTierColor(guestInfo.loyaltyTier)}`}>
                  <div className="flex items-center gap-1">
                    <Crown className="w-4 h-4" />
                    {guestInfo.loyaltyTier} Member
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Edit className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-500">Guest ID</p>
                <p className="font-medium text-gray-900">{guestInfo.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium text-gray-900">{guestInfo.joinDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Loyalty Points</p>
                <p className="font-medium text-gray-900">{guestInfo.loyaltyPoints.toLocaleString()} pts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'info'
                ? 'text-lime-600 border-b-2 border-lime-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'bookings'
                ? 'text-lime-600 border-b-2 border-lime-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Current Booking
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'history'
                ? 'text-lime-600 border-b-2 border-lime-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Booking History
          </button>
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'info' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                      <p className="font-medium text-gray-900">{guestInfo.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Date of Birth</label>
                      <p className="font-medium text-gray-900">{guestInfo.dateOfBirth}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Nationality</label>
                    <p className="font-medium text-gray-900">{guestInfo.nationality}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Email Address</label>
                    <p className="font-medium text-gray-900">{guestInfo.email}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Phone Number</label>
                    <p className="font-medium text-gray-900">{guestInfo.phone}</p>
                  </div>
                </div>
              </div>

              {/* Loyalty Program */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Loyalty Program</h3>
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getTierColor(guestInfo.loyaltyTier)}`}>
                      {guestInfo.loyaltyTier} Member
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Current Points</p>
                      <p className="text-lg font-bold text-gray-900">{guestInfo.loyaltyPoints.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress to Elite</span>
                      <span className="text-gray-900">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600">Next tier in 2,000 more points</p>
                </div>
              </div>
            </div>
          )}

          {/* Current Booking Tab */}
          {activeTab === 'bookings' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Current Booking</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentBooking.status)}`}>
                  {currentBooking.status}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Booking Details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Booking ID</label>
                    <p className="font-medium text-gray-900">{currentBooking.bookingId}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Hotel</label>
                    <p className="font-medium text-gray-900">{currentBooking.hotelName}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Room Type</label>
                    <p className="font-medium text-gray-900">{currentBooking.roomType}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Check-in</label>
                      <p className="font-medium text-gray-900">{currentBooking.checkIn}</p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Check-out</label>
                      <p className="font-medium text-gray-900">{currentBooking.checkOut}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Nights</label>
                      <p className="font-medium text-gray-900">{currentBooking.nights}</p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Guests</label>
                      <p className="font-medium text-gray-900">{currentBooking.guests}</p>
                    </div>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-lime-50 rounded-xl p-4 border border-lime-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Price Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Room rate ({currentBooking.nights} nights)</span>
                      <span className="text-gray-900">${(currentBooking.amount * 0.8).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Taxes & fees</span>
                      <span className="text-gray-900">${(currentBooking.amount * 0.15).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Service charge</span>
                      <span className="text-gray-900">${(currentBooking.amount * 0.05).toFixed(2)}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-900">Total Amount</span>
                      <span className="text-gray-900">${currentBooking.amount.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-lime-200">
                    <p className="text-sm text-gray-600 mb-2">Loyalty discount applied</p>
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-lime-600" />
                      <span className="text-sm text-lime-700">Earned 640 points from this booking</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button className="px-6 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors">
                  Cancel Booking
                </button>
                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4 inline mr-2" />
                  Download Invoice
                </button>
              </div>
            </div>
          )}

          {/* Booking History Tab */}
          {activeTab === 'history' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Booking History</h3>
                <p className="text-sm text-gray-600">{bookingHistory.length} total bookings</p>
              </div>

              <div className="space-y-4">
                {bookingHistory.map((booking) => (
                  <div key={booking.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-gray-900">{booking.hotelName}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                          {booking.rating && renderStars(booking.rating)}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Booking ID</span>
                            <p className="font-medium text-gray-900">{booking.id}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Room Type</span>
                            <p className="font-medium text-gray-900">{booking.roomType}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Dates</span>
                            <p className="font-medium text-gray-900">{booking.checkIn} - {booking.checkOut}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Total</span>
                            <p className="font-medium text-gray-900">${booking.amount.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                      
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 