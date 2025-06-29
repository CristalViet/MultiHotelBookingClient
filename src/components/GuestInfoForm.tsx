'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, Plus, Minus, AlertCircle } from 'lucide-react';

interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber?: string;
  isPrimary: boolean;
}

interface GuestInfoFormProps {
  totalGuests: number;
  onGuestsUpdate: (guests: Guest[]) => void;
  initialGuests?: Guest[];
  showPassportFields?: boolean;
  requiredFields?: {
    dateOfBirth?: boolean;
    nationality?: boolean;
    passport?: boolean;
  };
}

export default function GuestInfoForm({
  totalGuests,
  onGuestsUpdate,
  initialGuests = [],
  showPassportFields = false,
  requiredFields = {
    dateOfBirth: false,
    nationality: false,
    passport: false
  }
}: GuestInfoFormProps) {
  const t = useTranslations();

  // Initialize guests state
  const initializeGuests = (): Guest[] => {
    if (initialGuests.length > 0) return initialGuests;
    
    const guests: Guest[] = [];
    for (let i = 0; i < totalGuests; i++) {
      guests.push({
        id: `guest-${i + 1}`,
        firstName: '',
        lastName: '',
        email: i === 0 ? '' : '', // Only primary guest needs email
        phone: i === 0 ? '' : '', // Only primary guest needs phone
        dateOfBirth: '',
        nationality: '',
        passportNumber: '',
        isPrimary: i === 0
      });
    }
    return guests;
  };

  const [guests, setGuests] = useState<Guest[]>(initializeGuests());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentGuestIndex, setCurrentGuestIndex] = useState(0);

  // Validation function
  const validateGuest = (guest: Guest, index: number): Record<string, string> => {
    const guestErrors: Record<string, string> = {};
    
    if (!guest.firstName.trim()) {
      guestErrors[`firstName-${index}`] = 'First name is required';
    }
    
    if (!guest.lastName.trim()) {
      guestErrors[`lastName-${index}`] = 'Last name is required';
    }
    
    // Primary guest validations
    if (guest.isPrimary) {
      if (!guest.email.trim()) {
        guestErrors[`email-${index}`] = 'Email is required for primary guest';
      } else if (!/\S+@\S+\.\S+/.test(guest.email)) {
        guestErrors[`email-${index}`] = 'Please enter a valid email';
      }
      
      if (!guest.phone.trim()) {
        guestErrors[`phone-${index}`] = 'Phone number is required for primary guest';
      }
    }
    
    // Optional required fields
    if (requiredFields.dateOfBirth && !guest.dateOfBirth) {
      guestErrors[`dateOfBirth-${index}`] = 'Date of birth is required';
    }
    
    if (requiredFields.nationality && !guest.nationality.trim()) {
      guestErrors[`nationality-${index}`] = 'Nationality is required';
    }
    
    if (requiredFields.passport && !guest.passportNumber?.trim()) {
      guestErrors[`passportNumber-${index}`] = 'Passport number is required';
    }
    
    return guestErrors;
  };

  // Update guest information
  const updateGuest = (index: number, field: keyof Guest, value: string) => {
    const updatedGuests = [...guests];
    updatedGuests[index] = { ...updatedGuests[index], [field]: value };
    setGuests(updatedGuests);
    
    // Clear errors for this field
    const errorKey = `${field}-${index}`;
    if (errors[errorKey]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[errorKey];
      setErrors(updatedErrors);
    }
    
    // Update parent component
    onGuestsUpdate(updatedGuests);
  };

  // Validate all guests
  const validateAllGuests = (): boolean => {
    let allErrors: Record<string, string> = {};
    
    guests.forEach((guest, index) => {
      const guestErrors = validateGuest(guest, index);
      allErrors = { ...allErrors, ...guestErrors };
    });
    
    setErrors(allErrors);
    return Object.keys(allErrors).length === 0;
  };

  // Copy primary guest data to all guests
  const copyPrimaryGuestData = () => {
    if (guests.length === 0) return;
    
    const primaryGuest = guests[0];
    const updatedGuests = guests.map((guest, index) => {
      if (index === 0) return guest; // Keep primary guest as is
      
      return {
        ...guest,
        nationality: primaryGuest.nationality,
        // Don't copy email/phone to other guests
      };
    });
    
    setGuests(updatedGuests);
    onGuestsUpdate(updatedGuests);
  };

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
    'France', 'Japan', 'South Korea', 'Singapore', 'Vietnam', 'Thailand',
    'Malaysia', 'Indonesia', 'Philippines', 'China', 'India', 'Brazil'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Guest Information</h1>
        <p className="text-gray-600">Please provide information for all guests</p>
      </div>

      {/* Guest Navigation */}
      {totalGuests > 1 && (
        <div className="card p-4">
          <div className="flex flex-wrap gap-2">
            {guests.map((guest, index) => (
              <button
                key={guest.id}
                onClick={() => setCurrentGuestIndex(index)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  currentGuestIndex === index
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {guest.isPrimary ? 'Primary Guest' : `Guest ${index + 1}`}
                {guest.firstName && ` - ${guest.firstName}`}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Form */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {guests[currentGuestIndex]?.isPrimary ? 'Primary Guest Information' : `Guest ${currentGuestIndex + 1} Information`}
          </h2>
          
          {guests[currentGuestIndex]?.isPrimary && totalGuests > 1 && (
            <button
              onClick={copyPrimaryGuestData}
              className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Copy nationality to all guests
            </button>
          )}
        </div>

        {guests[currentGuestIndex]?.isPrimary && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">Primary Guest</p>
                <p className="text-sm text-blue-700">
                  This person will be the main contact for the booking and will receive all confirmation emails.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={guests[currentGuestIndex]?.firstName || ''}
                onChange={(e) => updateGuest(currentGuestIndex, 'firstName', e.target.value)}
                className={`input-field pl-10 ${errors[`firstName-${currentGuestIndex}`] ? 'border-red-500' : ''}`}
                placeholder="Enter first name"
              />
            </div>
            {errors[`firstName-${currentGuestIndex}`] && (
              <p className="text-red-500 text-sm mt-1">{errors[`firstName-${currentGuestIndex}`]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={guests[currentGuestIndex]?.lastName || ''}
                onChange={(e) => updateGuest(currentGuestIndex, 'lastName', e.target.value)}
                className={`input-field pl-10 ${errors[`lastName-${currentGuestIndex}`] ? 'border-red-500' : ''}`}
                placeholder="Enter last name"
              />
            </div>
            {errors[`lastName-${currentGuestIndex}`] && (
              <p className="text-red-500 text-sm mt-1">{errors[`lastName-${currentGuestIndex}`]}</p>
            )}
          </div>

          {/* Email (required for primary guest only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address {guests[currentGuestIndex]?.isPrimary ? '*' : '(Optional)'}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={guests[currentGuestIndex]?.email || ''}
                onChange={(e) => updateGuest(currentGuestIndex, 'email', e.target.value)}
                className={`input-field pl-10 ${errors[`email-${currentGuestIndex}`] ? 'border-red-500' : ''}`}
                placeholder="Enter email address"
                disabled={!guests[currentGuestIndex]?.isPrimary}
              />
            </div>
            {errors[`email-${currentGuestIndex}`] && (
              <p className="text-red-500 text-sm mt-1">{errors[`email-${currentGuestIndex}`]}</p>
            )}
          </div>

          {/* Phone (required for primary guest only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number {guests[currentGuestIndex]?.isPrimary ? '*' : '(Optional)'}
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                value={guests[currentGuestIndex]?.phone || ''}
                onChange={(e) => updateGuest(currentGuestIndex, 'phone', e.target.value)}
                className={`input-field pl-10 ${errors[`phone-${currentGuestIndex}`] ? 'border-red-500' : ''}`}
                placeholder="Enter phone number"
                disabled={!guests[currentGuestIndex]?.isPrimary}
              />
            </div>
            {errors[`phone-${currentGuestIndex}`] && (
              <p className="text-red-500 text-sm mt-1">{errors[`phone-${currentGuestIndex}`]}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth {requiredFields.dateOfBirth ? '*' : '(Optional)'}
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                value={guests[currentGuestIndex]?.dateOfBirth || ''}
                onChange={(e) => updateGuest(currentGuestIndex, 'dateOfBirth', e.target.value)}
                className={`input-field pl-10 ${errors[`dateOfBirth-${currentGuestIndex}`] ? 'border-red-500' : ''}`}
              />
            </div>
            {errors[`dateOfBirth-${currentGuestIndex}`] && (
              <p className="text-red-500 text-sm mt-1">{errors[`dateOfBirth-${currentGuestIndex}`]}</p>
            )}
          </div>

          {/* Nationality */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nationality {requiredFields.nationality ? '*' : '(Optional)'}
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={guests[currentGuestIndex]?.nationality || ''}
                onChange={(e) => updateGuest(currentGuestIndex, 'nationality', e.target.value)}
                className={`input-field pl-10 ${errors[`nationality-${currentGuestIndex}`] ? 'border-red-500' : ''}`}
              >
                <option value="">Select nationality</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            {errors[`nationality-${currentGuestIndex}`] && (
              <p className="text-red-500 text-sm mt-1">{errors[`nationality-${currentGuestIndex}`]}</p>
            )}
          </div>

          {/* Passport Number */}
          {showPassportFields && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passport Number {requiredFields.passport ? '*' : '(Optional)'}
              </label>
              <input
                type="text"
                value={guests[currentGuestIndex]?.passportNumber || ''}
                onChange={(e) => updateGuest(currentGuestIndex, 'passportNumber', e.target.value)}
                className={`input-field ${errors[`passportNumber-${currentGuestIndex}`] ? 'border-red-500' : ''}`}
                placeholder="Enter passport number"
              />
              {errors[`passportNumber-${currentGuestIndex}`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`passportNumber-${currentGuestIndex}`]}</p>
              )}
            </div>
          )}
        </div>

        {/* Navigation buttons for multiple guests */}
        {totalGuests > 1 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentGuestIndex(Math.max(0, currentGuestIndex - 1))}
              disabled={currentGuestIndex === 0}
              className="px-6 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Previous Guest
            </button>
            
            <span className="text-sm text-gray-600 self-center">
              Guest {currentGuestIndex + 1} of {totalGuests}
            </span>
            
            <button
              onClick={() => setCurrentGuestIndex(Math.min(totalGuests - 1, currentGuestIndex + 1))}
              disabled={currentGuestIndex === totalGuests - 1}
              className="px-6 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Next Guest
            </button>
          </div>
        )}
      </div>

      {/* Validation Summary */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">Guest Information Summary</h3>
        <div className="space-y-2">
          {guests.map((guest, index) => (
            <div key={guest.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">
                  {guest.isPrimary ? 'Primary Guest' : `Guest ${index + 1}`}
                </p>
                <p className="text-sm text-gray-600">
                  {guest.firstName && guest.lastName 
                    ? `${guest.firstName} ${guest.lastName}`
                    : 'Information incomplete'
                  }
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {guest.firstName && guest.lastName ? (
                  <span className="text-green-600 text-sm font-medium">Complete</span>
                ) : (
                  <span className="text-red-600 text-sm font-medium">Incomplete</span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={validateAllGuests}
          className="w-full mt-6 btn-primary py-3"
        >
          Validate All Guest Information
        </button>
      </div>
    </div>
  );
} 