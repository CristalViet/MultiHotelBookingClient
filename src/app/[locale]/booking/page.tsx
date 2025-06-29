'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import BookingForm from '@/components/BookingForm';
import PaymentMethodSelector from '@/components/PaymentMethodSelector';
import PaymentForm from '@/components/PaymentForm';
// import CurrencyConverter from '@/components/CurrencyConverter'; // HIDDEN
// import TrustBadges from '@/components/TrustBadges'; // HIDDEN

export default function BookingPage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get current locale from pathname
  const currentLocale = pathname.split('/')[1] || 'en';

  // Get booking parameters from URL
  const roomId = searchParams.get('roomId');
  const hotelId = searchParams.get('hotelId');
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const adults = parseInt(searchParams.get('adults') || '2');
  const children = parseInt(searchParams.get('children') || '0');
  const rooms = parseInt(searchParams.get('rooms') || '1');

  // Booking flow state
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<any>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit-card');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [convertedPrice, setConvertedPrice] = useState(150);

  // Mock data - in real app, fetch from API based on roomId and hotelId
  const mockRoom = {
    id: roomId || 'room-1',
    name: 'Deluxe King Room',
    price: 150,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400',
    size: 35,
    capacity: 2,
    amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Coffee Machine']
  };

  const mockHotel = {
    name: 'Luxury Grand Hotel',
    location: 'Hanoi Old Quarter, Vietnam',
    rating: 4.8
  };

  // Load saved booking data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('bookingData');
    if (savedData) {
      setBookingData(JSON.parse(savedData));
    }
  }, []);

  // Handle booking form completion (Step 1)
  const handleBookingNext = (data: any) => {
    const newBookingData = {
      ...data,
      room: mockRoom,
      hotel: mockHotel,
      paymentMethod: selectedPaymentMethod,
      currency: selectedCurrency,
      convertedPrice: convertedPrice
    };
    
    setBookingData(newBookingData);
    localStorage.setItem('bookingData', JSON.stringify(newBookingData));
    setCurrentStep(2); // Move to payment method selection
  };

  // Handle payment method selection (Step 2)
  const handlePaymentMethodNext = () => {
    if (!selectedPaymentMethod) return;
    
    const updatedData = {
      ...bookingData,
      paymentMethod: selectedPaymentMethod
    };
    setBookingData(updatedData);
    localStorage.setItem('bookingData', JSON.stringify(updatedData));
    setCurrentStep(3); // Move to payment form
  };

  // Handle payment form submission (Step 3)
  const handlePaymentSubmit = (paymentData: any) => {
    const finalBookingData = {
      ...bookingData,
      paymentDetails: paymentData
    };
    
    localStorage.setItem('bookingData', JSON.stringify(finalBookingData));
    
    // Navigate to guest info page
    router.push(`/${currentLocale}/booking/guest-info?roomId=${roomId}&hotelId=${hotelId}`);
  };

  // Handle currency change - HIDDEN
  // const handleCurrencyChange = (currency: string, amount: number) => {
  //   setSelectedCurrency(currency);
  //   setConvertedPrice(amount);
  // };

  // Handle back navigation
  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  if (!roomId || !hotelId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Booking Request</h1>
          <p className="text-gray-600 mb-6">Please select a room from the hotel details page.</p>
          <button 
            onClick={() => router.push(`/${currentLocale}`)}
            className="btn-primary px-6 py-3"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 1, title: 'Booking Details', description: 'Review room and dates' },
    { id: 2, title: 'Payment Method', description: 'Choose payment option' },
    { id: 3, title: 'Payment Details', description: 'Enter payment information' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Progress Steps */}
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  {step.id}
                </div>
                <div className="ml-3">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          
          {/* Main Content */}
          <div>
            
            {/* Step 1: Booking Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <BookingForm
                  room={mockRoom}
                  hotelName={mockHotel.name}
                  hotelLocation={mockHotel.location}
                  hotelRating={mockHotel.rating}
                  defaultCheckIn={checkIn}
                  defaultCheckOut={checkOut}
                  defaultGuests={{ adults, children, rooms }}
                  onSubmit={handleBookingNext}
                  showPaymentSection={false}
                />
              </div>
            )}

            {/* Step 2: Payment Method Selection */}
            {currentStep === 2 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Payment Method</h2>
                  <p className="text-gray-600">Select your preferred payment option</p>
                </div>

                <PaymentMethodSelector
                  selectedMethod={selectedPaymentMethod}
                  onMethodChange={setSelectedPaymentMethod}
                  showFees={true}
                  showProcessingTime={true}
                />

                <div className="flex space-x-4 mt-8">
                  <button
                    onClick={handleStepBack}
                    className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePaymentMethodNext}
                    disabled={!selectedPaymentMethod}
                    className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Form */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <PaymentForm
                  paymentMethod={selectedPaymentMethod === 'credit-card' ? 'Credit Card' : 'PayPal'}
                  onSubmit={handlePaymentSubmit}
                  onCancel={handleStepBack}
                  isProcessing={false}
                />
              </div>
            )}

          </div>

          {/* Sidebar - HIDDEN */}
          {/* 
          <div className="space-y-6">
            
            <CurrencyConverter
              baseAmount={mockRoom.price}
              baseCurrency="USD"
              showPopularCurrencies={true}
              showTrendIndicator={true}
              onCurrencyChange={handleCurrencyChange}
            />

            {bookingData && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room:</span>
                    <span className="font-medium">{mockRoom.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hotel:</span>
                    <span className="font-medium">{mockHotel.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-in:</span>
                    <span className="font-medium">{checkIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-out:</span>
                    <span className="font-medium">{checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests:</span>
                    <span className="font-medium">{adults} adults, {children} children</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold">
                    <span>Total Price:</span>
                    <span className="text-blue-600">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: selectedCurrency
                      }).format(convertedPrice)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <TrustBadges
              layout="vertical"
              showDescription={false}
              showVerifiedBadge={true}
              size="small"
              categories={['security', 'guarantee']}
            />

          </div>
          */}
        </div>
      </div>
    </div>
  );
} 