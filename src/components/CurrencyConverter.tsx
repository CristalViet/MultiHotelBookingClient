'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { ArrowLeftRight, TrendingUp, TrendingDown, RefreshCw, Globe, Clock } from 'lucide-react';

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rate: number; // Rate to USD
}

interface CurrencyConverterProps {
  baseAmount: number;
  baseCurrency?: string;
  showPopularCurrencies?: boolean;
  showTrendIndicator?: boolean;
  onCurrencyChange?: (currency: string, convertedAmount: number) => void;
  className?: string;
}

export default function CurrencyConverter({
  baseAmount,
  baseCurrency = 'USD',
  showPopularCurrencies = true,
  showTrendIndicator = true,
  onCurrencyChange,
  className = ''
}: CurrencyConverterProps) {
  const t = useTranslations();

  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock exchange rates (in real app, fetch from API)
  const currencies: Currency[] = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', rate: 1.0 },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', rate: 0.85 },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', rate: 0.73 },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', rate: 110.0 },
    { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳', rate: 23000.0 },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', rate: 6.5 },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷', rate: 1200.0 },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', rate: 1.35 },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', rate: 1.25 },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭', rate: 0.92 },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', rate: 1.35 },
    { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭', rate: 33.0 }
  ];

  const popularCurrencies = ['USD', 'EUR', 'GBP', 'VND', 'CNY', 'JPY'];

  // Mock rate trends (positive = up, negative = down)
  const rateTrends: Record<string, number> = {
    USD: 0,
    EUR: -0.5,
    GBP: 0.8,
    JPY: -1.2,
    VND: 0.1,
    CNY: 0.3,
    KRW: -0.7,
    AUD: 1.1,
    CAD: 0.4,
    CHF: -0.2,
    SGD: 0.6,
    THB: -0.3
  };

  const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string) => {
    const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1;
    const toRate = currencies.find(c => c.code === toCurrency)?.rate || 1;
    
    // Convert to USD first, then to target currency
    const usdAmount = amount / fromRate;
    const convertedAmount = usdAmount * toRate;
    
    return convertedAmount;
  };

  const formatCurrency = (amount: number, currencyCode: string) => {
    const currency = currencies.find(c => c.code === currencyCode);
    if (!currency) return amount.toFixed(2);

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: currencyCode === 'JPY' || currencyCode === 'VND' || currencyCode === 'KRW' ? 0 : 2,
      maximumFractionDigits: currencyCode === 'JPY' || currencyCode === 'VND' || currencyCode === 'KRW' ? 0 : 2
    });

    return formatter.format(amount);
  };

  const handleCurrencyChange = (currencyCode: string) => {
    setSelectedCurrency(currencyCode);
    const convertedAmount = convertCurrency(baseAmount, baseCurrency, currencyCode);
    onCurrencyChange?.(currencyCode, convertedAmount);
  };

  const refreshRates = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  const convertedAmount = convertCurrency(baseAmount, baseCurrency, selectedCurrency);
  const selectedCurrencyData = currencies.find(c => c.code === selectedCurrency);

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Globe className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Currency Converter</h3>
            <p className="text-sm text-gray-500">Real-time exchange rates</p>
          </div>
        </div>

        <button
          onClick={refreshRates}
          disabled={isRefreshing}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Main Conversion */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          {/* Base Amount */}
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">From ({baseCurrency})</div>
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(baseAmount, baseCurrency)}
            </div>
          </div>

          {/* Arrow */}
          <div className="mx-4">
            <ArrowLeftRight className="w-6 h-6 text-gray-400" />
          </div>

          {/* Converted Amount */}
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">To ({selectedCurrency})</div>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(convertedAmount, selectedCurrency)}
            </div>
            {showTrendIndicator && selectedCurrency !== baseCurrency && (
              <div className="flex items-center justify-center mt-1">
                {rateTrends[selectedCurrency] > 0 ? (
                  <div className="flex items-center text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>+{Math.abs(rateTrends[selectedCurrency])}%</span>
                  </div>
                ) : rateTrends[selectedCurrency] < 0 ? (
                  <div className="flex items-center text-red-600 text-sm">
                    <TrendingDown className="w-4 h-4 mr-1" />
                    <span>-{Math.abs(rateTrends[selectedCurrency])}%</span>
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm">No change</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popular Currencies Quick Select */}
      {showPopularCurrencies && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Popular Currencies</h4>
          <div className="grid grid-cols-3 gap-2">
            {popularCurrencies.map((currencyCode) => {
              const currency = currencies.find(c => c.code === currencyCode);
              if (!currency) return null;

              const isSelected = selectedCurrency === currencyCode;
              const amount = convertCurrency(baseAmount, baseCurrency, currencyCode);

              return (
                <button
                  key={currencyCode}
                  onClick={() => handleCurrencyChange(currencyCode)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{currency.flag}</span>
                    <span className="font-medium text-sm">{currency.code}</span>
                  </div>
                  <div className="text-xs text-gray-600 truncate">
                    {formatCurrency(amount, currencyCode)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* All Currencies Dropdown */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Currency
        </label>
        <select
          value={selectedCurrency}
          onChange={(e) => handleCurrencyChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.flag} {currency.code} - {currency.name}
            </option>
          ))}
        </select>
      </div>

      {/* Exchange Rate Info */}
      {selectedCurrency !== baseCurrency && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Exchange Rate</span>
            <span className="font-medium">
              1 {baseCurrency} = {(convertCurrency(1, baseCurrency, selectedCurrency)).toFixed(4)} {selectedCurrency}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-gray-600">Inverse Rate</span>
            <span className="font-medium">
              1 {selectedCurrency} = {(convertCurrency(1, selectedCurrency, baseCurrency)).toFixed(4)} {baseCurrency}
            </span>
          </div>
        </div>
      )}

      {/* Conversion Breakdown */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Base Amount:</span>
          <span className="font-medium">{formatCurrency(baseAmount, baseCurrency)}</span>
        </div>
        {selectedCurrency !== baseCurrency && (
          <>
            <div className="flex justify-between">
              <span className="text-gray-600">Exchange Rate:</span>
              <span className="font-medium">
                {(convertCurrency(1, baseCurrency, selectedCurrency)).toFixed(4)}
              </span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total Amount:</span>
              <span className="text-blue-600">{formatCurrency(convertedAmount, selectedCurrency)}</span>
            </div>
          </>
        )}
      </div>

      {/* Last Updated */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center text-xs text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-xs text-yellow-800">
          <strong>Disclaimer:</strong> Exchange rates are for reference only. 
          Final rates may vary and will be confirmed at the time of payment.
        </p>
      </div>
    </div>
  );
} 