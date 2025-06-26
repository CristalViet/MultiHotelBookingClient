import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'vi', 'zh'],

  // Used when no locale matches
  defaultLocale: 'vi',

  // Always use the default locale for the '/' path
  localePrefix: 'always',
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(vi|en|zh)/:path*']
};