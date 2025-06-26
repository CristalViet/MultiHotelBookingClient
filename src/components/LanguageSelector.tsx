'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';

const languages = [
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

export default function LanguageSelector() {
  const t = useTranslations('language');
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Better locale detection
  const getLocaleFromPath = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    const firstSegment = segments[0];
    return languages.find(lang => lang.code === firstSegment)?.code || 'vi';
  };

  const currentLocale = getLocaleFromPath(pathname);
  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (languageCode: string) => {
    try {
      // Remove current locale from path
      const segments = pathname.split('/').filter(Boolean);
      let pathWithoutLocale = '/';
      
      if (segments.length > 0 && languages.some(lang => lang.code === segments[0])) {
        // Remove the first segment (current locale)
        pathWithoutLocale = '/' + segments.slice(1).join('/');
      } else {
        // If no locale in path, use full path
        pathWithoutLocale = pathname;
      }

      // Ensure path starts with '/'
      if (!pathWithoutLocale.startsWith('/')) {
        pathWithoutLocale = '/' + pathWithoutLocale;
      }

      // Create new path with selected locale
      const newPath = `/${languageCode}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
      
      console.log('Language change:', {
        from: currentLocale,
        to: languageCode,
        currentPath: pathname,
        pathWithoutLocale,
        newPath
      });

      // Use router.replace for instant navigation
      router.replace(newPath);
      setIsOpen(false);
    } catch (error) {
      console.error('Error changing language:', error);
      // Fallback: navigate to home page with new locale
      router.replace(`/${languageCode}`);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-gray-50 transition-colors duration-200"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLanguage.flag} {currentLanguage.name}</span>
        <span className="sm:hidden">{currentLanguage.flag}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50 animate-slide-up">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                currentLocale === language.code ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span>{language.name}</span>
              {currentLocale === language.code && (
                <span className="ml-auto text-primary-600">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}