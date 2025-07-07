'use client';

import { useState } from 'react';
import { 
  ArrowLeft, Users, Bed, Maximize, Wifi, Car, Coffee, 
  Tv, Wind, Bath, Check, Star, Edit, Eye, Trash2
} from 'lucide-react';

interface RoomFeature {
  id: string;
  name: string;
  icon: React.ReactNode;
  included: boolean;
}

interface RoomFacility {
  id: string;
  name: string;
  description?: string;
}

interface RoomAmenity {
  id: string;
  name: string;
  category: 'bathroom' | 'technology' | 'comfort' | 'service';
}

export default function RoomDetail() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);

  const roomData = {
    id: 'R002',
    name: 'Deluxe Room',
    category: 'Premium Deluxe Room',
    status: 'Available',
    price: 150,
    currency: 'USD',
    size: '45 m²',
    bedType: 'King Bed',
    maxGuests: 2,
    description: 'Experience luxury and comfort in our spacious Deluxe Room. Perfect for couples seeking a romantic getaway or business travelers who appreciate refined amenities and stunning city views.',
    longDescription: 'More space and luxury. King bed, spacious seating, large work. So much TV, En-suite bathroom with rain shower and premium amenities. Our deluxe rooms are designed with sophisticated furniture and modern conveniences to ensure your stay is both comfortable and productive.',
    availability: '18/25 Rooms',
    images: [
      '/api/placeholder/600/400',
      '/api/placeholder/600/400', 
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ]
  };

  const features: RoomFeature[] = [
    { id: '1', name: 'Private balcony (bathroom)', icon: <Bath className="w-5 h-5" />, included: true },
    { id: '2', name: 'Spacious balcony with 3 windows', icon: <Maximize className="w-5 h-5" />, included: true },
    { id: '3', name: 'Large windows offering city or ocean views', icon: <Eye className="w-5 h-5" />, included: true },
    { id: '4', name: 'High speed Wi-Fi', icon: <Wifi className="w-5 h-5" />, included: false },
    { id: '5', name: 'Flat screen TV', icon: <Tv className="w-5 h-5" />, included: true },
    { id: '6', name: 'Air conditioning', icon: <Wind className="w-5 h-5" />, included: true }
  ];

  const facilities: RoomFacility[] = [
    { id: '1', name: 'High speed Wi-Fi' },
    { id: '2', name: 'Flat screen TV' },
    { id: '3', name: 'Air conditioning' },
    { id: '4', name: 'In-room safe' },
    { id: '5', name: 'Coffee/tea making facilities' },
    { id: '6', name: 'Hair dryer' },
    { id: '7', name: 'Luxury toiletries' },
    { id: '8', name: 'Bathrobes and slippers' }
  ];

  const amenities: RoomAmenity[] = [
    { id: '1', name: 'Complimentary bottled water', category: 'service' },
    { id: '2', name: 'Coffee and tea making facilities', category: 'comfort' },
    { id: '3', name: 'Premium bedding and linens', category: 'comfort' },
    { id: '4', name: 'Ensuite bathroom with shower and bathtub', category: 'bathroom' },
    { id: '5', name: 'Hairdryer', category: 'bathroom' },
    { id: '6', name: 'Luxury toiletries', category: 'bathroom' },
    { id: '7', name: 'Bathrobes and slippers', category: 'bathroom' },
    { id: '8', name: '24-hour room service', category: 'service' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Occupied': return 'bg-orange-100 text-orange-800';
      case 'Cleaning': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Room Detail</h1>
            <p className="text-gray-600">{roomData.name} • {roomData.category}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(roomData.status)}`}>
            {roomData.status}
          </span>
          <button className="px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors">
            <Edit className="w-4 h-4 inline mr-2" />
            Edit Room
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Images and Description */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Image Gallery */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Room Images</h3>
              <button 
                onClick={() => setShowAllImages(!showAllImages)}
                className="text-sm text-lime-600 hover:text-lime-700"
              >
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <img
                  src={roomData.images[selectedImage]}
                  alt={`${roomData.name} - Image ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
                  {selectedImage + 1} / {roomData.images.length}
                </div>
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {roomData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-lime-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Room Description */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Description</h3>
            <p className="text-gray-600 mb-4">{roomData.description}</p>
            <p className="text-gray-600">{roomData.longDescription}</p>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-center gap-3">
                  {feature.included ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                  )}
                  <div className="flex items-center gap-2">
                    {feature.icon}
                    <span className={`text-sm ${feature.included ? 'text-gray-900' : 'text-gray-500'}`}>
                      {feature.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Room Info and Details */}
        <div className="space-y-6">
          
          {/* Room Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{roomData.name}</h3>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">${roomData.price}</div>
                <div className="text-sm text-gray-500">per night</div>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Maximize className="w-4 h-4" />
                {roomData.size}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Bed className="w-4 h-4" />
                {roomData.bedType}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                {roomData.maxGuests} guests
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Availability</span>
                <span className="font-medium text-gray-900">{roomData.availability}</span>
              </div>
            </div>
          </div>

          {/* Facilities */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Facilities</h3>
            <div className="space-y-2">
              {facilities.map((facility) => (
                <div key={facility.id} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-900">{facility.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
            <div className="space-y-2">
              {amenities.map((amenity) => (
                <div key={amenity.id} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-900">{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors">
                <Edit className="w-4 h-4" />
                Edit Room Details
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Eye className="w-4 h-4" />
                View Bookings
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4" />
                Delete Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 