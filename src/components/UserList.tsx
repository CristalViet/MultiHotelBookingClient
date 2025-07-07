'use client';

import { useState, useMemo } from 'react';
import { 
  Search, Eye, Edit, Trash2, Ban, CheckCircle, UserPlus,
  Users, UserCheck, UserX, Clock, Mail, Phone, Calendar
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  lastLogin: string;
  status: 'active' | 'suspended' | 'pending' | 'banned';
  userType: 'guest' | 'vip' | 'admin';
  totalBookings: number;
  totalSpent: number;
  location: string;
}

export default function UserList() {
  const [users] = useState<User[]>([
    {
      id: 'U001',
      name: 'John Smith',
      email: 'john@email.com',
      phone: '+1-555-0123',
      joinDate: '2023-06-15',
      lastLogin: '2024-02-10',
      status: 'active',
      userType: 'vip',
      totalBookings: 12,
      totalSpent: 2850,
      location: 'New York, USA'
    },
    {
      id: 'U002',
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      phone: '+1-555-0456',
      joinDate: '2023-08-22',
      lastLogin: '2024-02-08',
      status: 'active',
      userType: 'guest',
      totalBookings: 5,
      totalSpent: 1200,
      location: 'Los Angeles, USA'
    },
    {
      id: 'U003',
      name: 'Mike Chen',
      email: 'mike@email.com',
      phone: '+1-555-0789',
      joinDate: '2023-12-01',
      lastLogin: '2024-01-25',
      status: 'suspended',
      userType: 'guest',
      totalBookings: 2,
      totalSpent: 450,
      location: 'Toronto, Canada'
    },
    {
      id: 'U004',
      name: 'Emma Wilson',
      email: 'emma@email.com',
      phone: '+1-555-0321',
      joinDate: '2024-01-10',
      lastLogin: '2024-02-01',
      status: 'pending',
      userType: 'guest',
      totalBookings: 1,
      totalSpent: 300,
      location: 'London, UK'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [users, searchTerm, statusFilter]);

  const stats = useMemo(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    const suspendedUsers = users.filter(u => u.status === 'suspended').length;
    const pendingUsers = users.filter(u => u.status === 'pending').length;

    return { totalUsers, activeUsers, suspendedUsers, pendingUsers };
  }, [users]);

  const getStatusBadge = (status: string) => {
    const config = {
      active: 'bg-green-100 text-green-800',
      suspended: 'bg-yellow-100 text-yellow-800',
      pending: 'bg-blue-100 text-blue-800',
      banned: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config[status as keyof typeof config]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getUserTypeBadge = (userType: string) => {
    const config = {
      guest: 'bg-gray-100 text-gray-800',
      vip: 'bg-purple-100 text-purple-800',
      admin: 'bg-blue-100 text-blue-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config[userType as keyof typeof config]}`}>
        {userType.toUpperCase()}
      </span>
    );
  };

  const handleAction = (userId: string, action: string) => {
    console.log(`${action} user:`, userId);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <UserPlus className="w-4 h-4" />
          Add New User
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
            </div>
            <UserCheck className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Suspended</p>
              <p className="text-2xl font-bold text-gray-900">{stats.suspendedUsers}</p>
            </div>
            <UserX className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingUsers}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or user ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
            <option value="banned">Banned</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {getInitials(user.name)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">#{user.id}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center gap-1 mb-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        {user.phone}
                      </div>
                      <div className="text-xs text-gray-500">{user.location}</div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-500">Joined: {user.joinDate}</span>
                      </div>
                      <div className="text-xs text-gray-500">Last: {user.lastLogin}</div>
                      <div className="mt-1">{getUserTypeBadge(user.userType)}</div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>{user.totalBookings} bookings</div>
                      <div className="text-green-600 font-medium">${user.totalSpent}</div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      <button 
                        onClick={() => handleAction(user.id, 'edit')}
                        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      
                      {user.status === 'pending' && (
                        <button 
                          onClick={() => handleAction(user.id, 'approve')}
                          className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                          title="Approve"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      
                      {user.status === 'active' && user.userType !== 'admin' && (
                        <button 
                          onClick={() => handleAction(user.id, 'suspend')}
                          className="p-1 text-gray-400 hover:text-yellow-600 transition-colors"
                          title="Suspend"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      )}
                      
                      {user.userType !== 'admin' && (
                        <button 
                          onClick={() => handleAction(user.id, 'delete')}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
} 