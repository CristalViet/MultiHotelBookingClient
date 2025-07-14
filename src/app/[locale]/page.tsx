import { useTranslations } from 'next-intl';
import Promotions from '@/components/Promotions';
import CTAButton from '@/components/CTAButton';
import BlogCard from '@/components/BlogCard';
import { blogPosts } from '@/lib/data/blog-data';
import Link from 'next/link';
import QuickSearchForm from '@/components/QuickSearchForm';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-slide-up">
            {t('hero.subtitle')}
          </p>
          <CTAButton text={t('hero.cta')} />
        </div>
      </section>

      {/* Quick Search Form */}
      <section className="relative -mt-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuickSearchForm />
        </div>
      </section>

      {/* Resort Info Section */}
      <section className="relative mt-16 z-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Resort trên đảo Tuần Châu từ năm 1997</h2>
            <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
              Kiến trúc giao thoa Việt-Pháp độc đáo với biệt thự vườn đồi, ven biển giữa rừng thông xanh yên ả, 
              tạo nên một quần thể nghỉ dưỡng tuyệt vời với tầm nhìn kỳ vĩ ra Vịnh Hạ Long.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="text-primary-600 font-bold text-3xl">1997</div>
                <div className="text-gray-600">Năm thành lập</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-primary-600 font-bold text-3xl">100M</div>
                <div className="text-gray-600">Đến Công viên Tuần Châu</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-primary-600 font-bold text-3xl">300M</div>
                <div className="text-gray-600">Đến Cảng tàu Quốc tế</div>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/vi/hotel/tuan-chau-resort" className="btn-primary px-8 py-4 text-lg">
                Khám phá phòng nghỉ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Attractions Distance */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Khoảng cách tới các địa điểm nổi bật</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Vị trí trung tâm thuận lợi giúp bạn dễ dàng khám phá những điểm đến hấp dẫn xung quanh
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Tuan Chau Park & King Kong Park */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center group hover:shadow-lg transition-all duration-300">
              <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM12 7c.83 0 1.5.67 1.5 1.5S12.83 10 12 10s-1.5-.67-1.5-1.5S11.17 7 12 7zm5 6.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Công viên Tuần Châu</h3>
              <h4 className="text-sm text-gray-600 mb-2">Công viên King Kong</h4>
              <div className="text-green-600 font-bold text-xl mb-1">100M</div>
              <p className="text-gray-600 text-sm">2 phút đi bộ</p>
            </div>

            {/* International Port */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center group hover:shadow-lg transition-all duration-300">
              <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cảng tàu Quốc tế</h3>
              <h4 className="text-sm text-gray-600 mb-2">Tuần Châu</h4>
              <div className="text-blue-600 font-bold text-xl mb-1">300M</div>
              <p className="text-gray-600 text-sm">3 phút đi bộ</p>
            </div>

            {/* Ferry to Cat Ba */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 text-center group hover:shadow-lg transition-all duration-300">
              <div className="bg-amber-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.64 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.32-.42-.58-.5L20 10.62V6c0-.5-.5-1-1-1h-2c-.5 0-1 .5-1 1v3.5L12 8 8 9.5V6c0-.5-.5-1-1-1H5c-.5 0-1 .5-1 1v4.62L2.7 11.04c-.26.08-.46.26-.58.5s-.14.52-.06.78L3.95 19z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Phà Tuần Châu</h3>
              <h4 className="text-sm text-gray-600 mb-2">Cát Bà</h4>
              <div className="text-amber-600 font-bold text-xl mb-1">500M</div>
              <p className="text-gray-600 text-sm">5 phút đi bộ</p>
            </div>

            {/* Tuan Chau Golf */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 text-center group hover:shadow-lg transition-all duration-300">
              <div className="bg-emerald-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.48 11.41c-.15.13-.34.21-.54.21-.41 0-.75-.34-.75-.75 0-.2.08-.39.21-.54L17.96 4H12c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1s-1-.45-1-1V5.41l-6.52 6zm-1.41 1.42c.78.78 2.05.78 2.83 0l6.36-6.36c.78-.78.78-2.05 0-2.83-.78-.78-2.05-.78-2.83 0L11.07 10l-2.83-2.83c-.78-.78-2.05-.78-2.83 0L2.59 9.99c-.78.78-.78 2.05 0 2.83l6.36 6.36c.78.78 2.05.78 2.83 0l.29-.29.29-.29c.78-.78.78-2.05 0-2.83z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tuần Châu Golf</h3>
              <h4 className="text-sm text-gray-600 mb-2">Sân golf 18 lỗ</h4>
              <div className="text-emerald-600 font-bold text-xl mb-1">3.5KM</div>
              <p className="text-gray-600 text-sm">8 phút đi xe</p>
            </div>

            {/* Cai Dam Market - Bai Chay */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center group hover:shadow-lg transition-all duration-300">
              <div className="bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Chợ Cái Dăm</h3>
              <h4 className="text-sm text-gray-600 mb-2">Bãi Cháy</h4>
              <div className="text-purple-600 font-bold text-xl mb-1">8KM</div>
              <p className="text-gray-600 text-sm">15 phút đi xe</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Dịch vụ đưa đón miễn phí</h3>
            <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
              Resort cung cấp dịch vụ đưa đón miễn phí từ/đến cảng tàu, sân bay và các điểm tham quan chính. 
              Đội xe sang trọng với tài xế kinh nghiệm sẵn sàng phục vụ 24/7.
            </p>
            <Link href="/vi/booking" className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Đặt phòng & Shuttle
            </Link>
          </div>
        </div>
      </section>

      {/* Resort Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trải nghiệm Tuần Châu Resort</h2>
            <p className="text-lg text-gray-600">Khám phá những điều tuyệt vời mà resort mang lại</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🏖️</div>
              <h3 className="text-xl font-semibold mb-2">Biệt thự ven biển</h3>
              <p className="text-gray-600">Biệt thự sang trọng với tầm nhìn trực diện ra Vịnh Hạ Long</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🏔️</div>
              <h3 className="text-xl font-semibold mb-2">Biệt thự vườn đồi</h3>
              <p className="text-gray-600">Không gian riêng tư giữa rừng thông xanh yên ả</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🎢</div>
              <h3 className="text-xl font-semibold mb-2">Công viên giải trí</h3>
              <p className="text-gray-600">Công viên Tuần Châu chỉ cách 100m với nhiều hoạt động vui chơi</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link href="/vi/hotel/tuan-chau-resort" className="btn-primary px-8 py-4 text-lg">
              Đặt phòng ngay
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Các dịch vụ nổi bật</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Trải nghiệm những dịch vụ cao cấp và tiện ích đa dạng tại Tuần Châu Resort
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Swimming Pool */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl">
                🏊‍♂️
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hồ bơi</h3>
              <p className="text-gray-600 text-sm">
                Hồ bơi ngoài trời với tầm nhìn ra biển, hồ bơi trong nhà và hồ bơi trẻ em
              </p>
            </div>

            {/* Restaurant */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl">
                🍽️
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nhà hàng</h3>
              <p className="text-gray-600 text-sm">
                3 nhà hàng cao cấp phục vụ ẩm thực Việt Nam, Á-Âu và hải sản tươi sống
              </p>
            </div>

            {/* Spa */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl">
                💆‍♀️
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Spa & Wellness</h3>
              <p className="text-gray-600 text-sm">
                Spa truyền thống với các liệu pháp massage và chăm sóc sức khỏe chuyên nghiệp
              </p>
            </div>

            {/* Transportation */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl">
                🚐
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Xe đưa đón</h3>
              <p className="text-gray-600 text-sm">
                Dịch vụ đưa đón miễn phí từ sân bay, bến tàu và các điểm tham quan
              </p>
            </div>

            {/* Fitness Center */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl">
                💪
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fitness Center</h3>
              <p className="text-gray-600 text-sm">
                Phòng gym hiện đại với trang thiết bị cao cấp và huấn luyện viên chuyên nghiệp
              </p>
            </div>

            {/* Water Sports */}
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-teal-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl">
                🏄‍♂️
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Thể thao nước</h3>
              <p className="text-gray-600 text-sm">
                Kayak, du thuyền, lặn biển và các hoạt động thể thao nước hấp dẫn
              </p>
            </div>

            {/* Conference & Events */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-indigo-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl">
                🎭
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hội nghị & Sự kiện</h3>
              <p className="text-gray-600 text-sm">
                Phòng hội nghị hiện đại và dịch vụ tổ chức sự kiện chuyên nghiệp
              </p>
            </div>

            {/* Kids Club */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-pink-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl">
                🎨
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Kids Club</h3>
              <p className="text-gray-600 text-sm">
                Khu vui chơi trẻ em an toàn với nhiều hoạt động giáo dục và giải trí
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/vi/hotel/tuan-chau-resort" className="btn-primary px-8 py-4 text-lg">
              Xem tất cả dịch vụ
            </Link>
          </div>
        </div>
      </section>

      {/* Room Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Hình ảnh không gian phòng</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Khám phá những không gian nghỉ ngơi sang trọng và thoải mái tại Tuần Châu Resort
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Elegance Family with Balcony Sea View */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-all duration-500">
              <div className="relative h-80 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=500&fit=crop&crop=center" 
                  alt="Elegance Family with Balcony Sea View"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Family Suite
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Elegance Family với Ban công Nhìn ra Biển</h3>
                  <p className="text-blue-100 mb-4">
                    Phòng rộng rãi với 2 giường lớn, ban công riêng và tầm nhìn tuyệt đẹp ra biển
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-blue-200">
                      <span>Từ </span>
                      <span className="text-xl font-bold text-white">2,900,000₫</span>
                      <span>/đêm</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <span>🛏️</span> 2 Giường King
                  </span>
                  <span className="flex items-center gap-1">
                    <span>👥</span> 4 Người lớn + 1 Trẻ em
                  </span>
                  <span className="flex items-center gap-1">
                    <span>📐</span> 45m²
                  </span>
                </div>
                <Link href="/vi/booking?room=elegance-family-sea-view" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 block text-center">
                  Đặt phòng ngay
                </Link>
              </div>
            </div>

            {/* Elegance Junior Double with Balcony and Sea View */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-all duration-500">
              <div className="relative h-80 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=500&fit=crop&crop=center" 
                  alt="Elegance Junior Double with Balcony and Sea View"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Sea View
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Elegance Junior với Ban công Nhìn ra Biển</h3>
                  <p className="text-emerald-100 mb-4">
                    Phòng Junior sang trọng với ban công riêng, tầm nhìn ra biển và tiện nghi cao cấp
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-emerald-200">
                      <span>Từ </span>
                      <span className="text-xl font-bold text-white">1,800,000₫</span>
                      <span>/đêm</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <span>🛏️</span> 1 Giường King
                  </span>
                  <span className="flex items-center gap-1">
                    <span>👥</span> 2 Người lớn
                  </span>
                  <span className="flex items-center gap-1">
                    <span>📐</span> 20m²
                  </span>
                </div>
                <Link href="/vi/booking?room=elegance-junior-sea-view" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 block text-center">
                  Đặt phòng ngay
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Ancient Double or Twin with Window */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg bg-white hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&h=400&fit=crop&crop=center" 
                  alt="Ancient Double or Twin with Window"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="text-lg font-semibold mb-1">Ancient Double với Cửa sổ</h4>
                  <p className="text-xs text-gray-200">Phòng cổ điển thoải mái</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                  <span>🛏️ King hoặc 2 Single</span>
                  <span>👥 2+1 Khách</span>
                  <span>📐 20m²</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm">
                    <span className="text-amber-600 font-bold">1,300,000₫</span>
                    <span className="text-gray-500">/đêm</span>
                  </div>
                </div>
                <Link href="/vi/booking?room=ancient-double-window" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded text-sm transition-colors duration-200 block text-center">
                  Đặt phòng
                </Link>
              </div>
            </div>

            {/* Paradise Suite Hotel Room */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg bg-white hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1578774204375-51039884dd75?w=600&h=400&fit=crop&crop=center" 
                  alt="Paradise Suite Hotel Room"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="text-lg font-semibold mb-1">Paradise Suite Standard</h4>
                  <p className="text-xs text-gray-200">4 sao với tiện nghi hiện đại</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                  <span>🛏️ King Bed</span>
                  <span>👥 2 Khách</span>
                  <span>📐 25m²</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm">
                    <span className="text-purple-600 font-bold">2,200,000₫</span>
                    <span className="text-gray-500">/đêm</span>
                  </div>
                </div>
                <Link href="/vi/booking?room=paradise-suite-standard" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded text-sm transition-colors duration-200 block text-center">
                  Đặt phòng
                </Link>
              </div>
            </div>

            {/* Tuan Chau Resort Villa */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg bg-white hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&h=400&fit=crop&crop=center" 
                  alt="Tuan Chau Resort Villa"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="text-lg font-semibold mb-1">Tuần Châu Resort Villa</h4>
                  <p className="text-xs text-gray-200">Villa riêng với hồ bơi</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                  <span>🛏️ 2 King Beds</span>
                  <span>👥 6 Khách</span>
                  <span>📐 80m²</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm">
                    <span className="text-emerald-600 font-bold">3,800,000₫</span>
                    <span className="text-gray-500">/đêm</span>
                  </div>
                </div>
                <Link href="/vi/booking?room=tuan-chau-villa" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded text-sm transition-colors duration-200 block text-center">
                  Đặt phòng
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/vi/search" className="btn-primary px-8 py-4 text-lg">
              Xem tất cả loại phòng
            </Link>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Giá trị cốt lõi của Tuần Châu Resort</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Những giá trị định hướng mọi hoạt động của chúng tôi, tạo nên trải nghiệm đặc biệt và đáng nhớ cho mỗi vị khách
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Excellence in Service */}
            <div className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-3xl group-hover:shadow-xl transition-shadow duration-300">
                ⭐
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Dịch vụ xuất sắc</h3>
              <p className="text-gray-600 leading-relaxed">
                Cam kết mang đến dịch vụ vượt trên mong đợi, từ những chi tiết nhỏ nhất đến trải nghiệm tổng thể hoàn hảo
              </p>
            </div>

            {/* Authentic Experiences */}
            <div className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-3xl group-hover:shadow-xl transition-shadow duration-300">
                🏛️
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Bản sắc văn hóa</h3>
              <p className="text-gray-600 leading-relaxed">
                Tôn vinh và bảo tồn văn hóa Việt Nam qua kiến trúc, ẩm thực và những trải nghiệm đậm chất địa phương
              </p>
            </div>

            {/* Environmental Responsibility */}
            <div className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-3xl group-hover:shadow-xl transition-shadow duration-300">
                🌿
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Bền vững môi trường</h3>
              <p className="text-gray-600 leading-relaxed">
                Bảo vệ vẻ đẹp thiên nhiên Hạ Long qua các hoạt động du lịch có trách nhiệm và thân thiện với môi trường
              </p>
            </div>

            {/* Guest-Centric Approach */}
            <div className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-3xl group-hover:shadow-xl transition-shadow duration-300">
                ❤️
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Khách hàng là trung tâm</h3>
              <p className="text-gray-600 leading-relaxed">
                Mọi quyết định và hoạt động đều hướng đến việc tạo ra giá trị và kỷ niệm đẹp cho khách hàng
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Cam kết của chúng tôi</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 text-orange-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    🏆
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Chất lượng đẳng cấp quốc tế</h4>
                    <p className="text-gray-600 text-sm">Đạt chuẩn dịch vụ 5 sao với đội ngũ được đào tạo chuyên nghiệp</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-teal-100 text-teal-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    🤝
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Đối tác cộng đồng</h4>
                    <p className="text-gray-600 text-sm">Hợp tác phát triển du lịch bền vững cùng cộng đồng địa phương</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    🎯
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Đổi mới không ngừng</h4>
                    <p className="text-gray-600 text-sm">Cải tiến liên tục để mang đến những trải nghiệm mới mẻ và độc đáo</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    🛡️
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">An toàn tuyệt đối</h4>
                    <p className="text-gray-600 text-sm">Đảm bảo an toàn sức khỏe và bảo mật thông tin cho mọi khách hàng</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-green-200 to-blue-200 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">🏖️</div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Từ năm 1997</h4>
                    <p className="text-gray-600">Hơn 25 năm kinh nghiệm phục vụ</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="text-2xl font-bold text-blue-600">500K+</div>
                      <div className="text-sm text-gray-600">Khách hàng đã phục vụ</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="text-2xl font-bold text-green-600">4.8/5</div>
                      <div className="text-sm text-gray-600">Đánh giá trung bình</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="text-2xl font-bold text-purple-600">98%</div>
                      <div className="text-sm text-gray-600">Khách hàng hài lòng</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="text-2xl font-bold text-orange-600">24/7</div>
                      <div className="text-sm text-gray-600">Hỗ trợ khách hàng</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Sứ mệnh của chúng tôi</h3>
              <p className="text-xl text-blue-100 mb-6 max-w-4xl mx-auto">
                "Tạo ra những kỷ niệm đáng nhớ và trải nghiệm khó quên cho mỗi vị khách thông qua dịch vụ xuất sắc, 
                đồng thời bảo tồn và phát huy vẻ đẹp thiên nhiên cũng như văn hóa Việt Nam"
              </p>
              <Link href="/vi/hotel/tuan-chau-resort" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                Tìm hiểu thêm về chúng tôi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Khám phá & Trải nghiệm
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Cập nhật những câu chuyện thú vị, mẹo du lịch và trải nghiệm độc đáo từ Tuần Châu Resort
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto rounded-full"></div>
          </div>

          {/* Latest Blog Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts
              .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
              .slice(0, 3)
              .map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  variant="default"
                  className="hover:shadow-xl transition-all duration-300"
                />
              ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Link 
              href="/vi/blog" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Xem tất cả bài viết</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Promotions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Promotions />
        </div>
      </section>
    </div>
  );
}