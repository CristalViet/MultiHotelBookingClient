'use client';

import { useState } from 'react';
import { Search, Filter, Calendar, MapPin, Clock, DollarSign } from 'lucide-react';

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

interface MyTripsListProps {
  trips: Trip[];
  onTripClick: (tripId: string) => void;
  onCancelTrip: (tripId: string) => void;
  onReviewTrip: (tripId: string) => void;
  onRebookTrip: (tripId: string) => void;
  className?: string;
}

export default function MyTripsList({
  trips,
  onTripClick,
  onCancelTrip,
  onReviewTrip,
  onRebookTrip,
  className = ''
}: MyTripsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.hotel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || trip.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className={`space-y-6 ${className}`}>
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Trips</h2>
          <p className="text-gray-600 mt-1">{filteredTrips.length} trip(s) found</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search trips..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Trips Grid/List */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        : 'space-y-4'
      }>
        {filteredTrips.map((trip) => (
          <div
            key={trip.id}
            className={`bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer ${
              viewMode === 'list' ? 'flex items-center p-4' : 'overflow-hidden'
            }`}
            onClick={() => onTripClick(trip.id)}
          >
            {viewMode === 'grid' ? (
              <>
                <div className="aspect-video bg-gray-200">
                  <img
                    src={trip.image}
                    alt={trip.destination}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{trip.destination}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      trip.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                      trip.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{trip.hotel}</p>
                  
                  <div className="space-y-1 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(trip.checkIn).toLocaleDateString()} - {new Date(trip.checkOut).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      {trip.currency} {trip.totalCost.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {trip.status === 'upcoming' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onCancelTrip(trip.id);
                        }}
                        className="flex-1 px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                    {trip.status === 'completed' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onReviewTrip(trip.id);
                        }}
                        className="flex-1 px-3 py-2 text-sm bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                      >
                        Review
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRebookTrip(trip.id);
                      }}
                      className="flex-1 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      Rebook
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <img
                  src={trip.image}
                  alt={trip.destination}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 ml-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">{trip.destination}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      trip.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                      trip.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{trip.hotel}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{new Date(trip.checkIn).toLocaleDateString()}</span>
                    <span>{trip.currency} {trip.totalCost.toLocaleString()}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTrips.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No trips found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}
