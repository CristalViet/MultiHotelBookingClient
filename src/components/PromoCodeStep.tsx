'use client';

import { useState } from 'react';
import { Tag, Gift, CheckCircle, AlertCircle, Percent, Clock } from 'lucide-react';

interface PromoCode {
  code: string;
  type: 'percentage' | 'fixed' | 'freeNight';
  value: number;
  description: string;
  minAmount?: number;
  maxDiscount?: number;
  validUntil?: string;
  isValid: boolean;
}

interface PromoCodeStepProps {
  subtotal: number;
  originalTotal: number;
  defaultPromoCode?: string;
  onNext: (data: {
    promoCode?: string;
    discount: number;
    finalTotal: number;
  }) => void;
  onBack?: () => void;
}

export default function PromoCodeStep({
  subtotal,
  originalTotal,
  defaultPromoCode = '',
  onNext,
  onBack
}: PromoCodeStepProps) {
  const [promoCode, setPromoCode] = useState(defaultPromoCode);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock promo codes for demo
  const mockPromoCodes: Record<string, PromoCode> = {
    'SUMMER2024': {
      code: 'SUMMER2024',
      type: 'percentage',
      value: 15,
      description: 'Giảm 15% cho booking mùa hè',
      maxDiscount: 500000,
      validUntil: '2024-08-31',
      isValid: true
    },
    'WELCOME20': {
      code: 'WELCOME20',
      type: 'percentage',
      value: 20,
      description: 'Giảm 20% cho khách hàng mới',
      minAmount: 1000000,
      maxDiscount: 800000,
      validUntil: '2024-12-31',
      isValid: true
    },
    'FREENIGHT': {
      code: 'FREENIGHT',
      type: 'freeNight',
      value: 1,
      description: 'Miễn phí 1 đêm cho booking từ 3 đêm',
      minAmount: 1500000,
      validUntil: '2024-12-31',
      isValid: true
    },
    'SAVE100K': {
      code: 'SAVE100K',
      type: 'fixed',
      value: 100000,
      description: 'Giảm ngay 100,000 VNĐ',
      minAmount: 500000,
      validUntil: '2024-12-31',
      isValid: true
    },
    'EXPIRED': {
      code: 'EXPIRED',
      type: 'percentage',
      value: 25,
      description: 'Mã đã hết hạn',
      validUntil: '2024-01-01',
      isValid: false
    }
  };

  const validatePromoCode = (code: string): PromoCode | null => {
    const upperCode = code.toUpperCase().trim();
    const promo = mockPromoCodes[upperCode];
    
    if (!promo) {
      return null;
    }

    if (!promo.isValid) {
      return { ...promo, isValid: false };
    }

    // Check minimum amount
    if (promo.minAmount && subtotal < promo.minAmount) {
      return { ...promo, isValid: false };
    }

    // Check expiry date
    if (promo.validUntil && new Date(promo.validUntil) < new Date()) {
      return { ...promo, isValid: false };
    }

    return promo;
  };

  const calculateDiscount = (promo: PromoCode): number => {
    if (!promo.isValid) return 0;

    switch (promo.type) {
      case 'percentage':
        const percentageDiscount = (subtotal * promo.value) / 100;
        return promo.maxDiscount 
          ? Math.min(percentageDiscount, promo.maxDiscount)
          : percentageDiscount;
      
      case 'fixed':
        return promo.value;
      
      case 'freeNight':
        // Assume one night equals the room price
        const roomPrice = subtotal / 3; // Assuming 3 nights for demo
        return roomPrice * promo.value;
      
      default:
        return 0;
    }
  };

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      setError('Vui lòng nhập mã ưu đãi');
      return;
    }

    setIsValidating(true);
    setError(null);

    // Simulate API call delay
    setTimeout(() => {
      const validatedPromo = validatePromoCode(promoCode);
      
      if (!validatedPromo) {
        setError('Mã ưu đãi không tồn tại');
        setAppliedPromo(null);
      } else if (!validatedPromo.isValid) {
        if (validatedPromo.validUntil && new Date(validatedPromo.validUntil) < new Date()) {
          setError('Mã ưu đãi đã hết hạn');
        } else if (validatedPromo.minAmount && subtotal < validatedPromo.minAmount) {
          setError(`Đơn hàng tối thiểu ${formatPrice(validatedPromo.minAmount)} để sử dụng mã này`);
        } else {
          setError('Mã ưu đãi không hợp lệ');
        }
        setAppliedPromo(null);
      } else {
        setAppliedPromo(validatedPromo);
        setError(null);
      }
      
      setIsValidating(false);
    }, 1000);
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setError(null);
  };

  const discount = appliedPromo ? calculateDiscount(appliedPromo) : 0;
  const finalTotal = originalTotal - discount;

  const handleNext = () => {
    onNext({
      promoCode: appliedPromo?.code,
      discount,
      finalTotal
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDiscountText = (promo: PromoCode) => {
    switch (promo.type) {
      case 'percentage':
        return `Giảm ${promo.value}%${promo.maxDiscount ? ` (tối đa ${formatPrice(promo.maxDiscount)})` : ''}`;
      case 'fixed':
        return `Giảm ${formatPrice(promo.value)}`;
      case 'freeNight':
        return `Miễn phí ${promo.value} đêm`;
      default:
        return '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6">
          <h1 className="text-2xl font-bold mb-2">Mã ưu đãi</h1>
          <p className="opacity-90">Bước 3 của 4: Áp dụng mã giảm giá (nếu có)</p>
        </div>

        <div className="p-8">
          {/* Promo Code Input */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Gift className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-bold text-gray-900">Nhập mã ưu đãi</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Nhập mã ưu đãi (VD: SUMMER2024)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-center font-mono text-lg tracking-wider uppercase"
                      disabled={isValidating || !!appliedPromo}
                    />
                  </div>
                  
                  <button
                    onClick={appliedPromo ? handleRemovePromo : handleApplyPromo}
                    disabled={isValidating || (!promoCode.trim() && !appliedPromo)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 min-w-[120px] ${
                      appliedPromo
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-orange-600 text-white hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                  >
                    {isValidating ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Checking...
                      </div>
                    ) : appliedPromo ? (
                      'Hủy mã'
                    ) : (
                      'Áp dụng'
                    )}
                  </button>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                )}

                {/* Applied Promo Success */}
                {appliedPromo && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Tag className="w-4 h-4 text-green-600" />
                          <span className="font-bold text-green-800">{appliedPromo.code}</span>
                        </div>
                        <p className="text-green-700 mb-2">{appliedPromo.description}</p>
                        <div className="flex items-center gap-4 text-sm text-green-600">
                          <div className="flex items-center gap-1">
                            <Percent className="w-4 h-4" />
                            <span>{formatDiscountText(appliedPromo)}</span>
                          </div>
                          {appliedPromo.validUntil && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>Hết hạn: {new Date(appliedPromo.validUntil).toLocaleDateString('vi-VN')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Available Promo Codes for Demo */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mã ưu đãi có sẵn (Demo)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.values(mockPromoCodes)
                  .filter(promo => promo.isValid)
                  .slice(0, 4)
                  .map((promo) => (
                    <div
                      key={promo.code}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors cursor-pointer"
                      onClick={() => {
                        if (!appliedPromo) {
                          setPromoCode(promo.code);
                        }
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Tag className="w-4 h-4 text-orange-600" />
                        <span className="font-mono font-bold text-orange-600">{promo.code}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{promo.description}</p>
                      <div className="text-xs text-gray-500">
                        {promo.minAmount && `Tối thiểu: ${formatPrice(promo.minAmount)} • `}
                        Hết hạn: {promo.validUntil ? new Date(promo.validUntil).toLocaleDateString('vi-VN') : 'Không giới hạn'}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tóm tắt giá</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Thuế & phí</span>
                  <span>{formatPrice(originalTotal - subtotal)}</span>
                </div>
                {appliedPromo && discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      Giảm giá ({appliedPromo.code})
                    </span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <hr className="border-gray-200" />
                <div className="flex justify-between text-xl font-bold">
                  <span>Tổng cộng</span>
                  <span className={appliedPromo ? 'text-green-600' : 'text-gray-900'}>
                    {formatPrice(finalTotal)}
                  </span>
                </div>
                {appliedPromo && discount > 0 && (
                  <p className="text-sm text-green-600 font-medium">
                    Bạn đã tiết kiệm {formatPrice(discount)}!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
            {onBack && (
              <button
                onClick={onBack}
                className="sm:flex-1 border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                ← Quay lại thông tin khách
              </button>
            )}
            
            <button
              onClick={handleNext}
              className="sm:flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            >
              Tiếp tục → Phương thức thanh toán
            </button>
          </div>

          {/* Skip Option */}
          <div className="text-center mt-4">
            <button
              onClick={handleNext}
              className="text-gray-500 hover:text-gray-700 text-sm underline"
            >
              Bỏ qua bước này (không sử dụng mã ưu đãi)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 