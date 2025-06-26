'use client';

import { useTranslations } from 'next-intl';
import LanguageSelector from './LanguageSelector';
import AuthModal, { useAuthModal } from './AuthModal';
import { Menu, X, User } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const t = useTranslations('navigation');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authModal = useAuthModal();

  const handleLogin = async (email: string, password: string) => {
    authModal.setAuthLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Simulate success or error
      if (email === 'error@test.com') {
        throw new Error('Invalid credentials');
      }
      console.log('Login successful:', { email, password });
      authModal.closeModal();
    } catch (error) {
      authModal.setAuthError(error instanceof Error ? error.message : 'Login failed');
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    authModal.setAuthLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Register successful:', { name, email, password });
      authModal.closeModal();
    } catch (error) {
      authModal.setAuthError(error instanceof Error ? error.message : 'Registration failed');
    }
  };

  const handleForgotPassword = async (email: string) => {
    authModal.setAuthLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Password reset sent to:', email);
      authModal.setForgotPasswordSuccessState(true);
    } catch (error) {
      authModal.setAuthError(error instanceof Error ? error.message : 'Failed to send reset email');
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary-600">HotelBook</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200">
              {t('home')}
            </a>
            <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200">
              {t('hotels')}
            </a>
            <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200">
              {t('flights')}
            </a>
            <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200">
              {t('contact')}
            </a>
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <button 
              onClick={() => authModal.openModal('login')}
              className="btn-secondary flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>{t('login')}</span>
            </button>
            <button 
              onClick={() => authModal.openModal('register')}
              className="btn-primary"
            >
              {t('signup')}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSelector />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-primary-600 font-medium">
                {t('home')}
              </a>
              <a href="#" className="text-gray-700 hover:text-primary-600 font-medium">
                {t('hotels')}
              </a>
              <a href="#" className="text-gray-700 hover:text-primary-600 font-medium">
                {t('flights')}
              </a>
              <a href="#" className="text-gray-700 hover:text-primary-600 font-medium">
                {t('contact')}
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                <button 
                  onClick={() => authModal.openModal('login')}
                  className="btn-secondary flex items-center justify-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>{t('login')}</span>
                </button>
                <button 
                  onClick={() => authModal.openModal('register')}
                  className="btn-primary"
                >
                  {t('signup')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={authModal.closeModal}
        initialMode={authModal.mode}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onForgotPassword={handleForgotPassword}
        loading={authModal.loading}
        error={authModal.error}
        forgotPasswordSuccess={authModal.forgotPasswordSuccess}
      />
    </header>
  );
}