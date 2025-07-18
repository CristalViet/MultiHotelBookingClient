'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, Check } from 'lucide-react';

interface RegisterFormProps {
  onSubmit: (name: string, email: string, password: string) => void;
  onSwitchToLogin: () => void;
  loading?: boolean;
  error?: string;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
}

export default function RegisterForm({
  onSubmit,
  onSwitchToLogin,
  loading = false,
  error
}: RegisterFormProps) {
  const t = useTranslations('auth');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
  };

  const validateForm = () => {
    const errors: ValidationErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = t('validation.nameRequired');
    } else if (formData.name.trim().length < 2) {
      errors.name = t('validation.nameTooShort');
    }

    // Email validation
    if (!formData.email) {
      errors.email = t('validation.emailRequired');
    } else if (!validateEmail(formData.email)) {
      errors.email = t('validation.emailInvalid');
    }

    // Password validation
    if (!formData.password) {
      errors.password = t('validation.passwordRequired');
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.minLength) {
        errors.password = t('validation.passwordMinLength');
      }
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = t('validation.confirmPasswordRequired');
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = t('validation.passwordsMismatch');
    }

    // Terms validation
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = t('validation.agreeToTermsRequired');
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData.name.trim(), formData.email, formData.password);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field as keyof ValidationErrors]) {
      setValidationErrors(prev => ({ ...prev, [field as keyof ValidationErrors]: undefined }));
    }
  };

  const passwordValidation = validatePassword(formData.password);

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('register.title')}</h2>
        <p className="text-gray-600">{t('register.subtitle')}</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            {t('fields.fullName')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`input-field pl-10 ${
                validationErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
              }`}
              placeholder={t('fields.fullNamePlaceholder')}
              disabled={loading}
            />
          </div>
          {validationErrors.name && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
          )}
        </div>

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
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`input-field pl-10 ${
                validationErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
              }`}
              placeholder={t('fields.emailPlaceholder')}
              disabled={loading}
            />
          </div>
          {validationErrors.email && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            {t('fields.password')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`input-field pl-10 pr-10 ${
                validationErrors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
              }`}
              placeholder={t('fields.passwordPlaceholder')}
              disabled={loading}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {validationErrors.password && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
          )}

          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="mt-3 space-y-2">
              <p className="text-sm text-gray-600">{t('register.passwordRequirements')}</p>
              <div className="space-y-1">
                <div className={`flex items-center text-xs ${passwordValidation.minLength ? 'text-green-600' : 'text-gray-400'}`}>
                  <Check className={`w-3 h-3 mr-1 ${passwordValidation.minLength ? 'text-green-600' : 'text-gray-300'}`} />
                  {t('register.minLength')}
                </div>
                <div className={`flex items-center text-xs ${passwordValidation.hasUppercase ? 'text-green-600' : 'text-gray-400'}`}>
                  <Check className={`w-3 h-3 mr-1 ${passwordValidation.hasUppercase ? 'text-green-600' : 'text-gray-300'}`} />
                  {t('register.hasUppercase')}
                </div>
                <div className={`flex items-center text-xs ${passwordValidation.hasLowercase ? 'text-green-600' : 'text-gray-400'}`}>
                  <Check className={`w-3 h-3 mr-1 ${passwordValidation.hasLowercase ? 'text-green-600' : 'text-gray-300'}`} />
                  {t('register.hasLowercase')}
                </div>
                <div className={`flex items-center text-xs ${passwordValidation.hasNumber ? 'text-green-600' : 'text-gray-400'}`}>
                  <Check className={`w-3 h-3 mr-1 ${passwordValidation.hasNumber ? 'text-green-600' : 'text-gray-300'}`} />
                  {t('register.hasNumber')}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            {t('fields.confirmPassword')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={`input-field pl-10 pr-10 ${
                validationErrors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
              }`}
              placeholder={t('fields.confirmPasswordPlaceholder')}
              disabled={loading}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={loading}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {validationErrors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                disabled={loading}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreeToTerms" className="text-gray-600">
                {t('register.agreeToTerms')}{' '}
                <a href="#" className="text-primary-600 hover:text-primary-500 font-medium">
                  {t('register.termsOfService')}
                </a>{' '}
                {t('register.and')}{' '}
                <a href="#" className="text-primary-600 hover:text-primary-500 font-medium">
                  {t('register.privacyPolicy')}
                </a>
              </label>
            </div>
          </div>
          {validationErrors.agreeToTerms && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.agreeToTerms}</p>
          )}
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
              {t('register.creatingAccount')}
            </>
          ) : (
            t('register.createAccount')
          )}
        </button>
      </form>

      {/* Social Register */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">{t('register.orSignUpWith')}</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="ml-2">Google</span>
          </button>

          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="ml-2">Facebook</span>
          </button>
        </div>
      </div>

      {/* Switch to Login */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {t('register.alreadyHaveAccount')}{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
            disabled={loading}
          >
            {t('register.signIn')}
          </button>
        </p>
      </div>
    </div>
  );
} 