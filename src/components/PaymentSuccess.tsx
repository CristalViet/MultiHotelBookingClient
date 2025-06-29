'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Download, 
  Mail, 
  Printer, 
  Share2, 
  Calendar, 
  MapPin, 
  Phone,
  Clock,
  CreditCard,
  ArrowRight,
  Copy,
  CheckCircle2
} from 'lucide-react';

interface PaymentSuccessData {
  transactionId: string;
  bookingReference: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  hotel: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  booking: {
    checkIn: string;
    checkOut: string;
    guests: number;
    rooms: number;
    roomType: string;
  };
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  timestamp: string;
}

interface PaymentSuccessProps {
  data: PaymentSuccessData;
  onDownloadReceipt?: () => void;
  onEmailReceipt?: () => void;
  onPrintReceipt?: () => void;
  onShareBooking?: () => void;
  onViewBooking?: () => void;
  onBookAnother?: () => void;
  className?: string;
}

export default function PaymentSuccess({
  data,
  onDownloadReceipt,
  onEmailReceipt,
  onPrintReceipt,
  onShareBooking,
  onViewBooking,
  onBookAnother,
  className = ''
}: PaymentSuccessProps) {
  const t = useTranslations();

  const [showAnimation, setShowAnimation] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const quickActions = [
    {
      label: 'Download Receipt',
      icon: Download,
      action: onDownloadReceipt,
      variant: 'primary' as const
    },
    {
      label: 'Email Receipt',
      icon: Mail,
      action: onEmailReceipt,
      variant: 'secondary' as const
    },
    {
      label: 'Print Receipt',
      icon: Printer,
      action: onPrintReceipt,
      variant: 'secondary' as const
    },
    {
      label: 'Share Booking',
      icon: Share2,
      action: onShareBooking,
      variant: 'secondary' as const
    }
  ];

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      {/* Success Header with Animation */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4 transition-all duration-1000 ${
          showAnimation ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}>
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <div className={`transition-all duration-1000 delay-300 ${
          showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful! 🎉
          </h1>
          <p className="text-lg text-gray-600">
            Your booking has been confirmed and you'll receive a confirmation email shortly.
          </p>
        </div>
      </div>

      {/* Booking Reference Card */}
      <div className={`bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 mb-6 transition-all duration-1000 delay-500 ${
        showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Booking Reference
          </h2>
          
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl font-bold text-blue-600 tracking-wider">
                {data.bookingReference}
              </span>
              <button
                onClick={() => copyToClipboard(data.bookingReference, 'booking')}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {copiedField === 'booking' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Keep this reference for your records
            </p>
          </div>

          <div className="text-sm text-gray-600">
            <div className="flex items-center justify-center space-x-4">
              <span>Transaction ID: {data.transactionId}</span>
              <button
                onClick={() => copyToClipboard(data.transactionId, 'transaction')}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {copiedField === 'transaction' ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 transition-all duration-1000 delay-700 ${
        showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
              action.variant === 'primary'
                ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <action.icon className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Payment Details */}
      <div className={`bg-white border border-gray-200 rounded-lg p-6 mb-6 transition-all duration-1000 delay-900 ${
        showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Payment Details
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Amount Paid:</span>
            <span className="font-semibold text-lg text-green-600">
              {formatCurrency(data.amount, data.currency)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Method:</span>
            <span className="font-medium">{data.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Date:</span>
            <span className="font-medium">
              {new Date(data.timestamp).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Booking Summary */}
      <div className={`bg-white border border-gray-200 rounded-lg p-6 mb-6 transition-all duration-1000 delay-1100 ${
        showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Booking Summary
        </h3>

        <div className="space-y-4">
          {/* Hotel Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">{data.hotel.name}</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{data.hotel.address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>{data.hotel.phone}</span>
              </div>
            </div>
          </div>

          {/* Stay Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Check-in</h5>
              <p className="text-gray-600">{formatDate(data.booking.checkIn)}</p>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Check-out</h5>
              <p className="text-gray-600">{formatDate(data.booking.checkOut)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Room Type</h5>
              <p className="text-gray-600">{data.booking.roomType}</p>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Guests</h5>
              <p className="text-gray-600">{data.booking.guests} guests</p>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Rooms</h5>
              <p className="text-gray-600">{data.booking.rooms} room(s)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className={`bg-white border border-gray-200 rounded-lg p-6 mb-6 transition-all duration-1000 delay-1300 ${
        showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Guest Information
        </h3>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{data.customer.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">{data.customer.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Phone:</span>
            <span className="font-medium">{data.customer.phone}</span>
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div className={`bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 transition-all duration-1000 delay-1500 ${
        showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Important Information
        </h3>

        <div className="space-y-2 text-sm text-blue-800">
          <p>• A confirmation email has been sent to {data.customer.email}</p>
          <p>• Please arrive at the hotel after 3:00 PM on your check-in date</p>
          <p>• Check-out time is before 11:00 AM</p>
          <p>• Please bring a valid ID and the credit card used for booking</p>
          <p>• Contact the hotel directly for any special requests or changes</p>
        </div>
      </div>

      {/* Next Steps */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-1000 delay-1700 ${
        showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        {onViewBooking && (
          <button
            onClick={onViewBooking}
            className="flex items-center justify-center space-x-2 py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>View Booking Details</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}

        {onBookAnother && (
          <button
            onClick={onBookAnother}
            className="flex items-center justify-center space-x-2 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span>Book Another Hotel</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
} 