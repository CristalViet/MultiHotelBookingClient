'use client';

import { useState } from 'react';
import { 
  Search, Plus, Edit, Trash2, Eye, Bed, Users, 
  Wifi, Car, Coffee, Tv, Wind, Bath, Star, Check
} from 'lucide-react';

interface Room {
  id: string;
  name: string;
  type: string;
  size: string;
  bedType: string;
  guests: number;
  price: number;
  status: 'Available' | 'Occupied' | 'Cleaning';
  image: string;
  description: string;
  amenities: string[];
  facilities: string[];
  availability: string;
}

interface RoomFilter {
  status: string;
  bedType: string;
  guests: string;
}

export default function RoomsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<RoomFilter>({
    status: 'All Status',
    bedType: 'All Types', 
    guests: 'All Rooms'
  });
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const rooms: Room[] = [
    {
      id: 'R001',
      name: 'Standard',
      type: 'Standard Room',
      size: '35 m²',
      bedType: 'Queen Bed',
      guests: 2,
      price: 100,
      status: 'Available',
      image: '/api/placeholder/240/180',
      description: 'Comfortable accommodation for both travellers or couples. Clean fresh and safe accommodation with modern amenities.',
      amenities: ['Private bathroom', 'Free WiFi', 'Air conditioning', 'TV', 'Coffee machine'],
      facilities: ['24/7 Reception', 'Room service', 'Housekeeping'],
      availability: '22/30 Rooms'
    },
    {
      id: 'R002', 
      name: 'Deluxe',
      type: 'Deluxe Room',
      size: '45 m²',
      bedType: 'King Bed',
      guests: 2,
      price: 150,
      status: 'Available',
      image: '/api/placeholder/240/180',
      description: 'More space and luxury. King bed, spacious seating, large work. So much TV, En-suite bathroom with premium amenities.',
      amenities: ['Private bathroom', 'Free WiFi', 'King bed', 'Mini bar', 'Room service'],
      facilities: ['Concierge', 'Spa access', 'Gym access'],
      availability: '18/25 Rooms'
    },
    {
      id: 'R003',
      name: 'Suite', 
      type: 'Executive Suite',
      size: '65 m²',
      bedType: 'King Bed',
      guests: 3,
      price: 250,
      status: 'Available',
      image: '/api/placeholder/240/180',
      description: 'Spacious and private suite seating area self-catering area. King bed, business desk room, kitchenette. Perfect for longer stays.',
      amenities: ['Kitchenette', 'Living area', 'Work desk', 'Premium bathroom', 'Balcony'],
      facilities: ['Butler service', 'Airport pickup', 'Premium linens'],
      availability: '8/10 Rooms'
    },
    {
      id: 'R004',
      name: 'Family',
      type: 'Family Room', 
      size: '55 m²',
      bedType: '2 Queen Beds',
      guests: 4,
      price: 200,
      status: 'Occupied',
      image: '/api/placeholder/240/180',
      description: 'Perfect comfort and privacy for families. Interconnecting rooms. Great for families visiting for 2 or more nights. Extra space for children.',
      amenities: ['Two queen beds', 'Extra space', 'Children amenities', 'Family bathroom'],
      facilities: ['Children activities', 'Family restaurant', 'Playground access'],
      availability: '5/8 Rooms'
    },
    {
      id: 'R005',
      name: 'Single',
      type: 'Single Room',
      size: '25 m²', 
      bedType: 'Single Bed',
      guests: 1,
      price: 70,
      status: 'Available',
      image: '/api/placeholder/240/180',
      description: 'Perfect for single traveller on business. Small but cozy room with essential amenities for a practical and comfortable stay.',
      amenities: ['Single bed', 'Work desk', 'Free WiFi', 'Essential toiletries'],
      facilities: ['Business center', '24/7 front desk', 'Express check-in'],
      availability: '12/15 Rooms'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Occupied': return 'bg-orange-100 text-orange-800';
      case 'Cleaning': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'All Status' || room.status === filters.status;
    const matchesBedType = filters.bedType === 'All Types' || room.bedType.includes(filters.bedType);
    const matchesGuests = filters.guests === 'All Rooms' || 
                         (filters.guests === '1 Guest' && room.guests === 1) ||
                         (filters.guests === '2 Guests' && room.guests === 2) ||
                         (filters.guests === '3+ Guests' && room.guests >= 3);
    
    return matchesSearch && matchesStatus && matchesBedType && matchesGuests;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rooms</h1>
          <p className="text-gray-600">Manage hotel room types and availability</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors">
          <Plus className="w-5 h-5" />
          Add Room
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search room type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
            >
              <option value="All Status">All Status</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Cleaning">Cleaning</option>
            </select>

            <select
              value={filters.bedType}
              onChange={(e) => setFilters({...filters, bedType: e.target.value})}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
            >
              <option value="All Types">All Types</option>
              <option value="Single">Single Bed</option>
              <option value="Queen">Queen Bed</option>
              <option value="King">King Bed</option>
            </select>

            <select
              value={filters.guests}
              onChange={(e) => setFilters({...filters, guests: e.target.value})}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
            >
              <option value="All Rooms">All Rooms</option>
              <option value="1 Guest">1 Guest</option>
              <option value="2 Guests">2 Guests</option>
              <option value="3+ Guests">3+ Guests</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Room Image */}
            <div className="relative h-48">
              <img 
                src={room.image} 
                alt={room.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(room.status)}`}>
                  {room.status}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-900">
                  ${room.price}
                </span>
              </div>
            </div>

            {/* Room Details */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                  <p className="text-sm text-gray-600">{room.type}</p>
                </div>
                <button 
                  onClick={() => setSelectedRoom(selectedRoom === room.id ? null : room.id)}
                  className="p-2 text-gray-400 hover:text-lime-600 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>

              {/* Room Specs */}
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  {room.size}
                </div>
                <div className="flex items-center gap-1">
                  <Bed className="w-4 h-4" />
                  {room.bedType}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {room.guests} guest{room.guests > 1 ? 's' : ''}
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{room.description}</p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-500">Availability: {room.availability}</span>
              </div>

              {/* Expandable Details */}
              {selectedRoom === room.id && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                  
                  {/* Amenities */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Amenities</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {room.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-green-500" />
                          {amenity}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Facilities */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Facilities</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {room.facilities.map((facility, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-green-500" />
                          {facility}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-lime-50 text-lime-700 rounded-lg hover:bg-lime-100 transition-colors">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bed className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No rooms found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
          <button className="px-6 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors">
            Clear Filters
          </button>
        </div>
      )}

      {/* Summary Card */}
      <div className="bg-lime-50 rounded-2xl p-6 border border-lime-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Elevate Hospitality Standards</h3>
            <p className="text-sm text-gray-600">Comprehensive hotel management solution</p>
          </div>
          <button className="px-6 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors">
            Update Now
          </button>
        </div>
      </div>
    </div>
  );
} 