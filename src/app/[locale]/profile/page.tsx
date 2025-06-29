'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import UserProfile from '@/components/UserProfile';
import EditProfileForm from '@/components/EditProfileForm';

export default function ProfilePage() {
  const t = useTranslations();
  const [isEditMode, setIsEditMode] = useState(false);

  // Mock user data - in real app, this would come from API/context
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
    // Navigate to trips page
    window.location.href = '/vi/bookings';
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
            {isEditMode ? 'Edit Profile' : 'My Profile'}
          </h1>
          <p className="text-lg text-gray-600">
            {isEditMode ? 'Update your personal information' : 'Manage your account and view your travel history'}
          </p>
        </div>

        {/* Content */}
        {isEditMode ? (
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
          />
        ) : (
          <UserProfile
            user={mockUser}
            stats={mockStats}
            onEditProfile={handleEditProfile}
            onViewTrips={handleViewTrips}
            onSettings={handleSettings}
          />
        )}

      </div>
    </div>
  );
} 