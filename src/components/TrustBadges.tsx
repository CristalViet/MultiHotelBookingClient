'use client';

import { useTranslations } from 'next-intl';
import { Shield, Lock, CheckCircle, Star, Award, Zap, Globe, Users } from 'lucide-react';

interface TrustBadge {
  id: string;
  name: string;
  description: string;
  icon?: React.ReactNode;
  imageUrl?: string;
  type: 'security' | 'certification' | 'award' | 'rating' | 'guarantee';
  verified: boolean;
  link?: string;
}

interface TrustBadgesProps {
  layout?: 'horizontal' | 'vertical' | 'grid';
  showDescription?: boolean;
  showVerifiedBadge?: boolean;
  size?: 'small' | 'medium' | 'large';
  categories?: ('security' | 'certification' | 'award' | 'rating' | 'guarantee')[];
  className?: string;
}

export default function TrustBadges({
  layout = 'horizontal',
  showDescription = true,
  showVerifiedBadge = true,
  size = 'medium',
  categories,
  className = ''
}: TrustBadgesProps) {
  const t = useTranslations();

  const allBadges: TrustBadge[] = [
    // Security Badges
    {
      id: 'ssl-secure',
      name: 'SSL Secured',
      description: '256-bit SSL encryption',
      icon: <Lock className="w-6 h-6" />,
      type: 'security',
      verified: true
    },
    {
      id: 'pci-compliant',
      name: 'PCI DSS Compliant',
      description: 'Payment Card Industry compliance',
      icon: <Shield className="w-6 h-6" />,
      type: 'security',
      verified: true
    },
    {
      id: 'gdpr-compliant',
      name: 'GDPR Compliant',
      description: 'European data protection standards',
      icon: <Shield className="w-6 h-6" />,
      type: 'security',
      verified: true
    },

    // Certifications
    {
      id: 'iso-27001',
      name: 'ISO 27001',
      description: 'Information Security Management',
      icon: <Award className="w-6 h-6" />,
      type: 'certification',
      verified: true
    },
    {
      id: 'soc2-type2',
      name: 'SOC 2 Type II',
      description: 'Service Organization Control',
      icon: <CheckCircle className="w-6 h-6" />,
      type: 'certification',
      verified: true
    },

    // Awards & Recognition
    {
      id: 'best-booking-platform',
      name: 'Best Booking Platform 2024',
      description: 'Travel Industry Awards',
      icon: <Award className="w-6 h-6" />,
      type: 'award',
      verified: true
    },
    {
      id: 'customer-choice',
      name: 'Customer Choice Award',
      description: 'Based on 50,000+ reviews',
      icon: <Star className="w-6 h-6" />,
      type: 'award',
      verified: true
    },

    // Ratings
    {
      id: 'trustpilot-excellent',
      name: 'Trustpilot Excellent',
      description: '4.8/5 stars (12,500+ reviews)',
      icon: <Star className="w-6 h-6" />,
      type: 'rating',
      verified: true
    },
    {
      id: 'google-rating',
      name: 'Google Reviews',
      description: '4.7/5 stars (8,900+ reviews)',
      icon: <Star className="w-6 h-6" />,
      type: 'rating',
      verified: true
    },

    // Guarantees
    {
      id: 'best-price-guarantee',
      name: 'Best Price Guarantee',
      description: 'We match any lower price',
      icon: <CheckCircle className="w-6 h-6" />,
      type: 'guarantee',
      verified: true
    },
    {
      id: 'instant-confirmation',
      name: 'Instant Confirmation',
      description: 'Booking confirmed in seconds',
      icon: <Zap className="w-6 h-6" />,
      type: 'guarantee',
      verified: true
    },
    {
      id: 'free-cancellation',
      name: 'Free Cancellation',
      description: 'Cancel up to 24h before',
      icon: <CheckCircle className="w-6 h-6" />,
      type: 'guarantee',
      verified: true
    }
  ];

  // Filter badges based on categories
  const filteredBadges = categories 
    ? allBadges.filter(badge => categories.includes(badge.type))
    : allBadges;

  const getBadgeContainerClass = () => {
    const baseClass = 'flex items-center';
    const sizeClass = {
      small: 'space-x-2 p-2',
      medium: 'space-x-3 p-3',
      large: 'space-x-4 p-4'
    }[size];

    return `${baseClass} ${sizeClass}`;
  };

  const getIconSize = () => {
    return {
      small: 'w-4 h-4',
      medium: 'w-6 h-6',
      large: 'w-8 h-8'
    }[size];
  };

  const getLayoutClass = () => {
    switch (layout) {
      case 'vertical':
        return 'flex flex-col space-y-4';
      case 'grid':
        return 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4';
      default:
        return 'flex flex-wrap items-center gap-4 justify-center';
    }
  };

  const BadgeItem = ({ badge }: { badge: TrustBadge }) => (
    <div 
      className={`relative group bg-white rounded-lg border-2 border-gray-100 hover:border-blue-200 transition-all duration-200 hover:shadow-md ${
        badge.link ? 'cursor-pointer' : ''
      }`}
      onClick={badge.link ? () => window.open(badge.link, '_blank') : undefined}
    >
      <div className={getBadgeContainerClass()}>
        {/* Icon */}
        <div className={`flex-shrink-0 p-2 rounded-lg ${
          badge.type === 'security' ? 'bg-green-100 text-green-600' :
          badge.type === 'certification' ? 'bg-blue-100 text-blue-600' :
          badge.type === 'award' ? 'bg-yellow-100 text-yellow-600' :
          badge.type === 'rating' ? 'bg-purple-100 text-purple-600' :
          'bg-gray-100 text-gray-600'
        }`}>
          {badge.icon && (
            <div className={getIconSize()}>
              {badge.icon}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h4 className={`font-semibold text-gray-900 ${
              size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base'
            }`}>
              {badge.name}
            </h4>
            
            {showVerifiedBadge && badge.verified && (
              <div className="flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            )}
          </div>
          
          {showDescription && (
            <p className={`text-gray-600 ${
              size === 'small' ? 'text-xs' : 'text-sm'
            } truncate`}>
              {badge.description}
            </p>
          )}
        </div>
      </div>

      {/* Verified Badge */}
      {showVerifiedBadge && badge.verified && (
        <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          ✓
        </div>
      )}

      {/* Hover Tooltip */}
      {badge.link && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Click to learn more
        </div>
      )}
    </div>
  );

  return (
    <div className={className}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Shield className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Trusted & Secure
          </h3>
        </div>
        <p className="text-sm text-gray-600">
          Your security and privacy are our top priorities
        </p>
      </div>

      {/* Trust Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-8 text-center">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-center mb-2">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600">2M+</div>
          <div className="text-sm text-gray-600">Happy Customers</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-center mb-2">
            <Globe className="w-8 h-8 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">50+</div>
          <div className="text-sm text-gray-600">Countries</div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-center mb-2">
            <Star className="w-8 h-8 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-600">4.8/5</div>
          <div className="text-sm text-gray-600">Average Rating</div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className={getLayoutClass()}>
        {filteredBadges.map((badge) => (
          <BadgeItem key={badge.id} badge={badge} />
        ))}
      </div>

      {/* Security Statement */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 p-2 bg-green-100 rounded-lg">
            <Lock className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Bank-Level Security
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              We use industry-standard 256-bit SSL encryption to protect your personal and payment information. 
              Your data is processed securely and never stored on our servers. We are PCI DSS compliant and 
              regularly audited by third-party security firms to ensure the highest level of protection.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Methods Security */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="w-12 h-8 mx-auto mb-2 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">VISA</span>
          </div>
          <div className="text-xs text-gray-600">Verified by Visa</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="w-12 h-8 mx-auto mb-2 bg-red-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">MC</span>
          </div>
          <div className="text-xs text-gray-600">Mastercard SecureCode</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="w-12 h-8 mx-auto mb-2 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">PP</span>
          </div>
          <div className="text-xs text-gray-600">PayPal Protection</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="w-12 h-8 mx-auto mb-2 bg-gray-800 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">AMEX</span>
          </div>
          <div className="text-xs text-gray-600">SafeKey Protection</div>
        </div>
      </div>

      {/* Contact for Security */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Questions about security? Contact our security team at{' '}
          <a href="mailto:security@example.com" className="text-blue-600 hover:underline">
            security@example.com
          </a>
        </p>
      </div>
    </div>
  );
} 