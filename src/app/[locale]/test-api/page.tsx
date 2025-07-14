'use client';

import { useState, useEffect } from 'react';

export default function TestAPIPage() {
  const [envVars, setEnvVars] = useState<any>({});
  const [apiResult, setApiResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState('customers');

  // Available endpoints để test
  const endpoints = [
    { value: 'customers', label: '👥 Customers (Khách hàng)', description: 'Danh sách khách hàng' },
    { value: 'room_types', label: '🏨 Room Types (Loại phòng)', description: 'Các loại phòng có sẵn' },
    { value: 'hotel_rooms', label: '🚪 Hotel Rooms (Phòng)', description: 'Danh sách phòng cụ thể' },
    { value: 'bookings', label: '📅 Bookings (Đặt phòng)', description: 'Danh sách đặt phòng' },
    { value: 'orders', label: '🛒 Orders (Đơn hàng)', description: 'Đơn hàng/booking orders' },
    { value: 'countries', label: '🌍 Countries (Quốc gia)', description: 'Danh sách quốc gia' },
    { value: 'currencies', label: '💱 Currencies (Tiền tệ)', description: 'Các loại tiền tệ' }
  ];

  // Load environment variables
  useEffect(() => {
    setEnvVars({
      NEXT_PUBLIC_QLOAPPS_API_URL: process.env.NEXT_PUBLIC_QLOAPPS_API_URL,
      NEXT_PUBLIC_API_FORMAT: process.env.NEXT_PUBLIC_API_FORMAT,
    });
  }, []);

  // Test API connection
  const testAPIConnection = async () => {
    setLoading(true);
    setError(null);
    setApiResult(null);

    try {
      const response = await fetch(`/api/test-qloapps?endpoint=${selectedEndpoint}`);
      const data = await response.json();
      
      if (response.ok) {
        setApiResult(data);
      } else {
        setError(data.error || 'API call failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const selectedEndpointInfo = endpoints.find(ep => ep.value === selectedEndpoint);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🧪 qloapps API Test Page
          </h1>
          <p className="text-gray-600">
            Test kết nối và các endpoint API cho Tuần Châu Resort
          </p>
        </div>

        {/* Environment Variables */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            📋 Environment Variables
          </h2>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">API URL:</span>
                <div className="font-mono text-sm bg-gray-100 p-2 rounded mt-1">
                  {envVars.NEXT_PUBLIC_QLOAPPS_API_URL || '❌ Not set'}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">API Format:</span>
                <div className="font-mono text-sm bg-gray-100 p-2 rounded mt-1">
                  {envVars.NEXT_PUBLIC_API_FORMAT || '❌ Not set'}
                </div>
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">API Key:</span>
              <div className="font-mono text-sm bg-gray-100 p-2 rounded mt-1">
                🔐 Hidden (server-only variable)
              </div>
            </div>
          </div>
        </div>

        {/* Endpoint Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🎯 Select API Endpoint
          </h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose endpoint to test:
            </label>
            <select 
              value={selectedEndpoint}
              onChange={(e) => setSelectedEndpoint(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {endpoints.map(endpoint => (
                <option key={endpoint.value} value={endpoint.value}>
                  {endpoint.label}
                </option>
              ))}
            </select>
          </div>

          {selectedEndpointInfo && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-blue-800 text-sm">
                <strong>Endpoint:</strong> /{selectedEndpoint}
              </p>
              <p className="text-blue-700 text-sm mt-1">
                {selectedEndpointInfo.description}
              </p>
            </div>
          )}
        </div>

        {/* API Test */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🔌 API Connection Test
          </h2>
          
          <button
            onClick={testAPIConnection}
            disabled={loading}
            className="btn-primary px-6 py-3 mb-4"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Testing {selectedEndpointInfo?.label}...
              </div>
            ) : (
              `Test ${selectedEndpointInfo?.label || 'API'}`
            )}
          </button>

          {/* Results */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <h3 className="text-red-800 font-medium mb-2">❌ Error:</h3>
              <pre className="text-red-700 text-sm whitespace-pre-wrap">{error}</pre>
            </div>
          )}

          {apiResult && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-green-800 font-medium mb-2">✅ Success:</h3>
              
              {/* Summary info */}
              {apiResult.config && (
                <div className="bg-white p-3 rounded mb-3">
                  <p className="text-sm text-gray-600">
                    <strong>Endpoint:</strong> {apiResult.config.endpoint} | 
                    <strong> Time:</strong> {new Date(apiResult.config.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              )}
              
              {/* Data preview for rooms */}
              {selectedEndpoint.includes('room') && apiResult.data && (
                <div className="bg-white p-3 rounded mb-3">
                  <h4 className="font-medium text-gray-800 mb-2">🏨 Rooms Summary:</h4>
                  {apiResult.data.room_types && (
                    <p className="text-sm text-gray-600">
                      Found {apiResult.data.room_types.length} room types
                    </p>
                  )}
                  {apiResult.data.hotel_rooms && (
                    <p className="text-sm text-gray-600">
                      Found {apiResult.data.hotel_rooms.length} rooms
                    </p>
                  )}
                </div>
              )}

              {/* Full response */}
              <pre className="text-green-700 text-sm bg-white p-3 rounded overflow-auto max-h-96">
                {JSON.stringify(apiResult, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Quick Room Test */}
        {selectedEndpoint.includes('room') && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-yellow-900 mb-4">
              🏨 Room Data Tips
            </h2>
            <div className="space-y-2 text-yellow-800 text-sm">
              <p><strong>room_types:</strong> Các loại phòng (Deluxe, Suite, Standard...)</p>
              <p><strong>hotel_rooms:</strong> Phòng cụ thể (Room 101, 102, 201...)</p>
              <p><strong>Thông tin quan trọng:</strong> name, description, price, max_guests</p>
              <p><strong>Để tích hợp:</strong> Dùng data này thay thế mock rooms trong components</p>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            📝 Hướng dẫn
          </h2>
          <div className="space-y-2 text-blue-800">
            <p>1. Chọn endpoint từ dropdown (room_types để lấy danh sách phòng)</p>
            <p>2. Click "Test" để gọi API và xem kết quả</p>
            <p>3. Kiểm tra response có data rooms không</p>
            <p>4. Copy structure để tích hợp vào components booking</p>
          </div>
        </div>

      </div>
    </div>
  );
} 