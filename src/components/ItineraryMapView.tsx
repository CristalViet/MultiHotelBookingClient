'use client';

import { useState } from 'react';
import { 
  Map, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  Users, 
  Filter,
  ZoomIn,
  ZoomOut,
  Navigation,
  Download,
  Share2,
  MoreVertical
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

interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface ItineraryMapViewProps {
  trips: Trip[];
  selectedTrip?: Trip;
  onTripSelect: (tripId: string) => void;
  onLocationClick: (location: Location) => void;
  className?: string;
}

export default function ItineraryMapView({
  trips,
  selectedTrip,
  onTripSelect,
  onLocationClick,
  className = ''
}: ItineraryMapViewProps) {
  const [mapView, setMapView] = useState('world');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock coordinates for demo purposes
  const getLocationCoordinates = (destination: string): Location => {
    const locations: Record<string, Location> = {
      'Tokyo, Japan': { lat: 35.6762, lng: 139.6503, name: 'Tokyo' },
      'Paris, France': { lat: 48.8566, lng: 2.3522, name: 'Paris' },
      'Bangkok, Thailand': { lat: 13.7563, lng: 100.5018, name: 'Bangkok' },
      'New York, USA': { lat: 40.7128, lng: -74.0060, name: 'New York' },
      'London, UK': { lat: 51.5074, lng: -0.1278, name: 'London' },
      'Sydney, Australia': { lat: -33.8688, lng: 151.2093, name: 'Sydney' }
    };
    
    return locations[destination] || { lat: 0, lng: 0, name: destination };
  };

  const filteredTrips = trips.filter(trip => {
    if (filterStatus === 'all') return true;
    return trip.status === filterStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return '#3B82F6'; // blue
      case 'completed': return '#10B981'; // green
      case 'cancelled': return '#EF4444'; // red
      default: return '#6B7280'; // gray
    }
  };

  const tripStats = {
    total: trips.length,
    upcoming: trips.filter(t => t.status === 'upcoming').length,
    completed: trips.filter(t => t.status === 'completed').length,
    cancelled: trips.filter(t => t.status === 'cancelled').length,
    totalSpent: trips.reduce((sum, trip) => sum + trip.totalCost, 0),
    countries: new Set(trips.map(trip => trip.destination.split(', ')[1])).size
  };

  return (
    <div className={`space-y-6 ${className}`}>
      
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Travel Map & Itinerary</h2>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{tripStats.total} trips</span>
            <span>{tripStats.countries} countries</span>
            <span>${tripStats.totalSpent.toLocaleString()} total spent</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Status Filter */}
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            
            {showFilters && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                <div className="px-3 py-2 text-sm font-medium text-gray-700 border-b border-gray-100">
                  Filter by Status
                </div>
                {['all', 'upcoming', 'completed', 'cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setFilterStatus(status);
                      setShowFilters(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 ${
                      filterStatus === status ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <span className="capitalize">{status}</span>
                    {status !== 'all' && (
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {status === 'upcoming' ? tripStats.upcoming :
                         status === 'completed' ? tripStats.completed :
                         tripStats.cancelled}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Export Options */}
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Map Section */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            
            {/* Map Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Map className="w-5 h-5" />
                  Interactive Travel Map
                </h3>
                
                <div className="flex items-center gap-2">
                  {/* Map Controls */}
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button className="p-2 hover:bg-gray-50">
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-50 border-l border-gray-300">
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-50 border-l border-gray-300">
                      <Navigation className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mock Map Display */}
            <div className="relative h-96 bg-gradient-to-br from-blue-100 to-green-100">
              
              {/* World Map Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <Map className="w-16 h-16 mx-auto mb-2" />
                  <p className="text-sm">Interactive World Map</p>
                  <p className="text-xs text-gray-500">Click on markers to view trip details</p>
                </div>
              </div>

              {/* Trip Markers */}
              {filteredTrips.map((trip, index) => {
                const location = getLocationCoordinates(trip.destination);
                const x = 20 + (index * 15) % 60; // Mock positioning
                const y = 20 + (index * 10) % 50;
                
                return (
                  <div
                    key={trip.id}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    onClick={() => onTripSelect(trip.id)}
                  >
                    <div className="relative group">
                      {/* Marker Pin */}
                      <div 
                        className={`w-6 h-6 rounded-full border-2 border-white shadow-lg transform transition-transform group-hover:scale-110 ${
                          selectedTrip?.id === trip.id ? 'ring-2 ring-blue-500' : ''
                        }`}
                        style={{ backgroundColor: getStatusColor(trip.status) }}
                      >
                        <MapPin className="w-3 h-3 text-white m-0.5" />
                      </div>
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <div className="bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                          {trip.destination}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-2 border-r-2 border-t-2 border-transparent border-t-black"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Route Lines (for visual effect) */}
              {filteredTrips.length > 1 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {filteredTrips.slice(0, -1).map((trip, index) => {
                    const x1 = 20 + (index * 15) % 60;
                    const y1 = 20 + (index * 10) % 50;
                    const x2 = 20 + ((index + 1) * 15) % 60;
                    const y2 = 20 + ((index + 1) * 10) % 50;
                    
                    return (
                      <line
                        key={`route-${index}`}
                        x1={`${x1}%`}
                        y1={`${y1}%`}
                        x2={`${x2}%`}
                        y2={`${y2}%`}
                        stroke="#6B7280"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        opacity="0.5"
                      />
                    );
                  })}
                </svg>
              )}
            </div>

            {/* Map Legend */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    <span className="text-gray-600">Upcoming ({tripStats.upcoming})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                    <span className="text-gray-600">Completed ({tripStats.completed})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-600"></div>
                    <span className="text-gray-600">Cancelled ({tripStats.cancelled})</span>
                  </div>
                </div>
                <div className="text-gray-500">
                  Click markers for details
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Details Sidebar */}
        <div className="space-y-6">
          
          {/* Selected Trip Details */}
          {selectedTrip && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Trip Details</h3>
              
              <div className="space-y-4">
                {/* Trip Image */}
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={selectedTrip.image}
                    alt={selectedTrip.destination}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Trip Info */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">{selectedTrip.destination}</h4>
                  <p className="text-sm text-gray-600">{selectedTrip.hotel}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="flex items-center gap-1 text-gray-500 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>Check-in</span>
                    </div>
                    <p className="font-medium">
                      {new Date(selectedTrip.checkIn).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-1 text-gray-500 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>Check-out</span>
                    </div>
                    <p className="font-medium">
                      {new Date(selectedTrip.checkOut).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-1 text-gray-500 mb-1">
                      <Users className="w-4 h-4" />
                      <span>Guests</span>
                    </div>
                    <p className="font-medium">{selectedTrip.guests}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-1 text-gray-500 mb-1">
                      <DollarSign className="w-4 h-4" />
                      <span>Cost</span>
                    </div>
                    <p className="font-medium">{selectedTrip.currency} {selectedTrip.totalCost.toLocaleString()}</p>
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedTrip.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                    selectedTrip.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedTrip.status.charAt(0).toUpperCase() + selectedTrip.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Trip Statistics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Travel Statistics</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Trips</span>
                <span className="font-medium">{tripStats.total}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Countries Visited</span>
                <span className="font-medium">{tripStats.countries}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Spent</span>
                <span className="font-medium">${tripStats.totalSpent.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg per Trip</span>
                <span className="font-medium">
                  ${Math.round(tripStats.totalSpent / tripStats.total).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 text-left bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                <Download className="w-4 h-4" />
                <span>Download Itinerary</span>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 text-left bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share Travel Map</span>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 text-left bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                <Map className="w-4 h-4" />
                <span>Plan New Trip</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
