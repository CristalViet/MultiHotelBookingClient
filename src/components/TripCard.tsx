'use client';

import { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Star, 
  Clock, 
  DollarSign, 
  MoreVertical,
  Eye,
  X,
  RotateCcw,
  MessageSquare
} from 'lucide-react';

interface Trip {
  id: string;
  destination: string;
  hotel: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  totalCost: number;
  currency: string;
  image: string;
  bookingReference: string;
  roomType: string;
  rating?: number;
  review?: string;
}

interface TripCardProps {
  trip: Trip;
  onViewDetails: (tripId: string) => void;
  onCancel: (tripId: string) => void;
  onReview: (tripId: string) => void;
  onRebook: (tripId: string) => void;
  className?: string;
}

export default function TripCard({
  trip,
  onViewDetails,
  onCancel,
  onReview,
  onRebook,
  className = ''
}: TripCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDaysUntilTrip = () => {
    const today = new Date();
    const checkInDate = new Date(trip.checkIn);
    const diffTime = checkInDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTripDuration = () => {
    const checkIn = new Date(trip.checkIn);
    const checkOut = new Date(trip.checkOut);
    const diffTime = checkOut.getTime() - checkIn.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntil = trip.status === 'upcoming' ? getDaysUntilTrip() : null;
  const duration = getTripDuration();

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${className}`}>
      
      {/* Trip Image */}
      <div className="relative aspect-video bg-gray-200">
        <img
          src={trip.image}
          alt={trip.destination}
          className="w-full h-full object-cover"
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(trip.status)}`}>
            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
          </span>
        </div>

        {/* Countdown for Upcoming Trips */}
        {trip.status === 'upcoming' && daysUntil !== null && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
            <div className="text-xs text-gray-600">
              {daysUntil > 0 ? `${daysUntil} days to go` : 
               daysUntil === 0 ? 'Today!' : 
               'Check-in passed'}
            </div>
          </div>
        )}

        {/* Rating for Completed Trips */}
        {trip.status === 'completed' && trip.rating && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{trip.rating}</span>
            </div>
          </div>
        )}

        {/* Actions Menu */}
        <div className="absolute bottom-3 right-3">
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>

            {showMenu && (
              <div className="absolute bottom-full right-0 mb-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                <button
                  onClick={() => {
                    onViewDetails(trip.id);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                
                {trip.status === 'upcoming' && (
                  <button
                    onClick={() => {
                      onCancel(trip.id);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                    Cancel Trip
                  </button>
                )}
                
                {trip.status === 'completed' && !trip.rating && (
                  <button
                    onClick={() => {
                      onReview(trip.id);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-yellow-600 hover:bg-yellow-50"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Write Review
                  </button>
                )}
                
                <button
                  onClick={() => {
                    onRebook(trip.id);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50"
                >
                  <RotateCcw className="w-4 h-4" />
                  Rebook
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trip Details */}
      <div className="p-6">
        
        {/* Destination & Hotel */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{trip.destination}</h3>
          <p className="text-gray-600 text-sm">{trip.hotel}</p>
        </div>

        {/* Trip Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          
          {/* Check-in & Check-out */}
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <Calendar className="w-4 h-4" />
              <span>Check-in</span>
            </div>
            <p className="font-medium text-gray-900">
              {new Date(trip.checkIn).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <Calendar className="w-4 h-4" />
              <span>Check-out</span>
            </div>
            <p className="font-medium text-gray-900">
              {new Date(trip.checkOut).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          {/* Duration */}
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <Clock className="w-4 h-4" />
              <span>Duration</span>
            </div>
            <p className="font-medium text-gray-900">{duration} night{duration !== 1 ? 's' : ''}</p>
          </div>
          
          {/* Guests */}
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <Users className="w-4 h-4" />
              <span>Guests</span>
            </div>
            <p className="font-medium text-gray-900">{trip.guests} guest{trip.guests !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {/* Room Type */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <MapPin className="w-4 h-4" />
            <span>Room Type</span>
          </div>
          <p className="font-medium text-gray-900">{trip.roomType}</p>
        </div>

        {/* Total Cost */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <DollarSign className="w-4 h-4" />
            <span>Total Cost</span>
          </div>
          <p className="text-xl font-bold text-gray-900">
            {trip.currency} {trip.totalCost.toLocaleString()}
          </p>
        </div>

        {/* Booking Reference */}
        <div className="mb-6">
          <div className="text-xs text-gray-500 mb-1">Booking Reference</div>
          <div className="font-mono text-sm bg-gray-100 px-3 py-2 rounded-lg">
            {trip.bookingReference}
          </div>
        </div>

        {/* Review for Completed Trips */}
        {trip.status === 'completed' && trip.review && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-700">Your Review:</span>
              {trip.rating && (
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < trip.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 italic">"{trip.review}"</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onViewDetails(trip.id)}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            View Details
          </button>
          
          {trip.status === 'upcoming' && (
            <button
              onClick={() => onCancel(trip.id)}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium text-sm"
            >
              Cancel
            </button>
          )}
          
          {trip.status === 'completed' && !trip.rating && (
            <button
              onClick={() => onReview(trip.id)}
              className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors font-medium text-sm"
            >
              Review
            </button>
          )}
          
          <button
            onClick={() => onRebook(trip.id)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
          >
            Rebook
          </button>
        </div>
      </div>
    </div>
  );
}
