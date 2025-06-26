'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';

export type AuthMode = 'login' | 'register' | 'forgotPassword';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
  onLogin?: (email: string, password: string) => void;
  onRegister?: (name: string, email: string, password: string) => void;
  onForgotPassword?: (email: string) => void;
  loading?: boolean;
  error?: string;
  forgotPasswordSuccess?: boolean;
}

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = 'login',
  onLogin,
  onRegister,
  onForgotPassword,
  loading = false,
  error,
  forgotPasswordSuccess = false
}: AuthModalProps) {
  const t = useTranslations('auth');
  const [mode, setMode] = useState<AuthMode>(initialMode);

  // Reset mode when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLogin = (email: string, password: string) => {
    onLogin?.(email, password);
  };

  const handleRegister = (name: string, email: string, password: string) => {
    onRegister?.(name, email, password);
  };

  const handleForgotPassword = (email: string) => {
    onForgotPassword?.(email);
  };

  const switchToLogin = () => setMode('login');
  const switchToRegister = () => setMode('register');
  const switchToForgotPassword = () => setMode('forgotPassword');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleBackdropClick}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={t('modal.close')}
          >
            <X className="h-5 w-5" />
          </button>

          {/* Content */}
          <div className="px-8 py-8">
            {/* Mode Switcher - Only show for login/register */}
            {(mode === 'login' || mode === 'register') && (
              <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={switchToLogin}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
                    mode === 'login'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t('modal.signIn')}
                </button>
                <button
                  onClick={switchToRegister}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
                    mode === 'register'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t('modal.signUp')}
                </button>
              </div>
            )}

            {/* Form Content */}
            <div className="min-h-[400px]">
              {mode === 'login' && (
                <LoginForm
                  onSubmit={handleLogin}
                  onForgotPassword={switchToForgotPassword}
                  onSwitchToRegister={switchToRegister}
                  loading={loading}
                  error={error}
                />
              )}

              {mode === 'register' && (
                <RegisterForm
                  onSubmit={handleRegister}
                  onSwitchToLogin={switchToLogin}
                  loading={loading}
                  error={error}
                />
              )}

              {mode === 'forgotPassword' && (
                <ForgotPasswordForm
                  onSubmit={handleForgotPassword}
                  onBackToLogin={switchToLogin}
                  loading={loading}
                  error={error}
                  success={forgotPasswordSuccess}
                />
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4">
            <div className="text-center text-xs text-gray-500">
              {t('modal.footer.secureLogin')}
              <br />
              {t('modal.footer.protectedBy')}{' '}
              <span className="font-medium">SSL</span> {t('modal.footer.encryption')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook for managing auth modal state
export function useAuthModal(initialMode: AuthMode = 'login') {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);

  const openModal = (openMode?: AuthMode) => {
    if (openMode) setMode(openMode);
    setIsOpen(true);
    setError('');
    setForgotPasswordSuccess(false);
  };

  const closeModal = () => {
    setIsOpen(false);
    setError('');
    setLoading(false);
    setForgotPasswordSuccess(false);
  };

  const setAuthError = (errorMessage: string) => {
    setError(errorMessage);
    setLoading(false);
  };

  const setAuthLoading = (isLoading: boolean) => {
    setLoading(isLoading);
    if (isLoading) setError('');
  };

  const setForgotPasswordSuccessState = (success: boolean) => {
    setForgotPasswordSuccess(success);
    setLoading(false);
    setError('');
  };

  return {
    isOpen,
    mode,
    loading,
    error,
    forgotPasswordSuccess,
    openModal,
    closeModal,
    setAuthError,
    setAuthLoading,
    setForgotPasswordSuccessState
  };
} 