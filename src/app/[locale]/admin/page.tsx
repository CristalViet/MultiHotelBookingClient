'use client';

import { useState } from 'react';
import { 
  LayoutDashboard, Calendar, MessageSquare, Users, 
  Settings, LogOut, Menu, X, Shield
} from 'lucide-react';
import AdminLogin from '@/components/AdminLogin';
import ModernAdminDashboard from '@/components/ModernAdminDashboard';
import BookingDashboard from '@/components/BookingDashboard';
import ReviewDashboard from '@/components/ReviewDashboard';
import UserList from '@/components/UserList';

type AdminSection = 'dashboard' | 'bookings' | 'reviews' | 'users';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Demo credentials check
      if (credentials.email === 'admin@hotelbook.com' && credentials.password === 'admin123') {
        setIsAuthenticated(true);
      } else {
        throw new Error('Invalid credentials. Please check your email and password.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveSection('dashboard');
    setSidebarOpen(false);
  };

  const sidebarItems = [
    { id: 'dashboard' as AdminSection, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings' as AdminSection, label: 'Bookings', icon: Calendar },
    { id: 'reviews' as AdminSection, label: 'Reviews', icon: MessageSquare },
    { id: 'users' as AdminSection, label: 'Users', icon: Users }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'bookings':
        return <BookingDashboard />;
      case 'reviews':
        return <ReviewDashboard />;
      case 'users':
        return <UserList />;
      default:
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome to the hotel booking admin panel</p>
            </div>
            
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                    <p className="text-xs text-green-600">+12% from last month</p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">$84,230</p>
                    <p className="text-xs text-green-600">+8% from last month</p>
                  </div>
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">💰</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-gray-900">2,847</p>
                    <p className="text-xs text-blue-600">+15% from last month</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Reviews</p>
                    <p className="text-2xl font-bold text-gray-900">456</p>
                    <p className="text-xs text-yellow-600">4.8 avg rating</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => setActiveSection('bookings')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <Calendar className="w-6 h-6 text-blue-600 mb-2" />
                  <h3 className="font-medium text-gray-900">Manage Bookings</h3>
                  <p className="text-sm text-gray-600">View and manage hotel reservations</p>
                </button>
                
                <button 
                  onClick={() => setActiveSection('reviews')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <MessageSquare className="w-6 h-6 text-yellow-600 mb-2" />
                  <h3 className="font-medium text-gray-900">Review Management</h3>
                  <p className="text-sm text-gray-600">Moderate guest reviews and ratings</p>
                </button>
                
                <button 
                  onClick={() => setActiveSection('users')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <Users className="w-6 h-6 text-purple-600 mb-2" />
                  <h3 className="font-medium text-gray-900">User Management</h3>
                  <p className="text-sm text-gray-600">Manage user accounts and permissions</p>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  if (!isAuthenticated) {
    return (
      <AdminLogin 
        onLogin={handleLogin}
        loading={loading}
        error={error}
      />
    );
  }

  // Use the modern Lodgify-style dashboard
  return <ModernAdminDashboard />;
} 