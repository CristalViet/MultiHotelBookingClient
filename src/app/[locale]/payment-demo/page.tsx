'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import PaymentMethodSelector from '@/components/PaymentMethodSelector';
import PaymentForm from '@/components/PaymentForm';
import CurrencyConverter from '@/components/CurrencyConverter';
import PaymentSuccess from '@/components/PaymentSuccess';
import TrustBadges from '@/components/TrustBadges';

export default function PaymentDemoPage() {
  const t = useTranslations();

  // State for PaymentMethodSelector
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit-card');

  // State for CurrencyConverter
  const [baseAmount] = useState(299.99);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(299.99);

  // State for demo navigation
  const [currentDemo, setCurrentDemo] = useState('payment-method');

  // Mock data for PaymentSuccess
  const mockSuccessData = {
    transactionId: 'TXN-2024-ABC123',
    bookingReference: 'HTL-CONF-456789',
    amount: convertedAmount,
    currency: selectedCurrency,
    paymentMethod: selectedPaymentMethod === 'credit-card' ? 'Credit Card' : 'PayPal',
    hotel: {
      name: 'Grand Hotel Paradise',
      address: '123 Luxury Ave, Miami Beach, FL 33139',
      phone: '+1 (555) 123-4567',
      email: 'info@grandhotelparadise.com'
    },
    booking: {
      checkIn: '2024-03-15',
      checkOut: '2024-03-18',
      guests: 2,
      rooms: 1,
      roomType: 'Deluxe Ocean View Suite'
    },
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 987-6543'
    },
    timestamp: new Date().toISOString()
  };

  const handlePaymentMethodChange = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
  };

  const handleCurrencyChange = (currency: string, amount: number) => {
    setSelectedCurrency(currency);
    setConvertedAmount(amount);
  };

  const handlePaymentSubmit = (data: any) => {
    console.log('Payment submitted:', data);
    alert('Payment form submitted! Check console for details.');
  };

  const demoSections = [
    { id: 'payment-method', label: '1. Payment Method Selector', component: 'PaymentMethodSelector' },
    { id: 'payment-form', label: '2. Payment Form', component: 'PaymentForm' },
    { id: 'currency-converter', label: '3. Currency Converter', component: 'CurrencyConverter' },
    { id: 'payment-success', label: '4. Payment Success', component: 'PaymentSuccess' },
    { id: 'trust-badges', label: '5. Trust Badges', component: 'TrustBadges' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🔴 Payment Components Demo
          </h1>
          <p className="text-lg text-gray-600">
            Test all 5 payment components with interactive examples
          </p>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              {demoSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setCurrentDemo(section.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentDemo === section.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Demo Content */}
        <div className="space-y-8">
          
          {/* PaymentMethodSelector Demo */}
          {currentDemo === 'payment-method' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  PaymentMethodSelector Component
                </h2>
                <p className="text-gray-600">
                  Choose from various payment methods with detailed information about fees and processing time.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <PaymentMethodSelector
                    selectedMethod={selectedPaymentMethod}
                    onMethodChange={handlePaymentMethodChange}
                    showFees={true}
                    showProcessingTime={true}
                  />
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Current Selection:</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Selected method: <span className="font-semibold">{selectedPaymentMethod}</span>
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 8 payment methods</li>
                        <li>• Processing time info</li>
                        <li>• Fee information</li>
                        <li>• Security badges</li>
                        <li>• Popular method highlighting</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Benefits:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Secure payment processing</li>
                        <li>• Multiple payment options</li>
                        <li>• Real-time fee calculation</li>
                        <li>• Instant payment confirmation</li>
                        <li>• 24/7 customer support</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PaymentForm Demo */}
          {currentDemo === 'payment-form' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  PaymentForm Component
                </h2>
                <p className="text-gray-600">
                  Secure payment form with real-time validation and card type detection.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex justify-center">
                  <PaymentForm
                    paymentMethod={selectedPaymentMethod === 'credit-card' ? 'Credit Card' : 'PayPal'}
                    onSubmit={handlePaymentSubmit}
                    isProcessing={false}
                  />
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Features:</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Real-time validation</li>
                        <li>• Card type detection</li>
                        <li>• Auto-formatting</li>
                        <li>• Billing address</li>
                        <li>• Security indicators</li>
                        <li>• Save card option</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Test Cards:</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div><strong>Visa:</strong> 4111 1111 1111 1111</div>
                        <div><strong>Mastercard:</strong> 5555 5555 5555 4444</div>
                        <div><strong>Amex:</strong> 3782 822463 10005</div>
                      </div>
                      
                      <h4 className="font-medium text-gray-900 mt-4 mb-2">CVV Examples:</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Visa/MC: 123</div>
                        <div>Amex: 1234</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CurrencyConverter Demo */}
          {currentDemo === 'currency-converter' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  CurrencyConverter Component
                </h2>
                <p className="text-gray-600">
                  Convert prices between different currencies with real-time rates and trends.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <CurrencyConverter
                    baseAmount={baseAmount}
                    baseCurrency="USD"
                    showPopularCurrencies={true}
                    showTrendIndicator={true}
                    onCurrencyChange={handleCurrencyChange}
                  />
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-center mb-4">
                    <h3 className="font-medium text-gray-900 mb-2">Current Conversion:</h3>
                    <p className="text-lg font-semibold text-blue-600">
                      {baseAmount} USD = {convertedAmount.toFixed(2)} {selectedCurrency}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 12 supported currencies</li>
                        <li>• Real-time rate trends</li>
                        <li>• Popular currency shortcuts</li>
                        <li>• Rate refresh functionality</li>
                        <li>• Exchange rate breakdown</li>
                        <li>• Rate disclaimers</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Supported Currencies:</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>🇺🇸 USD - US Dollar</div>
                        <div>🇪🇺 EUR - Euro</div>
                        <div>🇬🇧 GBP - British Pound</div>
                        <div>🇻🇳 VND - Vietnamese Dong</div>
                        <div>🇨🇳 CNY - Chinese Yuan</div>
                        <div>🇯🇵 JPY - Japanese Yen</div>
                        <div className="text-xs text-gray-500 mt-2">
                          + 6 more currencies available
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PaymentSuccess Demo */}
          {currentDemo === 'payment-success' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  PaymentSuccess Component
                </h2>
                <p className="text-gray-600">
                  Beautiful success page with animations and actionable next steps.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <PaymentSuccess
                    data={mockSuccessData}
                    onDownloadReceipt={() => alert('Download receipt clicked')}
                    onEmailReceipt={() => alert('Email receipt clicked')}
                    onPrintReceipt={() => alert('Print receipt clicked')}
                    onShareBooking={() => alert('Share booking clicked')}
                    onViewBooking={() => alert('View booking clicked')}
                    onBookAnother={() => alert('Book another clicked')}
                  />
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Features:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Animated entrance</li>
                    <li>• Copy booking reference</li>
                    <li>• Quick actions</li>
                    <li>• Complete booking details</li>
                    <li>• Important information</li>
                    <li>• Next steps guidance</li>
                  </ul>
                  
                  <h4 className="font-medium text-gray-900 mt-4 mb-2">Actions:</h4>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>• Download Receipt</div>
                    <div>• Email Receipt</div>
                    <div>• Print Receipt</div>
                    <div>• Share Booking</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TrustBadges Demo */}
          {currentDemo === 'trust-badges' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  TrustBadges Component
                </h2>
                <p className="text-gray-600">
                  Build customer confidence with security badges, certifications, and trust indicators.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <TrustBadges
                    layout="grid"
                    showDescription={true}
                    showVerifiedBadge={true}
                    size="medium"
                  />
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Features:</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 12 trust badges</li>
                        <li>• Multiple layouts</li>
                        <li>• Category filtering</li>
                        <li>• Trust statistics</li>
                        <li>• Security statements</li>
                        <li>• Payment method badges</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Categories:</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>🔒 Security (SSL, PCI, GDPR)</div>
                        <div>📋 Certifications (ISO, SOC)</div>
                        <div>🏆 Awards & Recognition</div>
                        <div>⭐ Customer Ratings</div>
                        <div>🛡️ Guarantees</div>
                      </div>
                      
                      <h4 className="font-medium text-gray-900 mt-4 mb-2">Trust Benefits:</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>• Builds customer confidence</div>
                        <div>• Increases conversion rates</div>
                        <div>• Reduces cart abandonment</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Usage Examples */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            📝 Usage Examples
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Integration Example:</h3>
              <pre className="bg-gray-100 rounded p-3 text-sm overflow-x-auto">
{`import PaymentMethodSelector from '@/components/PaymentMethodSelector';

function BookingPage() {
  const [method, setMethod] = useState('credit-card');
  
  return (
    <PaymentMethodSelector
      selectedMethod={method}
      onMethodChange={setMethod}
      showFees={true}
    />
  );
}`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Component Props:</h3>
              <div className="bg-gray-100 rounded p-3 text-sm">
                <div className="space-y-1">
                  <div><strong>PaymentMethodSelector:</strong> selectedMethod, onMethodChange, showFees</div>
                  <div><strong>PaymentForm:</strong> paymentMethod, onSubmit, isProcessing</div>
                  <div><strong>CurrencyConverter:</strong> baseAmount, baseCurrency, onCurrencyChange</div>
                  <div><strong>PaymentSuccess:</strong> data, onDownloadReceipt, onEmailReceipt</div>
                  <div><strong>TrustBadges:</strong> layout, showDescription, categories</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 