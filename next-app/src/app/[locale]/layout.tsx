import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { NextIntlClientProvider, useLocale, useMessages } from 'next-intl';
import RootStyleRegistry from '@/app/emotion';
import AuthContext from '@/context/AuthContext/AuthContext';
import { StoreProvider } from '@/context/StoreContext';
import { authOptions } from '@/lib/auth';
import AppThemeProvider from '@/provider/AppThemeProvider';
import cookieStore from '@/provider/cookieStore';
import { getDirection } from '@/utils/config';
import { AppProviderProps } from '@/types/layout';
import { PageProps } from '@/types/page';

export async function AppProvider({ children, dir }: AppProviderProps) {
  const clientData = await cookieStore.getClient()
  const languagesData = await cookieStore.getLanguages()

  const [client, languages] = await Promise.all([clientData, languagesData])
  const session = await getServerSession(authOptions)
  return (
    <AuthContext session={session}>
      <StoreProvider client={client} languages={languages} direction={dir}>
        <RootStyleRegistry dir={dir}>
          <AppThemeProvider>
            {children}
          </AppThemeProvider>
        </RootStyleRegistry>
      </StoreProvider>
    </AuthContext>
  )
}


export default function LocaleLayout({ children, params }: PageProps) {
  const locale = useLocale();
  if (params.locale !== locale) {
    notFound();
  }
  const dir = getDirection(locale)
  const messages = useMessages()
  return (
    <html lang={locale} dir={dir}>
      <head></head>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <AppProvider dir={dir}>
          {children}
        </AppProvider>
      </NextIntlClientProvider>
    </html>
  );
}
