import { headers } from 'next/headers';
import { DirectionEnum } from "@/config/direction";
import { Protocol } from '@/config/protocol';
import { Direction, IConfig, IHost, ISettings } from '@/types/config';

export const getHost = (domain?: string): IHost => {
  const testHost = process.env.NEXT_PUBLIC_TEST_DOMAIN!
  const getDomain = (current: string): string => current.includes('localhost') ? testHost : current
  const getProtocol = (current: string): Protocol => current.includes('localhost') ? Protocol.http : Protocol.https

  if (domain) {
    return {
      protocol: getProtocol(domain),
      domain: getDomain(domain)
    }
  }

  const headersList = headers()
  const host = headersList.get('host')!

  return {
    protocol: getProtocol(host),
    domain: getDomain(host)
  }
}

const getData = async (domain?: string): Promise<IConfig[]> => {

  const host = getHost(domain)
  const entrypoint = process.env.NEXT_PUBLIC_LANGUAGE_APP_ENTRYPOINT!
  const options = { next: { revalidate: 10 } }

  const response = await fetch(`${host.protocol}${host.domain}${entrypoint}/config`, options);

  if (!response.ok) {
    throw new Error(`Failed to fetch data - ${host}${entrypoint}/config`)
  }

  return await response.json()
}

export const getClientConfig = async (domain?: string): Promise<ISettings | null> => {

  const host = getHost(domain)
  const config = await getData(domain)
  const clientConfig = config.find(conf => conf.domain === host.domain)

  if (!clientConfig) return null

  return {
    locales: clientConfig.locales,
    languages: clientConfig.languages,
    defaultLocale: clientConfig.defaultLanguage,
    defaultDirection: clientConfig.defaultDirection,
    clientId: clientConfig.clientId
  }
}

export const getDirection = (locale: string): Direction => {
  return "he" === locale ? DirectionEnum.rtl : DirectionEnum.ltr
}