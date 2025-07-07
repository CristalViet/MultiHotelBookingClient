'use client';

import { useState, useMemo } from 'react';
import { 
  Search, Eye, Trash2, Flag, Check, X, Star,
  MessageSquare, TrendingUp, AlertTriangle, ThumbsUp
} from 'lucide-react';

interface Review {
  id: string;
  guestName: string;
  hotelName: string;
  hotelLocation: string;
  rating: number;
  title: string;
  comment: string;
  reviewDate: string;
  status: 'published' | 'pending' | 'rejected' | 'flagged';
  helpfulVotes: number;
  reportCount: number;
}

export default function ReviewDashboard() {
  const [reviews] = useState<Review[]>([
    {
      id: 'RV001',
      guestName: 'John Smith',
      hotelName: 'Grand Hotel Saigon',
      hotelLocation: 'Ho Chi Minh City',
      rating: 5,
      title: 'Excellent service and location!',
      comment: 'Had an amazing stay. The staff was incredibly helpful and the location is perfect for exploring the city.',
      reviewDate: '2024-02-10',
      status: 'published',
      helpfulVotes: 12,
      reportCount: 0
    },
    {
      id: 'RV002',
      guestName: 'Sarah Johnson',
      hotelName: 'Beach Resort Da Nang',
      hotelLocation: 'Da Nang',
      rating: 4,
      title: 'Great beach resort',
      comment: 'Beautiful location right on the beach. The pool area was fantastic and the breakfast buffet had great variety.',
      reviewDate: '2024-02-08',
      status: 'published',
      helpfulVotes: 8,
      reportCount: 0
    },
    {
      id: 'RV003',
      guestName: 'Mike Chen',
      hotelName: 'Mountain Lodge Sapa',
      hotelLocation: 'Sapa',
      rating: 2,
      title: 'Disappointing experience',
      comment: 'The hotel was not as advertised. Room was small and noisy. Staff seemed uninterested in helping guests.',
      reviewDate: '2024-02-06',
      status: 'pending',
      helpfulVotes: 3,
      reportCount: 1
    },
    {
      id: 'RV004',
      guestName: 'Emma Wilson',
      hotelName: 'City Center Hotel Hanoi',
      hotelLocation: 'Hanoi',
      rating: 1,
      title: 'Terrible stay - avoid this place',
      comment: 'This place is absolutely horrible. Dirty rooms, rude staff, and they charged me extra fees.',
      reviewDate: '2024-02-05',
      status: 'flagged',
      helpfulVotes: 1,
      reportCount: 3
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredReviews = useMemo(() => {
    return reviews.filter(review => {
      const matchesSearch = review.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           review.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           review.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [reviews, searchTerm, statusFilter]);

  const stats = useMemo(() => {
    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    const pendingReviews = reviews.filter(r => r.status === 'pending').length;
    const flaggedReviews = reviews.filter(r => r.status === 'flagged').length;

    return { totalReviews, averageRating, pendingReviews, flaggedReviews };
  }, [reviews]);

  const getStatusBadge = (status: string) => {
    const config = {
      published: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
      flagged: 'bg-orange-100 text-orange-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config[status as keyof typeof config]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating}.0)</span>
      </div>
    );
  };

  const handleAction = (reviewId: string, action: string) => {
    console.log(`${action} review:`, reviewId);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Review Management</h1>
        <p className="text-gray-600">Monitor and moderate hotel reviews from guests</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalReviews}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingReviews}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Flagged Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{stats.flaggedReviews}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by guest name, hotel, or review title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="flagged">Flagged</option>
          </select>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Review
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest & Hotel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Helpful
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReviews.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">#{review.id}</div>
                      <div className="font-semibold text-gray-800 mt-1">{review.title}</div>
                      <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {review.comment.length > 80 
                          ? `${review.comment.substring(0, 80)}...` 
                          : review.comment
                        }
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{review.reviewDate}</div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{review.guestName}</div>
                      <div className="font-medium text-gray-800 mt-1">{review.hotelName}</div>
                      <div className="text-sm text-gray-500">{review.hotelLocation}</div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderStars(review.rating)}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(review.status)}
                    {review.reportCount > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        <Flag className="w-3 h-3 text-red-500" />
                        <span className="text-xs text-red-600">{review.reportCount} reports</span>
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">{review.helpfulVotes}</span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      {review.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleAction(review.id, 'approve')}
                            className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleAction(review.id, 'reject')}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Reject"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      
                      <button 
                        onClick={() => handleAction(review.id, 'flag')}
                        className="p-1 text-gray-400 hover:text-orange-600 transition-colors"
                        title="Flag"
                      >
                        <Flag className="w-4 h-4" />
                      </button>
                      
                      <button 
                        onClick={() => handleAction(review.id, 'delete')}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
} 