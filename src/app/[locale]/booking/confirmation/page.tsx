'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import PaymentSuccess from '@/components/PaymentSuccess';

export default function ConfirmationPage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [confirmationData, setConfirmationData] = useState<any>(null);

  // Get current locale from pathname
  const currentLocale = pathname.split('/')[1] || 'en';

  useEffect(() => {
    // Get confirmation data from localStorage
    const storedData = localStorage.getItem('confirmationData');
    if (storedData) {
      setConfirmationData(JSON.parse(storedData));
    } else {
      // Try to get booking data as fallback
      const bookingData = localStorage.getItem('bookingData');
      if (bookingData) {
        const data = JSON.parse(bookingData);
        // Generate confirmation data from booking data
        const confirmationId = 'HTL-CONF-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        const transactionId = 'TXN-2024-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        
        setConfirmationData({
          ...data,
          bookingId: confirmationId,
          confirmationNumber: confirmationId,
          transactionId: transactionId,
          bookingDate: new Date().toISOString(),
          timestamp: new Date().toISOString()
        });
      } else {
        // If no data at all, redirect to home
        router.push(`/${currentLocale}`);
      }
    }
  }, [router, currentLocale]);

  useEffect(() => {
    // Clean up localStorage after successful booking
    if (confirmationData) {
      // Clear booking process data but keep confirmation for reference
      localStorage.removeItem('bookingData');
      localStorage.setItem('lastConfirmation', JSON.stringify(confirmationData));
    }
  }, [confirmationData]);

  // Handler functions for PaymentSuccess actions
  const handleDownloadReceipt = () => {
    // Mock download receipt functionality
    const receiptData = {
      bookingReference: confirmationData.confirmationNumber,
      transactionId: confirmationData.transactionId,
      hotel: mockHotel.name,
      amount: total,
      date: new Date().toLocaleDateString()
    };
    
    const dataStr = JSON.stringify(receiptData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${confirmationData.confirmationNumber}.json`;
    link.click();
    
    alert('Receipt downloaded successfully!');
  };

  const handleEmailReceipt = () => {
    // Mock email receipt functionality
    const email = primaryGuest.email;
    alert(`Receipt will be sent to ${email}`);
  };

  const handlePrintReceipt = () => {
    // Mock print receipt functionality
    window.print();
  };

  const handleShareBooking = () => {
    // Mock share booking functionality
    if (navigator.share) {
      navigator.share({
        title: 'Hotel Booking Confirmation',
        text: `My booking at ${mockHotel.name} is confirmed! Reference: ${confirmationData.confirmationNumber}`,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      const shareText = `My booking at ${mockHotel.name} is confirmed! Reference: ${confirmationData.confirmationNumber}`;
      navigator.clipboard.writeText(shareText);
      alert('Booking details copied to clipboard!');
    }
  };

  const handleViewBooking = () => {
    // Navigate to booking details page
    router.push(`/${currentLocale}/bookings/${confirmationData.bookingId || confirmationData.confirmationNumber}`);
  };

  const handleBookAnother = () => {
    // Navigate back to home for new booking
    router.push(`/${currentLocale}`);
  };

  if (!confirmationData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Mock data for demo
  const mockRoom = {
    id: 'room-1',
    name: 'Deluxe King Room',
    price: 150,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400',
    size: 35,
    capacity: 2,
    amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Coffee Machine', 'Mini Bar', 'Safe']
  };

  const mockHotel = {
    name: 'Luxury Grand Hotel',
    location: 'Hanoi Old Quarter, Vietnam',
    address: '123 Luxury Ave, Hanoi Old Quarter, Vietnam',
    rating: 4.8,
    phone: '+84 24 3828 5555',
    email: 'info@luxurygrandhotel.com'
  };

  // Calculate pricing
  const checkIn = confirmationData.checkIn ? new Date(confirmationData.checkIn) : new Date();
  const checkOut = confirmationData.checkOut ? new Date(confirmationData.checkOut) : new Date();
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) || 1;
  const roomPrice = confirmationData.room?.price || mockRoom.price;
  const roomCount = confirmationData.guests?.rooms || 1;
  const subtotal = roomPrice * nights * roomCount;
  const taxes = subtotal * 0.1;
  const serviceFee = subtotal * 0.05;
  const total = subtotal + taxes + serviceFee;

  // Get primary guest information
  const primaryGuest = confirmationData.guestInfo || {
    firstName: 'John',
    lastName: 'Doe', 
    email: 'john.doe@example.com',
    phone: '+1234567890'
  };

  // Prepare data for PaymentSuccess component
  const paymentSuccessData = {
    transactionId: confirmationData.transactionId || 'TXN-2024-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
    bookingReference: confirmationData.confirmationNumber || confirmationData.bookingId || 'HTL-CONF-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
    amount: total,
    currency: confirmationData.currency || 'USD',
    paymentMethod: confirmationData.paymentMethod || 'Credit Card',
    hotel: {
      name: mockHotel.name,
      address: mockHotel.address,
      phone: mockHotel.phone,
      email: mockHotel.email
    },
    booking: {
      checkIn: confirmationData.checkIn || new Date().toISOString().split('T')[0],
      checkOut: confirmationData.checkOut || new Date(Date.now() + 86400000).toISOString().split('T')[0],
      guests: (confirmationData.guests?.adults || 2) + (confirmationData.guests?.children || 0),
      rooms: confirmationData.guests?.rooms || 1,
      roomType: confirmationData.room?.name || mockRoom.name
    },
    customer: {
      name: `${primaryGuest.firstName || 'John'} ${primaryGuest.lastName || 'Doe'}`,
      email: primaryGuest.email || 'guest@example.com',
      phone: primaryGuest.phone || '+1234567890'
    },
    timestamp: confirmationData.timestamp || new Date().toISOString()
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <PaymentSuccess
        data={paymentSuccessData}
        onDownloadReceipt={handleDownloadReceipt}
        onEmailReceipt={handleEmailReceipt}
        onPrintReceipt={handlePrintReceipt}
        onShareBooking={handleShareBooking}
        onViewBooking={handleViewBooking}
        onBookAnother={handleBookAnother}
      />
    </div>
  );
} 