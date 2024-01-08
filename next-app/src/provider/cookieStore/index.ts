import {cookies} from 'next/headers';
import {getClientConfig} from '@/utils/config';
import {ILanguage} from '@/types/config';

const getClient = async (): Promise<string> => {
  const cookieStore = cookies()
  const client = cookieStore.get('client')?.value
  if (client) {
    return client
  } else {
    const settings = await getClientConfig()
    if (!settings) {
      throw new Error('Client not exist in cache')
    }
    return settings.clientId
  }
}

const getLanguages = async(): Promise<ILanguage[]> => {
  const cookieStore = cookies()
  const values = cookieStore.get('languages')?.value
  if (values) {
    return JSON.parse(values)
  } else {
    const settings = await getClientConfig()
    if (!settings) {
      throw new Error('Languages not exist in cache')
    }
    return settings.languages
  }
}

// const getList = async <T>(key: string): Promise<T[]> => {
//   const cookieStore = cookies()
//   const values = cookieStore.get(key)?.value
//   if (!values) {
//     throw new Error(`${key} not exist in cache`)
//   }
//   return JSON.parse(values) as T[]
// }

const cookieStore = {
  getClient: () => getClient(),
  getLanguages: () => getLanguages(),
}

export default cookieStore