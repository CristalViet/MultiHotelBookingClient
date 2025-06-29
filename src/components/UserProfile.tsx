'use client';

import { useState } from 'react';
import { 
  User, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  Edit3, 
  Settings, 
  Star, 
  Award, 
  Plane
} from 'lucide-react';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  dateOfBirth: string;
  location: string;
  joinedDate: string;
  membershipLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  preferredCurrency: string;
  preferredLanguage: string;
  bio?: string;
  verified: boolean;
}

interface UserStats {
  totalTrips: number;
  totalSpent: number;
  totalNights: number;
  favoriteDestination: string;
  reviewsGiven: number;
  averageRating: number;
  upcomingTrips: number;
  completedTrips: number;
}

interface UserProfileProps {
  user: UserData;
  stats: UserStats;
  onEditProfile: () => void;
  onViewTrips: () => void;
  onSettings: () => void;
  className?: string;
}

export default function UserProfile({
  user,
  stats,
  onEditProfile,
  onViewTrips,
  onSettings,
  className = ''
}: UserProfileProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {user.firstName} {user.lastName}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Phone: {user.phone}</p>
            <p className="text-gray-600">Location: {user.location}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Travel Stats</h3>
            <p className="text-gray-600">Total Trips: {stats.totalTrips}</p>
            <p className="text-gray-600">Total Spent: ${stats.totalSpent}</p>
            <p className="text-gray-600">Nights Stayed: {stats.totalNights}</p>
          </div>
        </div>
        
        <div className="mt-6 flex gap-2">
          <button onClick={onEditProfile} className="btn-primary">
            Edit Profile
          </button>
          <button onClick={onViewTrips} className="btn-secondary">
            View Trips
          </button>
          <button onClick={onSettings} className="btn-secondary">
            Settings
          </button>
        </div>
      </div>
    </div>
  );
} 