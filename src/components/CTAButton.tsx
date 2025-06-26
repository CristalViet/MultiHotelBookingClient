'use client';

import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export default function CTAButton({ text, onClick, className = '' }: CTAButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2 mx-auto ${className}`}
    >
      <span>{text}</span>
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
    </button>
  );
}