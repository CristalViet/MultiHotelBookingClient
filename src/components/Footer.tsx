'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const [email, setEmail] = useState('');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'vi';

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="bg-white">
      {/* Main Footer Section */}
      <div className="bg-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4">
                  <svg className="w-10 h-10 text-teal-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">TUẦN CHÂU</h3>
                  <p className="text-sm opacity-90">RESORT HẠ LONG</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <h4 className="font-semibold text-lg">TUẦN CHÂU RESORT HẠ LONG</h4>
                <p>Đảo Tuần Châu, Thành Phố Hạ Long, Tỉnh Quảng Ninh,</p>
                <p>Việt Nam</p>
                <p><span className="font-medium">T.</span> 1900 93 88</p>
                <p><span className="font-medium">E.</span> info@tuanchaurecort.com.vn</p>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold text-lg mb-4">SIGN UP FOR NEWSLETTER</h4>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-teal-600 hover:bg-teal-800 text-white p-2 rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
              <div className="flex space-x-3">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="TripAdvisor"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    <circle cx="8" cy="12" r="2"/>
                    <circle cx="16" cy="12" r="2"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="YouTube"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partnerships Section */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {/* Partnership logos - using placeholder for now */}
            <div className="text-2xl font-bold text-gray-400">TUẦN CHÂU</div>
            <div className="text-lg text-gray-400">TUANCHAU RESORT</div>
            <div className="text-lg text-gray-400">TUẦN CHÂU HOSPITALITY</div>
            <div className="text-lg text-gray-400">PARADISE VIETNAM</div>
            <div className="text-lg text-gray-400">FERRY</div>
            <div className="text-lg text-gray-400">TUẦN CHÂU</div>
            <div className="text-lg text-gray-400">TINH HOA</div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Company Details */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">CÔNG TY TNHH ÂU LẠC QUẢNG NINH</h4>
              <div className="text-sm text-gray-600 space-y-2">
                <p>Trụ sở: Phường Tuần Châu, Thành phố Hạ Long, Tỉnh Quảng Ninh, Việt Nam - Hotline: 1900 9388/0934 367 555 - Email: info@tuanchaurecort.com.vn - Giấy CNĐKDN: 5700239963 - Ngày cấp: 02/08/1997 Cơ quan cấp: Phòng Đăng ký kinh doanh Sở Kế hoạch và Đầu tư Quảng Ninh.</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col lg:flex-row lg:justify-end lg:items-start space-y-4 lg:space-y-0 lg:space-x-8">
              <div className="flex space-x-6">
                <Link 
                  href={`/${currentLocale}`}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Trang chủ
                </Link>
                <Link 
                  href={`/${currentLocale}/contact`}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Liên hệ
                </Link>
                <Link 
                  href={`/${currentLocale}/careers`}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Tuyển dụng
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Tuần Châu Resort Hạ Long. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 