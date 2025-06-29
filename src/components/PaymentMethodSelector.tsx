'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { CreditCard, Smartphone, Wallet, Building2, QrCode, CheckCircle } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  fees?: string;
  processingTime: string;
  popular?: boolean;
  enabled: boolean;
  badges?: string[];
}

interface PaymentMethodSelectorProps {
  selectedMethod?: string;
  onMethodChange: (methodId: string) => void;
  showFees?: boolean;
  showProcessingTime?: boolean;
  allowedMethods?: string[];
  className?: string;
}

export default function PaymentMethodSelector({
  selectedMethod,
  onMethodChange,
  showFees = true,
  showProcessingTime = true,
  allowedMethods,
  className = ''
}: PaymentMethodSelectorProps) {
  const t = useTranslations();

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'credit-card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: <CreditCard className="w-6 h-6" />,
      fees: 'No extra fees',
      processingTime: 'Instant',
      popular: true,
      enabled: true,
      badges: ['Secure', 'Instant']
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icon: (
        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">PP</span>
        </div>
      ),
      fees: 'No extra fees',
      processingTime: 'Instant',
      enabled: true,
      badges: ['Buyer Protection']
    },
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      description: 'Touch ID or Face ID',
      icon: <Smartphone className="w-6 h-6" />,
      fees: 'No extra fees',
      processingTime: 'Instant',
      enabled: true,
      badges: ['Secure', 'Fast']
    },
    {
      id: 'google-pay',
      name: 'Google Pay',
      description: 'Pay with Google',
      icon: (
        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">G</span>
        </div>
      ),
      fees: 'No extra fees',
      processingTime: 'Instant',
      enabled: true,
      badges: ['Secure']
    },
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      description: 'Direct bank transfer',
      icon: <Building2 className="w-6 h-6" />,
      fees: 'May apply',
      processingTime: '1-3 business days',
      enabled: true,
      badges: ['Bank Level Security']
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      description: 'Bitcoin, Ethereum, USDT',
      icon: (
        <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">₿</span>
        </div>
      ),
      fees: 'Network fees apply',
      processingTime: '10-60 minutes',
      enabled: false, // Disabled for demo
      badges: ['Decentralized']
    },
    {
      id: 'qr-payment',
      name: 'QR Payment',
      description: 'Scan to pay',
      icon: <QrCode className="w-6 h-6" />,
      fees: 'No extra fees',
      processingTime: 'Instant',
      enabled: true,
      badges: ['Mobile Friendly']
    },
    {
      id: 'digital-wallet',
      name: 'Digital Wallet',
      description: 'Skrill, Neteller, etc.',
      icon: <Wallet className="w-6 h-6" />,
      fees: '2.5% fee',
      processingTime: 'Instant',
      enabled: true,
      badges: ['E-wallet']
    }
  ];

  // Filter methods based on allowedMethods prop
  const availableMethods = allowedMethods 
    ? paymentMethods.filter(method => allowedMethods.includes(method.id))
    : paymentMethods;

  const handleMethodSelect = (methodId: string, enabled: boolean) => {
    if (enabled) {
      onMethodChange(methodId);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
        <span className="text-sm text-gray-500">Choose your preferred payment option</span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {availableMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => handleMethodSelect(method.id, method.enabled)}
            className={`relative p-4 border-2 rounded-lg transition-all duration-200 cursor-pointer ${
              method.enabled 
                ? selectedMethod === method.id
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
            }`}
          >
            {/* Popular Badge */}
            {method.popular && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                Popular
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Payment Method Icon */}
                <div className={`p-2 rounded-lg ${
                  selectedMethod === method.id ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <div className={
                    selectedMethod === method.id ? 'text-blue-600' : 'text-gray-600'
                  }>
                    {method.icon}
                  </div>
                </div>

                {/* Payment Method Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{method.name}</h4>
                    {!method.enabled && (
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                  
                  {/* Additional Info */}
                  <div className="flex items-center space-x-4 mt-2">
                    {showFees && (
                      <span className="text-xs text-gray-500">
                        💳 {method.fees}
                      </span>
                    )}
                    {showProcessingTime && (
                      <span className="text-xs text-gray-500">
                        ⏱️ {method.processingTime}
                      </span>
                    )}
                  </div>

                  {/* Badges */}
                  {method.badges && method.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {method.badges.map((badge, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Selection Indicator */}
              <div className="flex items-center">
                {selectedMethod === method.id ? (
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                ) : (
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Notice */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-1">Secure Payment</h4>
            <p className="text-sm text-gray-600">
              All payments are processed securely with industry-standard encryption. 
              Your payment information is never stored on our servers.
            </p>
          </div>
        </div>
      </div>

      {/* Selected Method Summary */}
      {selectedMethod && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="text-blue-600">
              {availableMethods.find(m => m.id === selectedMethod)?.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-blue-900">
                Selected: {availableMethods.find(m => m.id === selectedMethod)?.name}
              </p>
              <p className="text-xs text-blue-700">
                You will be redirected to complete your payment securely
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 