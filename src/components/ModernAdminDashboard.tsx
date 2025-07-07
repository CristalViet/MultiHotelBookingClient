'use client';

import { useState } from 'react';
import { 
  LayoutDashboard, Calendar, MessageSquare, Users, Settings, Search,
  Home, Bed, ClipboardList, Package, DollarSign, Star, Bell, 
  ChevronDown, Plus, TrendingUp, TrendingDown, Eye
} from 'lucide-react';
import BookingDashboard from './BookingDashboard';
import ReviewDashboard from './ReviewDashboard';
import UserList from './UserList';
import RoomsManagement from './RoomsManagement';
import GuestProfile from './GuestProfile';
import MessagesComponent from './MessagesComponent';
import RoomDetail from './RoomDetail';

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ReactNode;
  color: string;
}

interface TaskItem {
  id: string;
  title: string;
  date: string;
  color: string;
}

export default function ModernAdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [timeFilter, setTimeFilter] = useState('Last 6 Months');

  const renderMainContent = () => {
    switch (activeSection) {
      case 'reservation':
        return <BookingDashboard />;
      case 'rooms':
        return <RoomsManagement />;
      case 'room-detail':
        return <RoomDetail />;
      case 'messages':
        return <MessagesComponent />;
      case 'reviews':
        return <ReviewDashboard />;
      case 'concierge':
        return <UserList />;
      case 'guest-profile':
        return <GuestProfile />;
      default:
        return renderDashboardContent();
    }
  };

  const renderDashboardContent = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Room Availability */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Room Availability</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <Eye className="w-5 h-5" />
              </button>
            </div>
            
            {/* Visual Chart Placeholder */}
            <div className="h-32 bg-gradient-to-r from-green-100 via-yellow-100 to-red-100 rounded-xl mb-6 relative overflow-hidden">
              <div className="absolute inset-0 flex">
                <div className="flex-1 bg-green-200"></div>
                <div className="w-16 bg-yellow-200"></div>
                <div className="w-8 bg-blue-200"></div>
                <div className="w-6 bg-red-200"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Occupied</p>
                <p className="text-2xl font-bold text-gray-900">{roomAvailability.occupied}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Reserved</p>
                <p className="text-2xl font-bold text-gray-900">{roomAvailability.reserved}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Available</p>
                <p className="text-2xl font-bold text-gray-900">{roomAvailability.available}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Not Ready</p>
                <p className="text-2xl font-bold text-gray-900">{roomAvailability.notReady}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-lime-100 text-gray-700 rounded-lg text-sm font-medium">
                  {timeFilter}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Revenue Chart Placeholder */}
            <div className="h-64 bg-gradient-to-t from-lime-50 to-transparent rounded-xl relative overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-r from-lime-200 via-lime-300 to-lime-200 opacity-60 rounded-b-xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-white px-3 py-2 rounded-lg shadow-lg border">
                  <p className="text-sm font-semibold text-gray-900">$315,060</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Overall Rating */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Overall Rating</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <Eye className="w-5 h-5" />
            </button>
          </div>
          
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-gray-900 mb-1">{overallRating.score}</div>
            <div className="text-sm font-medium text-lime-600 mb-1">{overallRating.feedback}</div>
            <div className="text-xs text-gray-500">{overallRating.reviews}</div>
          </div>

          <div className="space-y-3">
            {overallRating.breakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.category}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-lime-400 rounded-full"
                      style={{ width: `${(item.score / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">{item.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Tasks</h3>
            <button className="p-2 bg-lime-100 text-lime-700 rounded-lg hover:bg-lime-200 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className={`p-4 rounded-xl ${task.color} border border-gray-200`}>
                <p className="text-sm font-medium text-gray-900 mb-1">{task.title}</p>
                <p className="text-xs text-gray-600">{task.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking by Platform */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Booking by Platform</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <Eye className="w-5 h-5" />
            </button>
          </div>
          
          {/* Pie Chart Placeholder */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="w-32 h-32 rounded-full border-8 border-lime-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-lime-400 to-lime-300" 
                   style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)' }}>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-gray-900">61%</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-lime-400 rounded-full"></div>
                <span className="text-sm text-gray-600">Direct Booking</span>
              </div>
              <span className="text-sm font-medium text-gray-900">61%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-600">Booking.com</span>
              </div>
              <span className="text-sm font-medium text-gray-900">12%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button 
            onClick={() => setActiveSection('reservation')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <Calendar className="w-6 h-6 text-blue-600 mb-2" />
            <h4 className="font-medium text-gray-900">Manage Bookings</h4>
            <p className="text-sm text-gray-600">View and manage hotel reservations</p>
          </button>
          
          <button 
            onClick={() => setActiveSection('rooms')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <Bed className="w-6 h-6 text-green-600 mb-2" />
            <h4 className="font-medium text-gray-900">Rooms Management</h4>
            <p className="text-sm text-gray-600">Manage room types and availability</p>
          </button>
          
          <button 
            onClick={() => setActiveSection('messages')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <MessageSquare className="w-6 h-6 text-purple-600 mb-2" />
            <h4 className="font-medium text-gray-900">Guest Messages</h4>
            <p className="text-sm text-gray-600">Communicate with guests in real-time</p>
          </button>
          
          <button 
            onClick={() => setActiveSection('reviews')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <Star className="w-6 h-6 text-yellow-600 mb-2" />
            <h4 className="font-medium text-gray-900">Review Management</h4>
            <p className="text-sm text-gray-600">Moderate guest reviews and ratings</p>
          </button>
          
          <button 
            onClick={() => setActiveSection('concierge')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <Users className="w-6 h-6 text-indigo-600 mb-2" />
            <h4 className="font-medium text-gray-900">User Management</h4>
            <p className="text-sm text-gray-600">Manage user accounts and permissions</p>
          </button>
          
          <button 
            onClick={() => setActiveSection('guest-profile')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <Users className="w-6 h-6 text-pink-600 mb-2" />
            <h4 className="font-medium text-gray-900">Guest Profiles</h4>
            <p className="text-sm text-gray-600">View detailed guest information</p>
          </button>
        </div>
      </div>
    </div>
  );

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, active: true },
    { id: 'reservation', label: 'Reservation', icon: Calendar },
    { id: 'rooms', label: 'Rooms', icon: Bed },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 1 },
    { id: 'housekeeping', label: 'Housekeeping', icon: ClipboardList },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'financials', label: 'Financials', icon: DollarSign },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'concierge', label: 'Concierge', icon: Users }
  ];

  const statCards: StatCardProps[] = [
    {
      title: 'New Bookings',
      value: '840',
      change: '+8.70%',
      changeType: 'positive',
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Check-In',
      value: '231',
      change: '+3.56%',
      changeType: 'positive',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Check-Out',
      value: '124',
      change: '-1.86%',
      changeType: 'negative',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-red-50 border-red-200'
    },
    {
      title: 'Total Revenue',
      value: '$123,980',
      change: '+5.70%',
      changeType: 'positive',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-emerald-50 border-emerald-200'
    }
  ];

  const roomAvailability = {
    occupied: 286,
    reserved: 87,
    available: 32,
    notReady: 13
  };

  const tasks: TaskItem[] = [
    { id: '1', title: 'Set Up Conference Room B for 10 AM Meeting', date: 'June 19, 2028', color: 'bg-blue-100' },
    { id: '2', title: 'Restock Housekeeping Supplies on 3rd Floor', date: 'June 19, 2028', color: 'bg-yellow-100' },
    { id: '3', title: 'Inspect and Clean the Pool Area', date: 'June 20, 2028', color: 'bg-green-100' }
  ];

  const overallRating = {
    score: 4.6,
    feedback: 'Impressive',
    reviews: '400 reviews',
    breakdown: [
      { category: 'Facilities', score: 4.4 },
      { category: 'Cleanliness', score: 4.7 },
      { category: 'Services', score: 4.6 },
      { category: 'Comfort', score: 4.8 },
      { category: 'Location', score: 4.5 }
    ]
  };

  const StatCard = ({ title, value, change, changeType, icon, color }: StatCardProps) => (
    <div className={`p-6 rounded-2xl border ${color} relative overflow-hidden`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          <div className="flex items-center gap-1">
            {changeType === 'positive' ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600" />
            )}
            <span className={`text-sm font-medium ${
              changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {change}
            </span>
            <span className="text-sm text-gray-500 ml-1">from last week</span>
          </div>
        </div>
        <div className={`p-3 rounded-xl ${
          changeType === 'positive' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        }`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Lodgify</h1>
              <span className="text-xs bg-lime-200 text-lime-800 px-2 py-0.5 rounded-full font-medium">
                V1.0
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all duration-200 group ${
                activeSection === item.id
                  ? 'bg-lime-100 text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${
                activeSection === item.id ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'
              }`} />
              <span className="font-medium">{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hotel Management Dashboard</h1>
              <div className="flex items-center gap-6 mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
                  Auto Layout
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
                  Modern Design Style
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
                  30+ Unique Widgets
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search room, guest, book, etc"
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-lime-400"
                />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Settings className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 ml-4">
                <img
                  src="/api/placeholder/40/40"
                  alt="Admin"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">Jaylon Dorwart</p>
                  <p className="text-sm text-gray-500">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
} 