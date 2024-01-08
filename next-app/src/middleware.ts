import { NextRequest, NextResponse } from 'next/server';
import AuthMiddleware from "next-auth/middleware";
import createIntlMiddleware from 'next-intl/middleware';
import { getClientConfig } from '@/utils/config';

export default async function middleware(request: NextRequest) {

  const host = request.headers.get('host')!
  const settings = await getClientConfig(host)

  if (!settings) {
    return new NextResponse(
      `<h1>Requested domain - ${host} not found</h1>`,
      { status: 500, headers: { 'content-type': 'text/html' } }
    );
  }

  const handleI18nRouting = createIntlMiddleware({
    locales: settings.locales,
    defaultLocale: settings.defaultLocale,
    localeDetection: false
  });

  const response = handleI18nRouting(request);

  response.headers.set('x-client-id', settings.clientId);
  response.cookies.set('client', settings.clientId);
  response.cookies.set('locales', JSON.stringify(settings.locales));
  response.cookies.set('languages', JSON.stringify(settings.languages));

  return response
}

export const config = {
  matcher: ['/((?!api|media|_next/static|_next/image|favicon.ico).*)']
};