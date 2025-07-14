'use client';

import { useState, useEffect } from 'react';
import { ChefHat, MapPin, Clock, Star, Play, Award, Users } from 'lucide-react';

export default function CuisineHero() {
  const [showVideo, setShowVideo] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Background images carousel
  const backgroundImages = [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1920&h=1080&fit=crop'
  ];

  // Auto-change background every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-800 text-white overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10" />
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Cuisine ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Animated overlay patterns */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Floating Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 animate-bounce">
              <ChefHat className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium">Ẩm Thực 5 Sao</span>
              <Award className="w-5 h-5 text-yellow-400" />
            </div>

            {/* Main Title with Gradient */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Hương Vị{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse">
                Hạ Long
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-500">
                Đích Thực
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Khám phá ẩm thực đặc sắc với hải sản tươi sống và đặc sản vùng biển 
              tại <span className="text-yellow-400 font-semibold">5 nhà hàng cao cấp</span> của Tuần Châu Resort
            </p>

            {/* Animated Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  5
                </div>
                <div className="text-sm text-white/80">Nhà Hàng</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  200+
                </div>
                <div className="text-sm text-white/80">Món Ăn</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  4.9
                </div>
                <div className="text-sm text-white/80">Đánh Giá</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  24/7
                </div>
                <div className="text-sm text-white/80">Phục Vụ</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group relative px-8 py-4 text-lg font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 rounded-full border-0 transition-all duration-300 hover:shadow-2xl hover:scale-105 transform">
                <span className="relative z-10 flex items-center space-x-2">
                  <ChefHat className="w-5 h-5" />
                  <span>Xem Thực Đơn</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
              </button>
              
              <button 
                onClick={() => setShowVideo(true)}
                className="group flex items-center space-x-3 text-white hover:text-yellow-400 transition-colors"
              >
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                  <Play className="w-6 h-6 ml-1" />
                </div>
                <span className="font-medium text-lg">Xem Video Giới Thiệu</span>
              </button>
            </div>

            {/* Special Offers */}
            <div className="mt-8 inline-flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm rounded-full px-6 py-3 text-green-300">
              <span className="animate-pulse">🎉</span>
              <span className="text-sm font-medium">Ưu đãi đặc biệt: Giảm 20% cho buffet biển cuối tuần</span>
            </div>
          </div>
        </div>
      </div>

      {/* Location Info */}
      <div className="absolute bottom-8 left-8 z-20">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white border border-white/30">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold">Tuần Châu Resort</span>
          </div>
          <p className="text-sm text-white/80">Đảo Tuần Châu, Hạ Long</p>
          <p className="text-xs text-white/60 mt-1">📍 View tuyệt đẹp ra Vịnh Hạ Long</p>
        </div>
      </div>

      {/* Operating Hours */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white border border-white/30">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold">Giờ Phục Vụ</span>
          </div>
          <p className="text-sm text-white/80">06:00 - 23:00 hàng ngày</p>
          <p className="text-xs text-white/60 mt-1">🍽️ Phục vụ cả ngày</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center space-y-2 text-white/60">
          <span className="text-xs">Khám phá thêm</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute top-8 right-8 z-20">
        <div className="flex space-x-2">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? 'bg-yellow-400 scale-125'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
            >
              <span className="text-2xl leading-none">×</span>
            </button>
            
            {/* Video placeholder - replace with actual video */}
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-xl font-semibold mb-2">Video Giới Thiệu Ẩm Thực</h3>
                <p className="text-gray-300">Trải nghiệm hương vị đặc sắc tại Tuần Châu Resort</p>
              </div>
            </div>
            
            {/* Replace above div with actual video iframe */}
            {/* <iframe
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              title="Cuisine Video"
              className="w-full h-full"
              allowFullScreen
            /> */}
          </div>
        </div>
      )}
    </section>
  );
}