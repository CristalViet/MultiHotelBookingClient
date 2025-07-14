'use client';

import { useState } from 'react';
import { User, Mail, Phone, AlertCircle } from 'lucide-react';

interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

interface GuestInfoStepProps {
  defaultGuestInfo?: Partial<GuestInfo>;
  onNext: (guestInfo: GuestInfo) => void;
  onBack?: () => void;
}

export default function GuestInfoStep({
  defaultGuestInfo = {},
  onNext,
  onBack
}: GuestInfoStepProps) {
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    firstName: defaultGuestInfo.firstName || '',
    lastName: defaultGuestInfo.lastName || '',
    email: defaultGuestInfo.email || '',
    phone: defaultGuestInfo.phone || '',
    specialRequests: defaultGuestInfo.specialRequests || ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof GuestInfo, string>>>({});
  const [isValidating, setIsValidating] = useState(false);

  const validateField = (field: keyof GuestInfo, value: string): string | null => {
    switch (field) {
      case 'firstName':
        if (!value.trim()) return 'Họ là bắt buộc';
        if (value.trim().length < 2) return 'Họ phải có ít nhất 2 ký tự';
        return null;
      
      case 'lastName':
        if (!value.trim()) return 'Tên là bắt buộc';
        if (value.trim().length < 2) return 'Tên phải có ít nhất 2 ký tự';
        return null;
      
      case 'email':
        if (!value.trim()) return 'Email là bắt buộc';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Email không hợp lệ';
        return null;
      
      case 'phone':
        if (!value.trim()) return 'Số điện thoại là bắt buộc';
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) return 'Số điện thoại không hợp lệ';
        return null;
      
      default:
        return null;
    }
  };

  const handleInputChange = (field: keyof GuestInfo, value: string) => {
    setGuestInfo(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleInputBlur = (field: keyof GuestInfo) => {
    const error = validateField(field, guestInfo[field]);
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof GuestInfo, string>> = {};
    
    // Validate required fields
    const requiredFields: (keyof GuestInfo)[] = ['firstName', 'lastName', 'email', 'phone'];
    
    requiredFields.forEach(field => {
      const error = validateField(field, guestInfo[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    setIsValidating(true);
    
    if (validateForm()) {
      onNext(guestInfo);
    } else {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element?.focus();
      }
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const cleaned = value.replace(/\D/g, '');
    
    // Format as Vietnamese phone number
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    }
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '+$1 $2 $3 $4');
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    handleInputChange('phone', formatted);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6">
          <h1 className="text-2xl font-bold mb-2">Thông tin khách hàng</h1>
          <p className="opacity-90">Bước 2 của 4: Nhập thông tin liên hệ của bạn</p>
        </div>

        <div className="p-8">
          {/* Important Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-blue-800 font-medium mb-1">Lưu ý quan trọng:</p>
                <ul className="text-blue-700 space-y-1">
                  <li>• Thông tin này sẽ được sử dụng để xác nhận đặt phòng</li>
                  <li>• Email sẽ nhận được voucher và thông tin chi tiết</li>
                  <li>• Số điện thoại để liên hệ trong trường hợp cần thiết</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  Họ <span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={guestInfo.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  onBlur={() => handleInputBlur('firstName')}
                  placeholder="Nhập họ của bạn"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                    errors.firstName 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  Tên <span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={guestInfo.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  onBlur={() => handleInputBlur('lastName')}
                  placeholder="Nhập tên của bạn"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                    errors.lastName 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline w-4 h-4 mr-1" />
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={guestInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={() => handleInputBlur('email')}
                  placeholder="example@email.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                    errors.email 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Voucher và xác nhận booking sẽ được gửi qua email này
                </p>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline w-4 h-4 mr-1" />
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={guestInfo.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  onBlur={() => handleInputBlur('phone')}
                  placeholder="0912 345 678"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                    errors.phone 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Để liên hệ xác nhận và hỗ trợ trong trường hợp cần thiết
                </p>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">
                Yêu cầu đặc biệt (tùy chọn)
              </label>
              <textarea
                id="specialRequests"
                rows={4}
                value={guestInfo.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                placeholder="Ví dụ: Giường đôi, tầng cao, gần thang máy, ăn chay..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-gray-400 transition-colors resize-none"
              />
              <p className="mt-1 text-xs text-gray-500">
                Chúng tôi sẽ cố gắng đáp ứng yêu cầu của bạn tùy theo tình trạng phòng
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
            {onBack && (
              <button
                onClick={onBack}
                className="sm:flex-1 border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                ← Quay lại chọn phòng
              </button>
            )}
            
            <button
              onClick={handleNext}
              className="sm:flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Tiếp tục → Mã ưu đãi
            </button>
          </div>

          {/* Form Status */}
          {isValidating && Object.keys(errors).length > 0 && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-red-800 font-medium">Vui lòng kiểm tra lại thông tin:</p>
                  <ul className="text-red-700 text-sm mt-1 space-y-1">
                    {Object.entries(errors).map(([field, error]) => (
                      <li key={field}>• {error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 