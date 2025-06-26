'use client';

import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { Globe, DollarSign, ChevronDown, Check } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate?: number;
}

interface LanguageCurrencySelectorProps {
  currentLanguage: string;
  currentCurrency: string;
  languages: Language[];
  currencies: Currency[];
  onLanguageChange?: (language: string) => void;
  onCurrencyChange?: (currency: string) => void;
  compact?: boolean;
}

export default function LanguageCurrencySelector({
  currentLanguage,
  currentCurrency,
  languages,
  currencies,
  onLanguageChange,
  onCurrencyChange,
  compact = false
}: LanguageCurrencySelectorProps) {
  const t = useTranslations('settings');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  
  const languageRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find(lang => lang.code === currentLanguage);
  const currentCurr = currencies.find(curr => curr.code === currentCurrency);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setShowCurrencyDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (languageCode: string) => {
    onLanguageChange?.(languageCode);
    setShowLanguageDropdown(false);
  };

  const handleCurrencySelect = (currencyCode: string) => {
    onCurrencyChange?.(currencyCode);
    setShowCurrencyDropdown(false);
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {/* Compact Language Selector */}
        <div className="relative" ref={languageRef}>
          <button
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="flex items-center gap-1 px-2 py-1 text-sm hover:bg-gray-100 rounded transition-colors"
            aria-label={t('selectLanguage')}
          >
            <span className="text-lg">{currentLang?.flag}</span>
            <span className="text-xs font-medium uppercase">{currentLang?.code}</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {showLanguageDropdown && (
            <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48 max-h-48 overflow-y-auto">
              <div className="py-2">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language.code)}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg">{language.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{language.name}</div>
                      <div className="text-xs text-gray-500">{language.nativeName}</div>
                    </div>
                    {language.code === currentLanguage && (
                      <Check className="w-4 h-4 text-primary-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Compact Currency Selector */}
        <div className="relative" ref={currencyRef}>
          <button
            onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
            className="flex items-center gap-1 px-2 py-1 text-sm hover:bg-gray-100 rounded transition-colors"
            aria-label={t('selectCurrency')}
          >
            <span className="font-medium">{currentCurr?.symbol}</span>
            <span className="text-xs font-medium uppercase">{currentCurr?.code}</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {showCurrencyDropdown && (
            <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48 max-h-48 overflow-y-auto">
              <div className="py-2">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => handleCurrencySelect(currency.code)}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-mono">{currency.symbol}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{currency.code}</div>
                      <div className="text-xs text-gray-500">{currency.name}</div>
                    </div>
                    {currency.rate && (
                      <div className="text-xs text-gray-400">
                        {currency.rate.toFixed(2)}
                      </div>
                    )}
                    {currency.code === currentCurrency && (
                      <Check className="w-4 h-4 text-primary-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Language Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <Globe className="w-4 h-4 inline mr-2" />
          {t('language')}
        </label>
        
        <div className="relative" ref={languageRef}>
          <button
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:border-primary-500 focus:outline-none focus:border-primary-500 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{currentLang?.flag}</span>
              <div>
                <div className="font-medium text-gray-900">{currentLang?.name}</div>
                <div className="text-sm text-gray-500">{currentLang?.nativeName}</div>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showLanguageDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
              <div className="py-2">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language.code)}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                      language.code === currentLanguage ? 'bg-primary-50 text-primary-700' : 'text-gray-900'
                    }`}
                  >
                    <span className="text-2xl">{language.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{language.name}</div>
                      <div className="text-sm text-gray-500">{language.nativeName}</div>
                    </div>
                    {language.code === currentLanguage && (
                      <Check className="w-5 h-5 text-primary-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="mt-2 text-xs text-gray-600">
          {t('languageDescription')}
        </p>
      </div>

      {/* Currency Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <DollarSign className="w-4 h-4 inline mr-2" />
          {t('currency')}
        </label>
        
        <div className="relative" ref={currencyRef}>
          <button
            onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
            className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:border-primary-500 focus:outline-none focus:border-primary-500 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl font-mono">{currentCurr?.symbol}</span>
              <div>
                <div className="font-medium text-gray-900">{currentCurr?.code}</div>
                <div className="text-sm text-gray-500">{currentCurr?.name}</div>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showCurrencyDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
              <div className="py-2">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => handleCurrencySelect(currency.code)}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                      currency.code === currentCurrency ? 'bg-primary-50 text-primary-700' : 'text-gray-900'
                    }`}
                  >
                    <span className="text-2xl font-mono">{currency.symbol}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{currency.code}</div>
                      <div className="text-sm text-gray-500">{currency.name}</div>
                    </div>
                    <div className="text-right">
                      {currency.rate && (
                        <div className="text-sm text-gray-500">
                          1 USD = {currency.rate.toFixed(2)} {currency.code}
                        </div>
                      )}
                      {currency.code === currentCurrency && (
                        <Check className="w-5 h-5 text-primary-600 mt-1" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="mt-2 text-xs text-gray-600">
          {t('currencyDescription')}
        </p>
      </div>
    </div>
  );
} 