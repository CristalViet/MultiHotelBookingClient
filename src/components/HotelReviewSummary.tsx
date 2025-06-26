'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, MoreHorizontal, Filter, ChevronDown } from 'lucide-react';

interface Review {
  id: string;
  author: {
    name: string;
    avatar?: string;
    location?: string;
    verified: boolean;
  };
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
  roomType?: string;
  stayDuration?: string;
  photos?: string[];
  categories: {
    location: number;
    cleanliness: number;
    service: number;
    facilities: number;
    value: number;
  };
}

interface ReviewSummary {
  overall: number;
  totalReviews: number;
  breakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  categories: {
    location: number;
    cleanliness: number;
    service: number;
    facilities: number;
    value: number;
  };
  highlights: string[];
  complaints: string[];
}

interface HotelReviewSummaryProps {
  summary: ReviewSummary;
  reviews: Review[];
  onLoadMore?: () => void;
  hasMore?: boolean;
}

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful';
type FilterOption = 'all' | '5' | '4' | '3' | '2' | '1';

export default function HotelReviewSummary({ 
  summary, 
  reviews, 
  onLoadMore, 
  hasMore = false 
}: HotelReviewSummaryProps) {
  const t = useTranslations('reviews');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());

  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return t('excellent');
    if (rating >= 4.0) return t('veryGood');
    if (rating >= 3.5) return t('good');
    if (rating >= 3.0) return t('average');
    return t('poor');
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      location: '📍',
      cleanliness: '🧹',
      service: '👥',
      facilities: '🏢',
      value: '💰'
    };
    return icons[category as keyof typeof icons] || '⭐';
  };

  const toggleReviewExpansion = (reviewId: string) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId);
    } else {
      newExpanded.add(reviewId);
    }
    setExpandedReviews(newExpanded);
  };

  // Filter and sort reviews
  const filteredAndSortedReviews = (() => {
    let filtered = reviews;
    
    if (filterBy !== 'all') {
      const rating = parseInt(filterBy);
      filtered = reviews.filter(review => review.rating === rating);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        case 'helpful':
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });

    return filtered;
  })();

  return (
    <div className="space-y-8">
      {/* Review Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Overall Rating */}
        <div className="text-center">
          <div className="text-5xl font-bold text-primary-600 mb-2">
            {summary.overall.toFixed(1)}
          </div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(summary.overall)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <div className="text-lg font-medium text-gray-900 mb-1">
            {getRatingLabel(summary.overall)}
          </div>
          <div className="text-gray-600">
            {summary.totalReviews.toLocaleString()} {t('reviews')}
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900">{t('ratingBreakdown')}</h3>
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = summary.breakdown[rating as keyof typeof summary.breakdown];
            const percentage = summary.totalReviews > 0 ? (count / summary.totalReviews) * 100 : 0;
            
            return (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm">{rating}</span>
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                </div>
                
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                
                <div className="w-12 text-sm text-gray-600 text-right">
                  {count}
                </div>
              </div>
            );
          })}
        </div>

        {/* Category Ratings */}
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900">{t('categoryRatings')}</h3>
          {Object.entries(summary.categories).map(([category, rating]) => (
            <div key={category} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>{getCategoryIcon(category)}</span>
                <span className="text-sm">{t(`category.${category}`)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3 h-3 ${
                        star <= Math.round(rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium w-8">{rating.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Highlights & Complaints */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Highlights */}
        <div className="card p-6">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
            <ThumbsUp className="w-5 h-5 text-green-500" />
            {t('topHighlights')}
          </h3>
          <ul className="space-y-2">
            {summary.highlights.map((highlight, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Common Complaints */}
        <div className="card p-6">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
            <ThumbsDown className="w-5 h-5 text-red-500" />
            {t('commonComplaints')}
          </h3>
          <ul className="space-y-2">
            {summary.complaints.map((complaint, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                {complaint}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="space-y-6">
        {/* Reviews Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-xl font-semibold text-gray-900">
            {t('guestReviews')} ({filteredAndSortedReviews.length})
          </h3>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-sm ${
                showFilters
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'border-gray-300 hover:border-primary-600'
              }`}
            >
              <Filter className="w-4 h-4" />
              {t('filter')}
              {filterBy !== 'all' && (
                <span className="bg-white text-primary-600 px-1.5 py-0.5 rounded text-xs">
                  {filterBy}★
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-500"
            >
              <option value="newest">{t('sortNewest')}</option>
              <option value="oldest">{t('sortOldest')}</option>
              <option value="highest">{t('sortHighest')}</option>
              <option value="lowest">{t('sortLowest')}</option>
              <option value="helpful">{t('sortHelpful')}</option>
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="card p-4">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilterBy('all')}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  filterBy === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('allRatings')}
              </button>
              
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFilterBy(rating.toString() as FilterOption)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-1 ${
                    filterBy === rating.toString()
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {rating}
                  <Star className="w-3 h-3 fill-current" />
                  <span className="ml-1">
                    ({summary.breakdown[rating as keyof typeof summary.breakdown]})
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredAndSortedReviews.map((review) => {
            const isExpanded = expandedReviews.has(review.id);
            const shouldTruncate = review.content.length > 300;
            
            return (
              <div key={review.id} className="card p-6">
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      {review.author.avatar ? (
                        <img
                          src={review.author.avatar}
                          alt={review.author.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-primary-600 font-medium">
                          {review.author.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900">{review.author.name}</h4>
                        {review.author.verified && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                            {t('verified')}
                          </span>
                        )}
                      </div>
                      
                      {review.author.location && (
                        <p className="text-sm text-gray-600">{review.author.location}</p>
                      )}
                      
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                {/* Review Content */}
                <div className="mb-4">
                  <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
                  <p className="text-gray-700 leading-relaxed">
                    {shouldTruncate && !isExpanded
                      ? `${review.content.substring(0, 300)}...`
                      : review.content
                    }
                  </p>
                  
                  {shouldTruncate && (
                    <button
                      onClick={() => toggleReviewExpansion(review.id)}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2 flex items-center gap-1"
                    >
                      {isExpanded ? t('showLess') : t('readMore')}
                      <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>

                {/* Review Details */}
                <div className="flex items-center justify-between text-sm text-gray-600 border-t pt-4">
                  <div className="flex items-center gap-4">
                    {review.roomType && (
                      <span>{t('roomType')}: {review.roomType}</span>
                    )}
                    {review.stayDuration && (
                      <span>{t('stayed')}: {review.stayDuration}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 hover:text-primary-600 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      {t('helpful')} ({review.helpful})
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="text-center">
            <button
              onClick={onLoadMore}
              className="btn-secondary"
            >
              {t('loadMoreReviews')}
            </button>
          </div>
        )}

        {/* No Reviews */}
        {filteredAndSortedReviews.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">{t('noReviewsFound')}</p>
            {filterBy !== 'all' && (
              <button
                onClick={() => setFilterBy('all')}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2"
              >
                {t('showAllReviews')}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 