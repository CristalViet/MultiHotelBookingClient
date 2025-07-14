'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { 
  Calendar, 
  User, 
  Eye, 
  Heart, 
  Share2, 
  BookOpen, 
  ArrowLeft, 
  Facebook, 
  Twitter, 
  Link as LinkIcon,
  MessageCircle,
  Send,
  MoreHorizontal,
  ChevronUp
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPostBySlug, getRelatedPosts } from '@/lib/data/blog-data';
import BlogCard from '@/components/BlogCard';



// Mock data cho comments
const mockComments = [
  {
    id: 1,
    author: 'Nguyễn Thị Lan',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop',
    content: 'Bài viết rất hữu ích! Tôi sẽ áp dụng những tips này cho chuyến du lịch sắp tới.',
    publishedAt: '2024-01-16',
    likes: 5
  },
  {
    id: 2,
    author: 'Trần Văn Minh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
    content: 'Cảm ơn tác giả đã chia sẻ. Resort này thực sự tuyệt vời!',
    publishedAt: '2024-01-16',
    likes: 3
  }
];

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('blog');
  const [post, setPost] = useState<any>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Get current post
  useEffect(() => {
    const currentPost = getBlogPostBySlug(params.slug as string);
    if (currentPost) {
      setPost(currentPost);
      setLikes(currentPost.likes);
    }
  }, [params.slug]);

  // Handle scroll to show back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || '';
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Đã copy link bài viết!');
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Xử lý submit comment ở đây
      console.log('New comment:', newComment);
      setNewComment('');
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Quay lại</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-blue-100 mb-6 max-w-3xl">
              {post.excerpt}
            </p>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Meta */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image
                src={post.authorAvatar}
                alt={post.author}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{post.author}</h3>
                <p className="text-sm text-gray-600">{post.authorBio}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString('vi-VN')}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{post.views} lượt xem</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-8">
            <div 
              className="prose prose-lg max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-ul:my-4 prose-ol:my-4
                prose-li:text-gray-700 prose-li:mb-1
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 
                prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 
                prose-blockquote:my-6 prose-blockquote:italic
                prose-strong:text-gray-900 prose-strong:font-semibold"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Article Footer */}
          <div className="border-t border-gray-100 p-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                    isLiked 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{likes}</span>
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Chia sẻ</span>
                  </button>

                  {showShareMenu && (
                    <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10">
                      <button
                        onClick={() => handleShare('facebook')}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                      >
                        <Facebook className="w-4 h-4 text-blue-600" />
                        <span>Facebook</span>
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                      >
                        <Twitter className="w-4 h-4 text-blue-400" />
                        <span>Twitter</span>
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                      >
                        <LinkIcon className="w-4 h-4 text-gray-600" />
                        <span>Copy link</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <span className="text-sm text-gray-500">
                Đã xem: {post.views} lần
              </span>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Bình luận ({mockComments.length})
          </h3>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <div className="flex gap-3">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
                alt="Your avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Viết bình luận của bạn..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Gửi bình luận
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {mockComments.map((comment) => (
              <div key={comment.id} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                <Image
                  src={comment.avatar}
                  alt={comment.author}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.publishedAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{comment.content}</p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>{comment.likes}</span>
                    </button>
                    <button className="text-sm text-gray-500 hover:text-blue-500 transition-colors">
                      Trả lời
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Bài viết liên quan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard 
                  key={relatedPost.id} 
                  post={relatedPost} 
                  variant="compact" 
                  showAuthor={false}
                />
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
} 