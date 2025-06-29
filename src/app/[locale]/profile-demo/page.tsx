'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import UserProfile from '@/components/UserProfile';
import EditProfileForm from '@/components/EditProfileForm';
import MyTripsList from '@/components/MyTripsList';
import TripCard from '@/components/TripCard';
import ItineraryMapView from '@/components/ItineraryMapView';

export default function ProfileDemoPage() {
  const t = useTranslations();
  const [currentDemo, setCurrentDemo] = useState('user-profile');
  const [isEditMode, setIsEditMode] = useState(false);

  // Mock user data
  const mockUser = {
    id: 'user-123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    dateOfBirth: '1990-05-15',
    location: 'San Francisco, CA',
    joinedDate: '2022-03-10',
    membershipLevel: 'Gold' as const,
    preferredCurrency: 'USD',
    preferredLanguage: 'en',
    bio: 'Passionate traveler who loves exploring new cultures and cuisines. Always planning the next adventure!',
    verified: true
  };

  const mockStats = {
    totalTrips: 24,
    totalSpent: 15420,
    totalNights: 156,
    favoriteDestination: 'Tokyo, Japan',
    reviewsGiven: 32,
    averageRating: 4.8,
    upcomingTrips: 3,
    completedTrips: 21
  };

  // Mock trips data
  const mockTrips = [
    {
      id: 'trip-1',
      destination: 'Tokyo, Japan',
      hotel: 'Park Hyatt Tokyo',
      checkIn: '2024-03-15',
      checkOut: '2024-03-20',
      guests: 2,
      rooms: 1,
      status: 'upcoming',
      totalCost: 2400,
      currency: 'USD',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
      bookingReference: 'HTL-2024-001',
      roomType: 'Deluxe Park View'
    },
    {
      id: 'trip-2',
      destination: 'Paris, France',
      hotel: 'The Ritz Paris',
      checkIn: '2024-01-10',
      checkOut: '2024-01-15',
      guests: 2,
      rooms: 1,
      status: 'completed',
      totalCost: 3200,
      currency: 'USD',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400',
      bookingReference: 'HTL-2024-002',
      roomType: 'Junior Suite',
      rating: 5,
      review: 'Absolutely wonderful stay! The service was impeccable and the location perfect.'
    },
    {
      id: 'trip-3',
      destination: 'Bangkok, Thailand',
      hotel: 'Mandarin Oriental Bangkok',
      checkIn: '2023-11-20',
      checkOut: '2023-11-25',
      guests: 1,
      rooms: 1,
      status: 'completed',
      totalCost: 1800,
      currency: 'USD',
      image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400',
      bookingReference: 'HTL-2023-015',
      roomType: 'River View Room',
      rating: 4,
      review: 'Great location by the river. Amazing breakfast and spa facilities.'
    }
  ];

  const demoSections = [
    { id: 'user-profile', label: '1. User Profile', component: 'UserProfile' },
    { id: 'edit-profile', label: '2. Edit Profile Form', component: 'EditProfileForm' },
    { id: 'trips-list', label: '3. My Trips List', component: 'MyTripsList' },
    { id: 'trip-card', label: '4. Trip Card', component: 'TripCard' },
    { id: 'map-view', label: '5. Itinerary Map View', component: 'ItineraryMapView' }
  ];

  const handleEditProfile = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  const handleSaveProfile = async (data: any) => {
    console.log('Saving profile:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Profile saved successfully!');
    setIsEditMode(false);
  };

  const handleViewTrips = () => {
    setCurrentDemo('trips-list');
  };

  const handleSettings = () => {
    alert('Settings clicked - would navigate to settings page');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🟤 User Profile & Trip Components Demo
          </h1>
          <p className="text-lg text-gray-600">
            Test all 5 user profile and trip management components
          </p>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              {demoSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setCurrentDemo(section.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentDemo === section.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Demo Content */}
        <div className="space-y-8">

          {/* UserProfile Demo */}
          {currentDemo === 'user-profile' && !isEditMode && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  UserProfile Component
                </h2>
                <p className="text-gray-600">
                  Complete user profile with tabs, achievements, statistics, and quick actions.
                </p>
              </div>

              <UserProfile
                user={mockUser}
                stats={mockStats}
                onEditProfile={handleEditProfile}
                onViewTrips={handleViewTrips}
                onSettings={handleSettings}
              />

              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Features:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">User Info:</h4>
                    <ul className="space-y-1">
                      <li>• Profile picture with edit</li>
                      <li>• Membership level badge</li>
                      <li>• Verification status</li>
                      <li>• Bio and location</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Statistics:</h4>
                    <ul className="space-y-1">
                      <li>• Travel stats overview</li>
                      <li>• Achievement system</li>
                      <li>• Recent activity feed</li>
                      <li>• Favorite destinations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Navigation:</h4>
                    <ul className="space-y-1">
                      <li>• Multiple tab sections</li>
                      <li>• Quick action buttons</li>
                      <li>• Settings integration</li>
                      <li>• Responsive design</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* EditProfileForm Demo */}
          {(currentDemo === 'edit-profile' || isEditMode) && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  EditProfileForm Component
                </h2>
                <p className="text-gray-600">
                  Multi-section form for editing user profile with validation and file upload.
                </p>
              </div>

              <EditProfileForm
                initialData={{
                  firstName: mockUser.firstName,
                  lastName: mockUser.lastName,
                  email: mockUser.email,
                  phone: mockUser.phone,
                  dateOfBirth: mockUser.dateOfBirth,
                  location: mockUser.location,
                  bio: mockUser.bio || '',
                  avatar: mockUser.avatar,
                  preferredCurrency: mockUser.preferredCurrency,
                  preferredLanguage: mockUser.preferredLanguage
                }}
                onSave={handleSaveProfile}
                onCancel={handleCancelEdit}
                isLoading={false}
              />

              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Features:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Form Sections:</h4>
                    <ul className="space-y-1">
                      <li>• Personal information</li>
                      <li>• Contact details</li>
                      <li>• App preferences</li>
                      <li>• Security settings</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Features:</h4>
                    <ul className="space-y-1">
                      <li>• Real-time validation</li>
                      <li>• File upload for avatar</li>
                      <li>• Password change</li>
                      <li>• Unsaved changes warning</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MyTripsList Demo */}
          {currentDemo === 'trips-list' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  MyTripsList Component
                </h2>
                <p className="text-gray-600">
                  List of user trips with filtering, sorting, and status management.
                </p>
              </div>

              <MyTripsList
                trips={mockTrips}
                onTripClick={(tripId) => console.log('Trip clicked:', tripId)}
                onCancelTrip={(tripId) => console.log('Cancel trip:', tripId)}
                onReviewTrip={(tripId) => console.log('Review trip:', tripId)}
                onRebookTrip={(tripId) => console.log('Rebook trip:', tripId)}
              />

              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Features:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Trip Management:</h4>
                    <ul className="space-y-1">
                      <li>• Trip status filtering</li>
                      <li>• Date range filtering</li>
                      <li>• Search by destination</li>
                      <li>• Sort by date/price</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Actions:</h4>
                    <ul className="space-y-1">
                      <li>• View trip details</li>
                      <li>• Cancel bookings</li>
                      <li>• Write reviews</li>
                      <li>• Rebook similar trips</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Display:</h4>
                    <ul className="space-y-1">
                      <li>• Grid and list views</li>
                      <li>• Trip statistics</li>
                      <li>• Status indicators</li>
                      <li>• Quick actions menu</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TripCard Demo */}
          {currentDemo === 'trip-card' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  TripCard Component
                </h2>
                <p className="text-gray-600">
                  Individual trip card with detailed information and action buttons.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTrips.map((trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    onViewDetails={(tripId) => console.log('View details:', tripId)}
                    onCancel={(tripId) => console.log('Cancel:', tripId)}
                    onReview={(tripId) => console.log('Review:', tripId)}
                    onRebook={(tripId) => console.log('Rebook:', tripId)}
                  />
                ))}
              </div>

              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">TripCard Variants:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Upcoming Trips:</h4>
                    <ul className="space-y-1">
                      <li>• Countdown timer</li>
                      <li>• Check-in reminder</li>
                      <li>• Cancel option</li>
                      <li>• Modify booking</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Completed Trips:</h4>
                    <ul className="space-y-1">
                      <li>• Review & rating</li>
                      <li>• Photo gallery</li>
                      <li>• Rebook option</li>
                      <li>• Share experience</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Cancelled Trips:</h4>
                    <ul className="space-y-1">
                      <li>• Refund status</li>
                      <li>• Rebook similar</li>
                      <li>• Archive option</li>
                      <li>• Support contact</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ItineraryMapView Demo */}
          {currentDemo === 'map-view' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  ItineraryMapView Component
                </h2>
                <p className="text-gray-600">
                  Interactive map showing trip locations, itineraries, and travel routes.
                </p>
              </div>

              <ItineraryMapView
                trips={mockTrips}
                selectedTrip={mockTrips[0]}
                onTripSelect={(tripId) => console.log('Trip selected:', tripId)}
                onLocationClick={(location) => console.log('Location clicked:', location)}
              />

              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Map Features:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Map Display:</h4>
                    <ul className="space-y-1">
                      <li>• Interactive world map</li>
                      <li>• Trip location markers</li>
                      <li>• Travel route lines</li>
                      <li>• Zoom & pan controls</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Trip Details:</h4>
                    <ul className="space-y-1">
                      <li>• Hotel location pins</li>
                      <li>• Trip duration info</li>
                      <li>• Status indicators</li>
                      <li>• Photo previews</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Interactions:</h4>
                    <ul className="space-y-1">
                      <li>• Click to select trips</li>
                      <li>• Hover for quick info</li>
                      <li>• Filter by date/status</li>
                      <li>• Export itinerary</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Usage Examples */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            📝 Integration Examples
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">User Profile Integration:</h3>
              <pre className="bg-gray-100 rounded p-3 text-sm overflow-x-auto">
{`import UserProfile from '@/components/UserProfile';

function ProfilePage() {
  return (
    <UserProfile
      user={userData}
      stats={userStats}
      onEditProfile={() => setEditMode(true)}
      onViewTrips={() => navigate('/trips')}
      onSettings={() => navigate('/settings')}
    />
  );
}`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Trip Management:</h3>
              <pre className="bg-gray-100 rounded p-3 text-sm overflow-x-auto">
{`import MyTripsList from '@/components/MyTripsList';

function TripsPage() {
  return (
    <MyTripsList
      trips={userTrips}
      onTripClick={handleTripView}
      onCancelTrip={handleCancel}
      onReviewTrip={handleReview}
    />
  );
}`}
              </pre>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-gray-900 mb-2">Component Props Summary:</h3>
            <div className="bg-gray-100 rounded p-3 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div><strong>UserProfile:</strong> user, stats, onEditProfile, onViewTrips, onSettings</div>
                  <div><strong>EditProfileForm:</strong> initialData, onSave, onCancel, isLoading</div>
                  <div><strong>MyTripsList:</strong> trips, onTripClick, onCancelTrip, onReviewTrip</div>
                </div>
                <div>
                  <div><strong>TripCard:</strong> trip, onViewDetails, onCancel, onReview, onRebook</div>
                  <div><strong>ItineraryMapView:</strong> trips, selectedTrip, onTripSelect, onLocationClick</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
