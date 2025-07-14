'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import RoomSelectionStep from '@/components/RoomSelectionStep';
import GuestInfoStep from '@/components/GuestInfoStep';
import PromoCodeStep from '@/components/PromoCodeStep';
import PaymentSelectionStep from '@/components/PaymentSelectionStep';
import { createPayOSClient, defaultPayOSConfig, formatPaymentItems, createPaymentDescription } from '@/lib/services/payos-client';

interface BookingData {
  room: any;
  hotel: any;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
    rooms: number;
  };
  nights: number;
  subtotal: number;
  originalTotal: number;
  guestInfo?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialRequests?: string;
  };
  promoCode?: string;
  discount?: number;
  finalTotal?: number;
  paymentMethod?: string;
}

export default function NewBookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'vi';

  // URL parameters
  const roomId = searchParams.get('roomId');
  const hotelId = searchParams.get('hotelId');
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const adults = parseInt(searchParams.get('adults') || '2');
  const children = parseInt(searchParams.get('children') || '0');
  const rooms = parseInt(searchParams.get('rooms') || '1');

  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data - in real app, fetch from API
  const mockRoom = {
    id: roomId || 'room-1',
    name: 'Elegance Family với Balcony Sea View',
    price: 2900000,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600',
    size: 45,
    capacity: 4,
    amenities: ['Tầm nhìn ra biển', 'Ban công riêng', 'WiFi miễn phí', 'TV màn hình phẳng', 'Minibar', 'Két an toàn'],
    description: 'Phòng gia đình sang trọng với tầm nhìn tuyệt đẹp ra Vịnh Hạ Long'
  };

  const mockHotel = {
    name: 'Tuần Châu Resort Hạ Long',
    location: 'Đảo Tuần Châu, Hạ Long, Quảng Ninh',
    rating: 4.9
  };

  // Validate required parameters
  useEffect(() => {
    if (!roomId || !hotelId) {
      router.push(`/${currentLocale}`);
    }
  }, [roomId, hotelId, router, currentLocale]);

  // Step 1: Room Selection
  const handleRoomSelectionNext = (data: any) => {
    const newBookingData: BookingData = {
      ...data,
      originalTotal: data.total
    };
    setBookingData(newBookingData);
    setCurrentStep(2);
  };

  // Step 2: Guest Info
  const handleGuestInfoNext = (guestInfo: any) => {
    if (!bookingData) return;
    
    const updatedData: BookingData = {
      ...bookingData,
      guestInfo
    };
    setBookingData(updatedData);
    setCurrentStep(3);
  };

  // Step 3: Promo Code
  const handlePromoCodeNext = (promoData: any) => {
    if (!bookingData) return;
    
    const updatedData: BookingData = {
      ...bookingData,
      promoCode: promoData.promoCode,
      discount: promoData.discount,
      finalTotal: promoData.finalTotal
    };
    setBookingData(updatedData);
    setCurrentStep(4);
  };

  // Step 4: Payment Selection
  const handlePaymentSelectionNext = async (paymentMethod: string) => {
    if (!bookingData) return;

    setIsProcessing(true);
    
    try {
      const finalBookingData: BookingData = {
        ...bookingData,
        paymentMethod
      };

      if (paymentMethod === 'payos') {
        // Handle PayOS payment
        await handlePayOSPayment(finalBookingData);
      } else if (paymentMethod === 'pay-later') {
        // Handle pay later booking
        await handlePayLaterBooking(finalBookingData);
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      alert('Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle PayOS payment
  const handlePayOSPayment = async (finalData: BookingData) => {
    try {
      const payosClient = createPayOSClient(defaultPayOSConfig);
      
      const paymentData = {
        orderCode: '',
        amount: finalData.finalTotal || finalData.originalTotal,
        description: createPaymentDescription(finalData),
        items: formatPaymentItems(finalData),
        buyerName: `${finalData.guestInfo?.firstName} ${finalData.guestInfo?.lastName}`,
        buyerEmail: finalData.guestInfo?.email || '',
        buyerPhone: finalData.guestInfo?.phone || '',
        buyerAddress: finalData.hotel.location
      };

      const response = await payosClient.createPaymentLink(paymentData);

      if (response.error === 0 && response.data) {
        // Store booking data for confirmation
        const confirmationData = {
          ...finalData,
          orderCode: response.data.orderCode,
          paymentLinkId: response.data.paymentLinkId,
          paymentStatus: 'PENDING',
          bookingDate: new Date().toISOString()
        };
        
        localStorage.setItem('confirmationData', JSON.stringify(confirmationData));
        
        // Redirect to PayOS checkout
        window.location.href = response.data.checkoutUrl;
      } else {
        throw new Error(response.message || 'PayOS payment failed');
      }
    } catch (error) {
      console.error('PayOS payment error:', error);
      throw error;
    }
  };

  // Handle pay later booking
  const handlePayLaterBooking = async (finalData: BookingData) => {
    try {
      // Simulate booking creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const bookingId = `BK${Date.now()}`;
      const confirmationData = {
        ...finalData,
        bookingId,
        confirmationNumber: bookingId,
        paymentStatus: 'PAY_LATER',
        bookingDate: new Date().toISOString(),
        depositAmount: (finalData.finalTotal || finalData.originalTotal) * 0.3,
        depositDue: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
      };

      localStorage.setItem('confirmationData', JSON.stringify(confirmationData));
      
      // Navigate to confirmation
      router.push(`/${currentLocale}/booking/confirmation?bookingId=${bookingId}&paymentMethod=pay-later`);
    } catch (error) {
      console.error('Pay later booking error:', error);
      throw error;
    }
  };

  // Back navigation
  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  // Progress indicator
  const getStepProgress = () => {
    return (currentStep / 4) * 100;
  };

  const stepTitles = [
    'Chọn phòng & ngày',
    'Thông tin khách hàng', 
    'Mã ưu đãi',
    'Phương thức thanh toán'
  ];

  if (!roomId || !hotelId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Thông tin đặt phòng không hợp lệ</h1>
          <p className="text-gray-600 mb-6">Vui lòng chọn phòng từ trang khách sạn.</p>
          <button 
            onClick={() => router.push(`/${currentLocale}`)}
            className="btn-primary px-6 py-3"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Bước {currentStep} / 4: {stepTitles[currentStep - 1]}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(getStepProgress())}% hoàn thành
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${getStepProgress()}%` }}
                ></div>
              </div>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center justify-between">
              {stepTitles.map((title, index) => (
                <div key={index} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium ${
                    currentStep > index + 1 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : currentStep === index + 1
                      ? 'bg-primary-600 border-primary-600 text-white'
                      : 'bg-white border-gray-300 text-gray-500'
                  }`}>
                    {currentStep > index + 1 ? '✓' : index + 1}
                  </div>
                  <span className={`ml-2 text-sm font-medium hidden sm:block ${
                    currentStep >= index + 1 ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {title}
                  </span>
                  {index < stepTitles.length - 1 && (
                    <div className={`w-12 lg:w-20 h-1 mx-2 ${
                      currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8">
        {/* Processing Overlay */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Đang xử lý...</h3>
              <p className="text-gray-600">Vui lòng đợi trong giây lát</p>
            </div>
          </div>
        )}

        {/* Step 1: Room Selection */}
        {currentStep === 1 && (
          <RoomSelectionStep
            room={mockRoom}
            hotel={mockHotel}
            defaultCheckIn={checkIn}
            defaultCheckOut={checkOut}
            defaultGuests={{ adults, children, rooms }}
            onNext={handleRoomSelectionNext}
            onBack={() => router.back()}
          />
        )}

        {/* Step 2: Guest Info */}
        {currentStep === 2 && bookingData && (
          <GuestInfoStep
            defaultGuestInfo={bookingData.guestInfo}
            onNext={handleGuestInfoNext}
            onBack={handleStepBack}
          />
        )}

        {/* Step 3: Promo Code */}
        {currentStep === 3 && bookingData && (
          <PromoCodeStep
            subtotal={bookingData.subtotal}
            originalTotal={bookingData.originalTotal}
            defaultPromoCode={bookingData.promoCode}
            onNext={handlePromoCodeNext}
            onBack={handleStepBack}
          />
        )}

        {/* Step 4: Payment Selection */}
        {currentStep === 4 && bookingData && (
          <PaymentSelectionStep
            finalTotal={bookingData.finalTotal || bookingData.originalTotal}
            onNext={handlePaymentSelectionNext}
            onBack={handleStepBack}
          />
        )}
      </div>
    </div>
  );
} 