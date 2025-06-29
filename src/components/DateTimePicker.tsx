'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface DateTimePickerProps {
  checkIn?: Date;
  checkOut?: Date;
  onCheckInChange?: (date: Date) => void;
  onCheckOutChange?: (date: Date) => void;
  minStayNights?: number;
  maxStayNights?: number;
  blackoutDates?: Date[];
  showTimeSelection?: boolean;
  earlyCheckIn?: boolean;
  lateCheckOut?: boolean;
  className?: string;
}

interface TimeSlot {
  value: string;
  label: string;
  available: boolean;
  extraFee?: number;
}

export default function DateTimePicker({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  minStayNights = 1,
  maxStayNights = 30,
  blackoutDates = [],
  showTimeSelection = false,
  earlyCheckIn = true,
  lateCheckOut = true,
  className = ""
}: DateTimePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [selectingCheckIn, setSelectingCheckIn] = useState(true);
  const [selectedCheckIn, setSelectedCheckIn] = useState<Date | null>(checkIn || null);
  const [selectedCheckOut, setSelectedCheckOut] = useState<Date | null>(checkOut || null);
  const [showCheckInTime, setShowCheckInTime] = useState(false);
  const [showCheckOutTime, setShowCheckOutTime] = useState(false);
  const [checkInTime, setCheckInTime] = useState('15:00');
  const [checkOutTime, setCheckOutTime] = useState('11:00');
  
  const pickerRef = useRef<HTMLDivElement>(null);

  // Early check-in time slots
  const earlyCheckInSlots: TimeSlot[] = [
    { value: '06:00', label: '6:00 AM', available: true, extraFee: 50 },
    { value: '08:00', label: '8:00 AM', available: true, extraFee: 30 },
    { value: '10:00', label: '10:00 AM', available: true, extraFee: 20 },
    { value: '12:00', label: '12:00 PM', available: true, extraFee: 10 },
    { value: '14:00', label: '2:00 PM', available: true, extraFee: 5 },
    { value: '15:00', label: '3:00 PM (Standard)', available: true, extraFee: 0 },
  ];

  // Late check-out time slots
  const lateCheckOutSlots: TimeSlot[] = [
    { value: '11:00', label: '11:00 AM (Standard)', available: true, extraFee: 0 },
    { value: '13:00', label: '1:00 PM', available: true, extraFee: 15 },
    { value: '15:00', label: '3:00 PM', available: true, extraFee: 25 },
    { value: '17:00', label: '5:00 PM', available: true, extraFee: 40 },
    { value: '19:00', label: '7:00 PM', available: true, extraFee: 60 },
    { value: '21:00', label: '9:00 PM', available: true, extraFee: 80 },
  ];

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowCheckInTime(false);
        setShowCheckOutTime(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calendar navigation
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // Date utilities
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Past dates
    if (date < today) return true;
    
    // Blackout dates
    if (blackoutDates.some(blackout => 
      blackout.toDateString() === date.toDateString()
    )) return true;

    // If selecting check-out, must be after check-in
    if (!selectingCheckIn && selectedCheckIn) {
      const minCheckOut = new Date(selectedCheckIn);
      minCheckOut.setDate(minCheckOut.getDate() + minStayNights);
      
      const maxCheckOut = new Date(selectedCheckIn);
      maxCheckOut.setDate(maxCheckOut.getDate() + maxStayNights);
      
      return date < minCheckOut || date > maxCheckOut;
    }

    return false;
  };

  const isDateInRange = (date: Date) => {
    if (!selectedCheckIn || !selectedCheckOut) return false;
    return date > selectedCheckIn && date < selectedCheckOut;
  };

  const isDateSelected = (date: Date) => {
    if (selectedCheckIn && date.toDateString() === selectedCheckIn.toDateString()) return true;
    if (selectedCheckOut && date.toDateString() === selectedCheckOut.toDateString()) return true;
    return false;
  };

  // Handle date selection
  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (selectingCheckIn) {
      setSelectedCheckIn(date);
      setSelectedCheckOut(null);
      setSelectingCheckIn(false);
      onCheckInChange?.(date);
    } else {
      setSelectedCheckOut(date);
      setSelectingCheckIn(true);
      setIsOpen(false);
      onCheckOutChange?.(date);
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getNightCount = () => {
    if (!selectedCheckIn || !selectedCheckOut) return 0;
    const timeDiff = selectedCheckOut.getTime() - selectedCheckIn.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const days = generateCalendarDays();
  const monthYear = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className={`relative ${className}`} ref={pickerRef}>
      {/* Date Input Display */}
      <div className="grid grid-cols-2 gap-2">
        <div
          onClick={() => {
            setIsOpen(true);
            setSelectingCheckIn(true);
            setShowCheckInTime(false);
            setShowCheckOutTime(false);
          }}
          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
            selectingCheckIn && isOpen 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-xs text-gray-500 font-medium">Check-in</div>
              <div className="text-sm font-medium">
                {selectedCheckIn ? formatDate(selectedCheckIn) : 'Select date'}
              </div>
              {showTimeSelection && selectedCheckIn && (
                <div className="text-xs text-gray-500 mt-1">
                  {checkInTime}
                  {earlyCheckIn && checkInTime !== '15:00' && (
                    <span className="text-blue-600 ml-1">
                      (+${earlyCheckInSlots.find(slot => slot.value === checkInTime)?.extraFee})
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            if (selectedCheckIn) {
              setIsOpen(true);
              setSelectingCheckIn(false);
              setShowCheckInTime(false);
              setShowCheckOutTime(false);
            }
          }}
          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
            !selectingCheckIn && isOpen 
              ? 'border-blue-500 bg-blue-50' 
              : selectedCheckIn 
                ? 'border-gray-300 hover:border-gray-400' 
                : 'border-gray-200 bg-gray-50 cursor-not-allowed'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-xs text-gray-500 font-medium">Check-out</div>
              <div className="text-sm font-medium">
                {selectedCheckOut ? formatDate(selectedCheckOut) : 'Select date'}
              </div>
              {showTimeSelection && selectedCheckOut && (
                <div className="text-xs text-gray-500 mt-1">
                  {checkOutTime}
                  {lateCheckOut && checkOutTime !== '11:00' && (
                    <span className="text-blue-600 ml-1">
                      (+${lateCheckOutSlots.find(slot => slot.value === checkOutTime)?.extraFee})
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Night Count Display */}
      {selectedCheckIn && selectedCheckOut && (
        <div className="mt-2 text-center text-sm text-gray-600">
          {getNightCount()} night{getNightCount() !== 1 ? 's' : ''}
        </div>
      )}

      {/* Time Selection Buttons */}
      {showTimeSelection && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            onClick={() => setShowCheckInTime(!showCheckInTime)}
            disabled={!selectedCheckIn}
            className="flex items-center justify-center space-x-2 p-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Clock className="h-4 w-4" />
            <span>Check-in Time</span>
          </button>
          <button
            onClick={() => setShowCheckOutTime(!showCheckOutTime)}
            disabled={!selectedCheckOut}
            className="flex items-center justify-center space-x-2 p-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Clock className="h-4 w-4" />
            <span>Check-out Time</span>
          </button>
        </div>
      )}

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h3 className="font-medium text-gray-900">{monthYear}</h3>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Selection Info */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">
              {selectingCheckIn 
                ? 'Select your check-in date' 
                : 'Select your check-out date'
              }
            </div>
            {selectedCheckIn && !selectingCheckIn && (
              <div className="text-xs text-gray-500 mt-1">
                Minimum stay: {minStayNights} night{minStayNights !== 1 ? 's' : ''}
              </div>
            )}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
              const isDisabled = isDateDisabled(day);
              const isSelected = isDateSelected(day);
              const isInRange = isDateInRange(day);
              const isToday = day.toDateString() === new Date().toDateString();

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(day)}
                  disabled={isDisabled}
                  className={`
                    p-2 text-sm rounded-lg transition-colors relative
                    ${!isCurrentMonth ? 'text-gray-300' : ''}
                    ${isDisabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'}
                    ${isSelected ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                    ${isInRange ? 'bg-blue-100 text-blue-700' : ''}
                    ${isToday && !isSelected ? 'bg-gray-200 font-semibold' : ''}
                  `}
                >
                  {day.getDate()}
                  {isToday && !isSelected && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <button
              onClick={() => {
                setSelectedCheckIn(null);
                setSelectedCheckOut(null);
                setSelectingCheckIn(true);
                onCheckInChange?.(null as any);
                onCheckOutChange?.(null as any);
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear dates
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Check-in Time Selection */}
      {showCheckInTime && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">Check-in Time</h4>
            <button
              onClick={() => setShowCheckInTime(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2">
            {earlyCheckInSlots.map(slot => (
              <button
                key={slot.value}
                onClick={() => {
                  setCheckInTime(slot.value);
                  setShowCheckInTime(false);
                }}
                className={`w-full p-3 text-left border rounded-lg transition-colors ${
                  checkInTime === slot.value 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{slot.label}</span>
                  {slot.extraFee > 0 && (
                    <span className="text-sm text-blue-600 font-medium">
                      +${slot.extraFee}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Check-out Time Selection */}
      {showCheckOutTime && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">Check-out Time</h4>
            <button
              onClick={() => setShowCheckOutTime(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2">
            {lateCheckOutSlots.map(slot => (
              <button
                key={slot.value}
                onClick={() => {
                  setCheckOutTime(slot.value);
                  setShowCheckOutTime(false);
                }}
                className={`w-full p-3 text-left border rounded-lg transition-colors ${
                  checkOutTime === slot.value 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{slot.label}</span>
                  {slot.extraFee > 0 && (
                    <span className="text-sm text-blue-600 font-medium">
                      +${slot.extraFee}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
