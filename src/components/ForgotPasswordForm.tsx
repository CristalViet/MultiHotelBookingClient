'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => void;
  onBackToLogin: () => void;
  loading?: boolean;
  error?: string;
  success?: boolean;
}

export default function ForgotPasswordForm({
  onSubmit,
  onBackToLogin,
  loading = false,
  error,
  success = false
}: ForgotPasswordFormProps) {
  const t = useTranslations('auth');
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState<string>('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setValidationError(t('validation.emailRequired'));
      return;
    }
    
    if (!validateEmail(email)) {
      setValidationError(t('validation.emailInvalid'));
      return;
    }

    setValidationError('');
    onSubmit(email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (validationError) {
      setValidationError('');
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('forgotPassword.successTitle')}</h2>
          <p className="text-gray-600">{t('forgotPassword.successMessage')}</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Mail className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                {t('forgotPassword.checkEmail')}
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>{t('forgotPassword.emailSentTo')} <strong>{email}</strong></p>
                <p className="mt-1">{t('forgotPassword.checkSpam')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="w-full btn-primary"
          >
            {t('forgotPassword.resendEmail')}
          </button>
          
          <button
            type="button"
            onClick={onBackToLogin}
            className="w-full btn-secondary flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('forgotPassword.backToLogin')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('forgotPassword.title')}</h2>
        <p className="text-gray-600">{t('forgotPassword.subtitle')}</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {t('fields.email')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              className={`input-field pl-10 ${
                validationError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
              }`}
              placeholder={t('fields.emailPlaceholder')}
              disabled={loading}
            />
          </div>
          {validationError && (
            <p className="mt-1 text-sm text-red-600">{validationError}</p>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            {t('forgotPassword.instructions')}
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary flex items-center justify-center py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {t('forgotPassword.sending')}
            </>
          ) : (
            t('forgotPassword.sendResetLink')
          )}
        </button>
      </form>

      {/* Back to Login */}
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={onBackToLogin}
          className="inline-flex items-center text-sm text-primary-600 hover:text-primary-500 font-medium transition-colors"
          disabled={loading}
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          {t('forgotPassword.backToLogin')}
        </button>
      </div>

      {/* Alternative Actions */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            {t('forgotPassword.stillHaveProblems')}
          </p>
          <div className="space-y-2">
            <a
              href="#"
              className="block text-sm text-primary-600 hover:text-primary-500 font-medium transition-colors"
            >
              {t('forgotPassword.contactSupport')}
            </a>
            <a
              href="#"
              className="block text-sm text-primary-600 hover:text-primary-500 font-medium transition-colors"
            >
              {t('forgotPassword.createNewAccount')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 