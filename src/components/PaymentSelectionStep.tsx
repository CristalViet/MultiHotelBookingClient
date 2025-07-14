'use client';

import { useState } from 'react';
import { CreditCard, Clock, Shield, CheckCircle, AlertCircle, Smartphone, QrCode } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  processingTime: string;
  fee?: number;
  isRecommended?: boolean;
  features: string[];
  requirements?: string[];
}

interface PaymentSelectionStepProps {
  finalTotal: number;
  onNext: (paymentMethod: string) => void;
  onBack?: () => void;
}

export default function PaymentSelectionStep({
  finalTotal,
  onNext,
  onBack
}: PaymentSelectionStepProps) {
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [showPayLaterTerms, setShowPayLaterTerms] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'payos',
      name: 'Thanh toán online qua PayOS',
      description: 'Thanh toán ngay bằng thẻ ATM, Visa, MasterCard, QR Pay',
      icon: <CreditCard className="w-6 h-6" />,
      processingTime: 'Ngay lập tức',
      fee: 0,
      isRecommended: true,
      features: [
        'Xác nhận booking ngay lập tức',
        'Bảo mật SSL 256-bit',
        'Hỗ trợ tất cả loại thẻ ngân hàng',
        'QR Pay (MoMo, ZaloPay, VietQR)',
        'Hoàn tiền nhanh chóng nếu hủy'
      ],
      requirements: [
        'Thẻ ATM có chức năng thanh toán online',
        'Hoặc ví điện tử (MoMo, ZaloPay)',
        'Kết nối internet ổn định'
      ]
    },
    {
      id: 'pay-later',
      name: 'Thanh toán sau',
      description: 'Thanh toán tại resort khi nhận phòng',
      icon: <Clock className="w-6 h-6" />,
      processingTime: 'Khi nhận phòng',
      fee: 0,
      features: [
        'Thanh toán bằng tiền mặt hoặc thẻ',
        'Linh hoạt về thời gian',
        'Không cần thẻ ngân hàng online',
        'Có thể thương lượng giá trực tiếp'
      ],
      requirements: [
        'Đặt cọc 30% qua chuyển khoản',
        'Xác nhận trong 24h',
        'Mang CMND/CCCD khi nhận phòng',
        'Thanh toán đủ trước 18:00 ngày nhận phòng'
      ]
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handlePaymentSelect = (methodId: string) => {
    setSelectedPayment(methodId);
  };

  const handleNext = () => {
    if (!selectedPayment) {
      alert('Vui lòng chọn phương thức thanh toán');
      return;
    }

    onNext(selectedPayment);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6">
          <h1 className="text-2xl font-bold mb-2">Phương thức thanh toán</h1>
          <p className="opacity-90">Bước 4 của 4: Chọn cách thức thanh toán phù hợp</p>
        </div>

        <div className="p-8">
          {/* Payment Amount Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Tổng số tiền cần thanh toán</h2>
              <div className="text-3xl font-bold text-blue-600 mb-2">{formatPrice(finalTotal)}</div>
              <p className="text-sm text-gray-600">
                Bao gồm tất cả thuế, phí và ưu đãi (nếu có)
              </p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Chọn phương thức thanh toán</h3>
            
            <div className="grid gap-6">
              {paymentMethods.map((method) => (
                <div key={method.id} className="relative">
                  <div
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedPayment === method.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handlePaymentSelect(method.id)}
                  >
                    {/* Recommended Badge */}
                    {method.isRecommended && (
                      <div className="absolute -top-3 left-6">
                        <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Khuyến nghị
                        </span>
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      {/* Radio Button */}
                      <div className="mt-1">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedPayment === method.id
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                          }`}
                        >
                          {selectedPayment === method.id && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`p-2 rounded-lg ${
                            selectedPayment === method.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {method.icon}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{method.name}</h4>
                            <p className="text-gray-600">{method.description}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Features */}
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Ưu điểm:</h5>
                            <ul className="space-y-1">
                              {method.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Requirements */}
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Yêu cầu:</h5>
                            <ul className="space-y-1">
                              {method.requirements?.map((requirement, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                  <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                  <span>{requirement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">Xử lý: {method.processingTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-gray-600">
                                Phí: {method.fee ? formatPrice(method.fee) : 'Miễn phí'}
                              </span>
                            </div>
                          </div>

                          {/* PayOS Specific Icons */}
                          {method.id === 'payos' && (
                            <div className="flex items-center gap-2">
                              <Smartphone className="w-5 h-5 text-blue-500" />
                              <QrCode className="w-5 h-5 text-green-500" />
                              <Shield className="w-5 h-5 text-purple-500" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pay Later Terms Modal Trigger */}
          {selectedPayment === 'pay-later' && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-medium text-yellow-800 mb-1">Lưu ý về thanh toán sau:</h4>
                  <p className="text-yellow-700 text-sm mb-3">
                    Bạn cần đặt cọc 30% ({formatPrice(finalTotal * 0.3)}) qua chuyển khoản trong vòng 24h 
                    để giữ phòng. Số tiền còn lại sẽ thanh toán khi nhận phòng.
                  </p>
                  <button
                    onClick={() => setShowPayLaterTerms(!showPayLaterTerms)}
                    className="text-yellow-800 underline text-sm font-medium"
                  >
                    {showPayLaterTerms ? 'Ẩn' : 'Xem'} điều khoản chi tiết
                  </button>
                  
                  {showPayLaterTerms && (
                    <div className="mt-4 bg-white rounded-lg p-4 border border-yellow-200">
                      <h5 className="font-medium text-gray-900 mb-2">Điều khoản thanh toán sau:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Đặt cọc 30% trong vòng 24h qua chuyển khoản</li>
                        <li>• Thông tin TK: Ngân hàng Vietcombank - STK: 1234567890 - Chủ TK: Tuần Châu Resort</li>
                        <li>• Nội dung CK: [Mã booking] - [Họ tên khách]</li>
                        <li>• Thanh toán số tiền còn lại trước 18:00 ngày nhận phòng</li>
                        <li>• Mang CMND/CCCD và email xác nhận khi check-in</li>
                        <li>• Hủy phòng trước 24h: hoàn 100% tiền cọc</li>
                        <li>• Hủy trong vòng 24h hoặc no-show: mất 100% tiền cọc</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Bảo mật thanh toán</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>SSL 256-bit encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>PCI DSS compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>3D Secure authentication</span>
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
                ← Quay lại mã ưu đãi
              </button>
            )}
            
            <button
              onClick={handleNext}
              disabled={!selectedPayment}
              className="sm:flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {selectedPayment === 'payos' 
                ? 'Tiếp tục thanh toán PayOS →' 
                : selectedPayment === 'pay-later'
                ? 'Xác nhận đặt phòng (Thanh toán sau) →'
                : 'Tiếp tục →'
              }
            </button>
          </div>

          {/* Help */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Cần hỗ trợ? Liên hệ hotline: 
              <a href="tel:1900-93-88" className="text-primary-600 font-medium hover:underline ml-1">
                1900 93 88
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 