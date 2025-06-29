'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { CreditCard, Lock, Eye, EyeOff, AlertCircle, CheckCircle, Calendar, User, MapPin } from 'lucide-react';

interface PaymentFormData {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  saveCard: boolean;
}

interface PaymentFormProps {
  paymentMethod: string;
  onSubmit: (data: PaymentFormData) => void;
  onCancel?: () => void;
  isProcessing?: boolean;
  errors?: Partial<Record<keyof PaymentFormData | 'general', string>>;
  className?: string;
}

export default function PaymentForm({
  paymentMethod,
  onSubmit,
  onCancel,
  isProcessing = false,
  errors = {},
  className = ''
}: PaymentFormProps) {
  const t = useTranslations();

  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    },
    saveCard: false
  });

  const [showCvv, setShowCvv] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isValidating, setIsValidating] = useState(false);

  // Card type detection
  const detectCardType = (number: string) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'visa';
    if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'mastercard';
    if (cleanNumber.startsWith('3')) return 'amex';
    return 'unknown';
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validateField = (name: string, value: string) => {
    const errors: Record<string, string> = {};

    switch (name) {
      case 'cardNumber':
        const cleanNumber = value.replace(/\s/g, '');
        if (!cleanNumber) {
          errors.cardNumber = 'Card number is required';
        } else if (cleanNumber.length < 13 || cleanNumber.length > 19) {
          errors.cardNumber = 'Invalid card number length';
        } else if (!/^\d+$/.test(cleanNumber)) {
          errors.cardNumber = 'Card number must contain only digits';
        }
        break;

      case 'cardholderName':
        if (!value.trim()) {
          errors.cardholderName = 'Cardholder name is required';
        } else if (value.trim().length < 2) {
          errors.cardholderName = 'Name is too short';
        }
        break;

      case 'expiryDate':
        if (!value) {
          errors.expiryDate = 'Expiry date is required';
        } else if (!/^\d{2}\/\d{2}$/.test(value)) {
          errors.expiryDate = 'Invalid format (MM/YY)';
        } else {
          const [month, year] = value.split('/');
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear() % 100;
          const currentMonth = currentDate.getMonth() + 1;
          
          if (parseInt(month) < 1 || parseInt(month) > 12) {
            errors.expiryDate = 'Invalid month';
          } else if (parseInt(year) < currentYear || 
                    (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
            errors.expiryDate = 'Card has expired';
          }
        }
        break;

      case 'cvv':
        if (!value) {
          errors.cvv = 'CVV is required';
        } else if (!/^\d{3,4}$/.test(value)) {
          errors.cvv = 'CVV must be 3-4 digits';
        }
        break;
    }

    return errors;
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;

    // Format specific fields
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    } else if (field === 'cardholderName') {
      formattedValue = value.toUpperCase();
    }

    if (field.startsWith('billingAddress.')) {
      const addressField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [addressField]: formattedValue
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: formattedValue
      }));
    }

    // Validate field
    const fieldErrors = validateField(field, formattedValue);
    setValidationErrors(prev => ({
      ...prev,
      ...fieldErrors,
      [field]: fieldErrors[field] || ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);

    // Validate all fields
    const allErrors = {
      ...validateField('cardNumber', formData.cardNumber),
      ...validateField('cardholderName', formData.cardholderName),
      ...validateField('expiryDate', formData.expiryDate),
      ...validateField('cvv', formData.cvv)
    };

    setValidationErrors(allErrors);

    if (Object.keys(allErrors).filter(key => allErrors[key]).length === 0) {
      onSubmit(formData);
    }

    setIsValidating(false);
  };

  const cardType = detectCardType(formData.cardNumber);

  return (
    <div className={`max-w-md mx-auto ${className}`}>
      {/* Payment Method Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <CreditCard className="w-6 h-6" />
          <div>
            <h3 className="font-semibold">Payment Information</h3>
            <p className="text-sm opacity-90">Paying with {paymentMethod}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-b-lg p-6 space-y-6">
        {/* General Error */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-sm text-red-700">{errors.general}</span>
          </div>
        )}

        {/* Card Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Number *
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                validationErrors.cardNumber ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            
            {/* Card Type Icon */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {cardType === 'visa' && (
                <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-bold">VISA</div>
              )}
              {cardType === 'mastercard' && (
                <div className="bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">MC</div>
              )}
              {cardType === 'amex' && (
                <div className="bg-green-600 text-white text-xs px-2 py-1 rounded font-bold">AMEX</div>
              )}
            </div>
          </div>
          {validationErrors.cardNumber && (
            <p className="text-sm text-red-600 mt-1">{validationErrors.cardNumber}</p>
          )}
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cardholder Name *
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.cardholderName}
              onChange={(e) => handleInputChange('cardholderName', e.target.value)}
              placeholder="JOHN DOE"
              className={`w-full pl-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                validationErrors.cardholderName ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          {validationErrors.cardholderName && (
            <p className="text-sm text-red-600 mt-1">{validationErrors.cardholderName}</p>
          )}
        </div>

        {/* Expiry Date & CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date *
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                placeholder="MM/YY"
                maxLength={5}
                className={`w-full pl-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  validationErrors.expiryDate ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            {validationErrors.expiryDate && (
              <p className="text-sm text-red-600 mt-1">{validationErrors.expiryDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV *
            </label>
            <div className="relative">
              <input
                type={showCvv ? 'text' : 'password'}
                value={formData.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value)}
                placeholder="123"
                maxLength={4}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  validationErrors.cvv ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <button
                type="button"
                onClick={() => setShowCvv(!showCvv)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCvv ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {validationErrors.cvv && (
              <p className="text-sm text-red-600 mt-1">{validationErrors.cvv}</p>
            )}
          </div>
        </div>

        {/* Billing Address */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Billing Address</span>
          </h4>

          <div>
            <input
              type="text"
              value={formData.billingAddress.street}
              onChange={(e) => handleInputChange('billingAddress.street', e.target.value)}
              placeholder="Street Address"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={formData.billingAddress.city}
              onChange={(e) => handleInputChange('billingAddress.city', e.target.value)}
              placeholder="City"
              className="py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              value={formData.billingAddress.state}
              onChange={(e) => handleInputChange('billingAddress.state', e.target.value)}
              placeholder="State"
              className="py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={formData.billingAddress.zipCode}
              onChange={(e) => handleInputChange('billingAddress.zipCode', e.target.value)}
              placeholder="ZIP Code"
              className="py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <select
              value={formData.billingAddress.country}
              onChange={(e) => handleInputChange('billingAddress.country', e.target.value)}
              className="py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="VN">Vietnam</option>
            </select>
          </div>
        </div>

        {/* Save Card Checkbox */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="saveCard"
            checked={formData.saveCard}
            onChange={(e) => setFormData(prev => ({ ...prev, saveCard: e.target.checked }))}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="saveCard" className="text-sm text-gray-700">
            Save this card for future payments
          </label>
        </div>

        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-700">
              Your payment information is encrypted and secure
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isProcessing}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isProcessing || isValidating}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                <span>Complete Payment</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 