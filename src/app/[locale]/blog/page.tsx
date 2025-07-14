'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Search, Calendar, User, ArrowRight, Tag, Eye, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import BlogCard from '@/components/BlogCard';
import { blogPosts, categories, getFeaturedPosts, getRegularPosts, filterPosts } from '@/lib/data/blog-data';



export default function BlogPage() {
  const t = useTranslations('blog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  // Apply filters when search or category changes
  useEffect(() => {
    const filtered = filterPosts(blogPosts, searchQuery, selectedCategory);
    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory]);

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-teal-600 py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Blog Tuần Châu Resort
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Khám phá những câu chuyện thú vị, tips du lịch và trải nghiệm tuyệt vời tại thiên đường nghỉ dưỡng Tuần Châu
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full text-lg border-0 focus:ring-4 focus:ring-blue-300 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Bài viết nổi bật</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  variant="featured" 
                />
              ))}
            </div>
          </section>
        )}

        {/* Regular Posts */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {featuredPosts.length > 0 ? 'Bài viết khác' : 'Tất cả bài viết'}
          </h2>
          
          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  variant="default" 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Không tìm thấy bài viết</h3>
              <p className="text-gray-600">
                Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác
              </p>
            </div>
          )}
        </section>

        {/* Load More Button */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-colors duration-200">
              Xem thêm bài viết
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
