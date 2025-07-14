'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Calendar, Users, MapPin, CreditCard, User, Mail, Phone, Star } from 'lucide-react';

import { testBasicClient } from '@/lib/services/test-client';

interface Room {
  id: string;
  name: string;
  price: number;
  image: string;
  size: number;
  capacity: number;
  amenities: string[];
}

interface BookingFormProps {
  room: Room;
  hotelName: string;
  hotelLocation: string;
  hotelRating: number;
  defaultCheckIn?: string;
  defaultCheckOut?: string;
  defaultGuests?: {
    adults: number;
    children: number;
    rooms: number;
  };
  onSubmit?: (data: any) => void;
  showPaymentSection?: boolean;
}

export default function BookingForm({
  room,
  hotelName,
  hotelLocation,
  hotelRating,
  defaultCheckIn = '',
  defaultCheckOut = '',
  defaultGuests = { adults: 2, children: 0, rooms: 1 },
  onSubmit,
  showPaymentSection = true
}: BookingFormProps) {
  const t = useTranslations();
  
  // Booking details state
  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [guests, setGuests] = useState(defaultGuests);
  
  // Guest information state
  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  // Calculate dates and pricing
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const subtotal = room.price * nights * guests.rooms;
  const taxes = subtotal * 0.1; // 10% tax
  const serviceFee = subtotal * 0.05; // 5% service fee
  const total = subtotal + taxes + serviceFee;

  const updateGuests = (type: 'adults' | 'children' | 'rooms', increment: boolean) => {
    setGuests(prev => ({
      ...prev,
      [type]: Math.max(type === 'children' ? 0 : 1, prev[type] + (increment ? 1 : -1))
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bookingData = {
      room,
      checkIn,
      checkOut,
      guests,
      guestInfo,
      paymentMethod,
      cardInfo,
      total
    };
    
    if (onSubmit) {
      onSubmit(bookingData);
    } else {
      // Handle booking submission
      console.log('Booking submitted:', bookingData);
    }
  };
  useEffect(() => {
    // Chỉ test khi development
    if (process.env.NODE_ENV === 'development') {
      testBasicClient();
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
        <p className="text-gray-600">Review your details and secure your reservation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Booking Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hotel & Room Information */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Your Selection</h2>
            <div className="flex space-x-4">
              <img 
                src={room.image} 
                alt={room.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{hotelName}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>{hotelLocation}</span>
                </div>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < hotelRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">({hotelRating}/5)</span>
                </div>
                <p className="font-medium text-blue-600">{room.name}</p>
                <p className="text-sm text-gray-600">{room.size} m² • Up to {room.capacity} guests</p>
              </div>
            </div>
          </div>

          {/* Dates & Guests */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Stay Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Check-in */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="input-field pl-10"
                    required
                  />
                </div>
              </div>

              {/* Check-out */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-out
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="input-field pl-10"
                    required
                  />
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guests & Rooms
                </label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Adults</span>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => updateGuests('adults', false)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{guests.adults}</span>
                      <button
                        type="button"
                        onClick={() => updateGuests('adults', true)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Children</span>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => updateGuests('children', false)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{guests.children}</span>
                      <button
                        type="button"
                        onClick={() => updateGuests('children', true)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Rooms</span>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => updateGuests('rooms', false)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{guests.rooms}</span>
                      <button
                        type="button"
                        onClick={() => updateGuests('rooms', true)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Guest Information */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Guest Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={guestInfo.firstName}
                    onChange={(e) => setGuestInfo({...guestInfo, firstName: e.target.value})}
                    className="input-field pl-10"
                    placeholder="Enter first name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={guestInfo.lastName}
                    onChange={(e) => setGuestInfo({...guestInfo, lastName: e.target.value})}
                    className="input-field pl-10"
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={guestInfo.email}
                    onChange={(e) => setGuestInfo({...guestInfo, email: e.target.value})}
                    className="input-field pl-10"
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    value={guestInfo.phone}
                    onChange={(e) => setGuestInfo({...guestInfo, phone: e.target.value})}
                    className="input-field pl-10"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  value={guestInfo.specialRequests}
                  onChange={(e) => setGuestInfo({...guestInfo, specialRequests: e.target.value})}
                  className="input-field"
                  placeholder="Any special requests or preferences"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Payment Information */}
          {showPaymentSection && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
              
              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <CreditCard className="w-5 h-5 mr-2 text-gray-400" />
                    <span>Credit/Debit Card</span>
                  </label>
                  
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-blue-600 font-semibold mr-2">PayPal</span>
                  </label>
                </div>
              </div>

              {/* Card Information */}
              {paymentMethod === 'card' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      value={cardInfo.number}
                      onChange={(e) => setCardInfo({...cardInfo, number: e.target.value})}
                      className="input-field"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      value={cardInfo.expiry}
                      onChange={(e) => setCardInfo({...cardInfo, expiry: e.target.value})}
                      className="input-field"
                      placeholder="MM/YY"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV *
                    </label>
                    <input
                      type="text"
                      value={cardInfo.cvv}
                      onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})}
                      className="input-field"
                      placeholder="123"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      value={cardInfo.name}
                      onChange={(e) => setCardInfo({...cardInfo, name: e.target.value})}
                      className="input-field"
                      placeholder="Enter cardholder name"
                      required
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Booking Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Check-in:</span>
                <span className="font-medium">{checkIn || 'Select date'}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Check-out:</span>
                <span className="font-medium">{checkOut || 'Select date'}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-medium">{nights > 0 ? `${nights} night${nights > 1 ? 's' : ''}` : 'Select dates'}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Guests:</span>
                <span className="font-medium">{guests.adults + guests.children} guests</span>
              </div>
              
              <div className="flex justify-between">
                <span>Rooms:</span>
                <span className="font-medium">{guests.rooms} room{guests.rooms > 1 ? 's' : ''}</span>
              </div>
              
              <hr className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Room rate ({nights} nights)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Taxes & fees</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
              </div>
              
              <hr className="my-4" />
              
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={!checkIn || !checkOut || !guestInfo.firstName || !guestInfo.lastName || !guestInfo.email || !guestInfo.phone}
                className="w-full btn-primary mt-6 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {showPaymentSection ? 'Complete Booking' : 'Continue to Payment'}
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-2">
                By completing your booking, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 