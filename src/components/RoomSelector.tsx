'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Plus, Minus, Users, Bed, ChevronDown, X } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  price: { current: number; currency: string };
  maxGuests: number;
  maxAdults?: number;
  maxChildren?: number;
}

interface SelectedRoom {
  room: Room;
  quantity: number;
  guests: { adults: number; children: number };
}

interface RoomSelectorProps {
  rooms: Room[];
  onSelectionChange?: (selectedRooms: SelectedRoom[]) => void;
  compact?: boolean;
  className?: string;
}

export default function RoomSelector({ 
  rooms, 
  onSelectionChange, 
  compact = false,
  className = "" 
}: RoomSelectorProps) {
  const t = useTranslations('booking');
  const [selectedRooms, setSelectedRooms] = useState<SelectedRoom[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addRoom = (room: Room) => {
    const existing = selectedRooms.find(r => r.room.id === room.id);
    if (existing) {
      updateQuantity(room.id, 1);
    } else {
      const newRoom: SelectedRoom = {
        room,
        quantity: 1,
        guests: { adults: 1, children: 0 }
      };
      const updated = [...selectedRooms, newRoom];
      setSelectedRooms(updated);
      onSelectionChange?.(updated);
    }
    setIsOpen(false);
  };

  const updateQuantity = (roomId: string, delta: number) => {
    const updated = selectedRooms.map(selectedRoom => {
      if (selectedRoom.room.id === roomId) {
        const newQuantity = Math.max(1, selectedRoom.quantity + delta);
        return { ...selectedRoom, quantity: newQuantity };
      }
      return selectedRoom;
    }).filter(room => room.quantity > 0);
    setSelectedRooms(updated);
    onSelectionChange?.(updated);
  };

  const updateGuests = (roomId: string, adults: number, children: number) => {
    const updated = selectedRooms.map(selectedRoom => {
      if (selectedRoom.room.id === roomId) {
        const maxAdults = selectedRoom.room.maxAdults || selectedRoom.room.maxGuests;
        const maxChildren = selectedRoom.room.maxChildren || selectedRoom.room.maxGuests - 1;
        
        const validAdults = Math.max(1, Math.min(maxAdults, adults));
        const validChildren = Math.max(0, Math.min(maxChildren, children));
        
        // Check total doesn't exceed max guests
        const total = validAdults + validChildren;
        if (total <= selectedRoom.room.maxGuests) {
          return { ...selectedRoom, guests: { adults: validAdults, children: validChildren } };
        }
      }
      return selectedRoom;
    });
    setSelectedRooms(updated);
    onSelectionChange?.(updated);
  };

  const removeRoom = (roomId: string) => {
    const updated = selectedRooms.filter(r => r.room.id !== roomId);
    setSelectedRooms(updated);
    onSelectionChange?.(updated);
  };

  const getTotalPrice = () => {
    return selectedRooms.reduce((total, selectedRoom) => 
      total + selectedRoom.room.price.current * selectedRoom.quantity, 0
    );
  };

  const getTotalRooms = () => {
    return selectedRooms.reduce((total, room) => total + room.quantity, 0);
  };

  const getTotalGuests = () => {
    return selectedRooms.reduce((total, room) => 
      total + (room.guests.adults + room.guests.children) * room.quantity, 0
    );
  };

  if (compact) {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <div className="flex items-center space-x-2">
            <Bed className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">
              {selectedRooms.length > 0 
                ? `${getTotalRooms()} rooms, ${getTotalGuests()} guests`
                : 'Select rooms'
              }
            </span>
          </div>
          <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-3">Select Rooms</h3>
              
              {/* Available Rooms */}
              <div className="space-y-2 mb-4">
                {rooms.map(room => (
                  <button
                    key={room.id}
                    onClick={() => addRoom(room)}
                    className="w-full p-3 text-left border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-sm">{room.name}</div>
                        <div className="text-xs text-gray-500">Max {room.maxGuests} guests</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-sm">{room.price.currency}{room.price.current}</div>
                        <div className="text-xs text-gray-500">per night</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Rooms */}
              {selectedRooms.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-medium text-sm text-gray-900 mb-3">Selected Rooms</h4>
                  <div className="space-y-3">
                    {selectedRooms.map(selectedRoom => (
                      <div key={selectedRoom.room.id} className="bg-gray-50 rounded p-3">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-xs">{selectedRoom.room.name}</h5>
                          <button
                            onClick={() => removeRoom(selectedRoom.room.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-600">Quantity:</span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(selectedRoom.room.id, -1)}
                              disabled={selectedRoom.quantity <= 1}
                              className="w-5 h-5 border rounded flex items-center justify-center text-xs hover:bg-gray-100 disabled:opacity-50"
                            >
                              <Minus className="h-2 w-2" />
                            </button>
                            <span className="text-xs w-6 text-center">{selectedRoom.quantity}</span>
                            <button
                              onClick={() => updateQuantity(selectedRoom.room.id, 1)}
                              className="w-5 h-5 border rounded flex items-center justify-center text-xs hover:bg-gray-100"
                            >
                              <Plus className="h-2 w-2" />
                            </button>
                          </div>
                        </div>

                        {/* Guests */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">Adults:</span>
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => updateGuests(
                                  selectedRoom.room.id, 
                                  Math.max(1, selectedRoom.guests.adults - 1), 
                                  selectedRoom.guests.children
                                )}
                                disabled={selectedRoom.guests.adults <= 1}
                                className="w-5 h-5 border rounded flex items-center justify-center text-xs hover:bg-gray-100 disabled:opacity-50"
                              >
                                <Minus className="h-2 w-2" />
                              </button>
                              <span className="text-xs w-4 text-center">{selectedRoom.guests.adults}</span>
                              <button
                                onClick={() => updateGuests(
                                  selectedRoom.room.id, 
                                  selectedRoom.guests.adults + 1, 
                                  selectedRoom.guests.children
                                )}
                                className="w-5 h-5 border rounded flex items-center justify-center text-xs hover:bg-gray-100"
                              >
                                <Plus className="h-2 w-2" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">Children:</span>
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => updateGuests(
                                  selectedRoom.room.id, 
                                  selectedRoom.guests.adults, 
                                  Math.max(0, selectedRoom.guests.children - 1)
                                )}
                                disabled={selectedRoom.guests.children <= 0}
                                className="w-5 h-5 border rounded flex items-center justify-center text-xs hover:bg-gray-100 disabled:opacity-50"
                              >
                                <Minus className="h-2 w-2" />
                              </button>
                              <span className="text-xs w-4 text-center">{selectedRoom.guests.children}</span>
                              <button
                                onClick={() => updateGuests(
                                  selectedRoom.room.id, 
                                  selectedRoom.guests.adults, 
                                  selectedRoom.guests.children + 1
                                )}
                                className="w-5 h-5 border rounded flex items-center justify-center text-xs hover:bg-gray-100"
                              >
                                <Plus className="h-2 w-2" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right mt-2">
                          <span className="text-xs font-semibold">
                            {selectedRoom.room.price.currency}{selectedRoom.room.price.current * selectedRoom.quantity}/night
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Total */}
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">Total:</span>
                        <span className="font-bold">${getTotalPrice()}/night</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Regular (non-compact) version - tương tự như trước
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Implementation for non-compact version */}
      <div className="text-center text-gray-500">
        Regular RoomSelector - implement full version here
      </div>
    </div>
  );
}


