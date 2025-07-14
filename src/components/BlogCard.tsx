'use client';

import { usePathname } from 'next/navigation';
import { Eye, Heart, ArrowRight, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  author: string;
  authorAvatar: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  featured: boolean;
}

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
  showAuthor?: boolean;
  className?: string;
}

export default function BlogCard({ 
  post, 
  variant = 'default', 
  showAuthor = true,
  className = '' 
}: BlogCardProps) {
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'vi';

  const getFeaturedLayout = () => (
    <article className="group">
      <Link href={`/${currentLocale}/blog/${post.slug}`}>
        <div className={`card overflow-hidden group-hover:shadow-xl transition-shadow duration-300 ${className}`}>
          <div className="relative h-64 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <span className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {post.views}
              </span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            {showAuthor && (
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={post.authorAvatar}
                      alt={post.author}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.publishedAt).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-1 text-red-500">
                  <Heart className="w-4 h-4" />
                  <span>{post.likes}</span>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );

  const getDefaultLayout = () => (
    <article className="group">
      <Link href={`/${currentLocale}/blog/${post.slug}`}>
        <div className={`card overflow-hidden group-hover:shadow-xl transition-shadow duration-300 ${className}`}>
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 left-3">
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
                {post.category}
              </span>
            </div>
            <div className="absolute top-3 right-3">
              <span className="bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded text-sm flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {post.views}
              </span>
            </div>
          </div>
          <div className="p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-3 text-sm line-clamp-2">
              {post.excerpt}
            </p>
            {showAuthor && (
              <div className="flex items-center text-xs text-gray-500 mb-3">
                <div className="flex items-center gap-2">
                  <Image
                    src={post.authorAvatar}
                    alt={post.author}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <span>{post.author}</span>
                </div>
                <span className="mx-2">•</span>
                <span>{new Date(post.publishedAt).toLocaleDateString('vi-VN')}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-red-500 text-sm">
                <Heart className="w-4 h-4" />
                <span>{post.likes}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );

  const getCompactLayout = () => (
    <article className="group">
      <Link href={`/${currentLocale}/blog/${post.slug}`}>
        <div className={`card overflow-hidden group-hover:shadow-xl transition-shadow duration-300 ${className}`}>
          <div className="relative h-40 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 left-2">
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                {post.category}
              </span>
            </div>
          </div>
          <div className="p-4">
            <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {post.title}
            </h4>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {post.excerpt}
            </p>
            <div className="flex items-center text-xs text-gray-500">
              <span>{new Date(post.publishedAt).toLocaleDateString('vi-VN')}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime}</span>
              {showAuthor && (
                <>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );

  switch (variant) {
    case 'featured':
      return getFeaturedLayout();
    case 'compact':
      return getCompactLayout();
    default:
      return getDefaultLayout();
  }
}

// Export the BlogPost interface for reuse
export type { BlogPost }; 