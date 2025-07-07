'use client';

import { useState } from 'react';
import RoomsManagement from '@/components/RoomsManagement';
import GuestProfile from '@/components/GuestProfile';
import MessagesComponent from '@/components/MessagesComponent';
import RoomDetail from '@/components/RoomDetail';

export default function AdminComponentsDemo() {
  const [activeComponent, setActiveComponent] = useState<'rooms' | 'guest' | 'messages' | 'detail'>('rooms');

  const components = [
    { id: 'rooms', label: 'Rooms Management', component: <RoomsManagement /> },
    { id: 'guest', label: 'Guest Profile', component: <GuestProfile /> },
    { id: 'messages', label: 'Messages', component: <MessagesComponent /> },
    { id: 'detail', label: 'Room Detail', component: <RoomDetail /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Components Demo</h1>
          <div className="flex gap-2">
            {components.map((comp) => (
              <button
                key={comp.id}
                onClick={() => setActiveComponent(comp.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeComponent === comp.id
                    ? 'bg-lime-500 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {comp.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {components.find(comp => comp.id === activeComponent)?.component}
      </div>
    </div>
  );
} 