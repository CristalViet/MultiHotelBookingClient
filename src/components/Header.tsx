'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import LanguageSelector from './LanguageSelector';
import AuthModal, { useAuthModal } from './AuthModal';
import { Menu, X, User, ChevronDown, Settings, LogOut, Shield } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const t = useTranslations('navigation');
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const authModal = useAuthModal();

  // Mock user state - in real app, this would come from auth context
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true for demo
  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
  };

  // Get current locale from pathname
  const currentLocale = pathname.split('/')[1] || 'en';

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
      setIsLoggedIn(true);
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
      setIsLoggedIn(true);
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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
    console.log('User logged out');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${currentLocale}`}>
              <h1 className="text-2xl font-bold text-primary-600 cursor-pointer">Tuần Châu Resort</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-4 xl:space-x-6">
            {/* Đặt chỗ/My booking */}
            {isLoggedIn ? (
              <Link href={`/${currentLocale}/bookings`} className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200">
                My Booking
              </Link>
            ) : (
              <Link href={`/${currentLocale}/booking`} className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200">
                Đặt chỗ
              </Link>
            )}
            
            <Link href={`/${currentLocale}/promotions`} className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200">
              Ưu đãi
            </Link>
            <Link href={`/${currentLocale}/search`} className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200">
              Phòng nghỉ
            </Link>
            <Link href={`/${currentLocale}/amenities`} className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200">
              Tiện ích
            </Link>
            <Link href={`/${currentLocale}/dining`} className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200">
              Ẩm thực
            </Link>
            <Link href={`/${currentLocale}/gallery`} className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200">
              Thư viện
            </Link>
            <Link href={`/${currentLocale}/blog`} className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200">
              Blog
            </Link>
            <Link href={`/${currentLocale}/contact`} className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200">
              Liên hệ
            </Link>
          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSelector />
            
            {/* User Menu - Show when logged in */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
                >
                  <img
                    src={mockUser.avatar}
                    alt={mockUser.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-medium">{mockUser.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <img
                          src={mockUser.avatar}
                          alt={mockUser.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{mockUser.name}</p>
                          <p className="text-sm text-gray-500">{mockUser.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <Link
                        href={`/${currentLocale}/profile`}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-5 h-5" />
                        <span>My Profile</span>
                      </Link>
                      
                      <Link
                        href={`/${currentLocale}/admin`}
                        className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Shield className="w-5 h-5" />
                        <span>Admin Panel</span>
                      </Link>
                      
                      <button
                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                      </button>
                      
                      <hr className="my-2" />
                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Auth Buttons - Show when not logged in */
              <>
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
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
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
          <div className="lg:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-4">
              {/* Đặt chỗ/My booking */}
              {isLoggedIn ? (
                <Link href={`/${currentLocale}/bookings`} className="text-gray-700 hover:text-primary-600 font-medium">
                  My Booking
                </Link>
              ) : (
                <Link href={`/${currentLocale}/booking`} className="text-gray-700 hover:text-primary-600 font-medium">
                  Đặt chỗ
                </Link>
              )}
              
              <Link href={`/${currentLocale}/promotions`} className="text-gray-700 hover:text-primary-600 font-medium">
                Ưu đãi
              </Link>
              <Link href={`/${currentLocale}/search`} className="text-gray-700 hover:text-primary-600 font-medium">
                Phòng nghỉ
              </Link>
              <Link href={`/${currentLocale}/amenities`} className="text-gray-700 hover:text-primary-600 font-medium">
                Tiện ích
              </Link>
              <Link href={`/${currentLocale}/dining`} className="text-gray-700 hover:text-primary-600 font-medium">
                Ẩm thực
              </Link>
              <Link href={`/${currentLocale}/gallery`} className="text-gray-700 hover:text-primary-600 font-medium">
                Thư viện
              </Link>
              <Link href={`/${currentLocale}/blog`} className="text-gray-700 hover:text-primary-600 font-medium">
                Blog
              </Link>
              <Link href={`/${currentLocale}/contact`} className="text-gray-700 hover:text-primary-600 font-medium">
                Liên hệ
              </Link>
              
              {/* Mobile User Menu */}
              <div className="pt-4 border-t border-gray-100">
                {isLoggedIn ? (
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-3 pb-3">
                      <img
                        src={mockUser.avatar}
                        alt={mockUser.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{mockUser.name}</p>
                        <p className="text-sm text-gray-500">{mockUser.email}</p>
                      </div>
                    </div>
                    
                    <Link
                      href={`/${currentLocale}/profile`}
                      className="btn-secondary flex items-center justify-center space-x-2"
                    >
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="btn-outline text-red-600 border-red-200 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
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
                )}
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