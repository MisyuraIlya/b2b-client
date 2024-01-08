import apiProvider from '@/provider/api/apiProvider';

const entrypoint = process.env.NEXT_PUBLIC_LANGUAGE_APP_ENTRYPOINT!

const translation = {
  getMessages: async(locale: string):Promise<Record<string, string>> => {
    return await apiProvider.fetchClientData( {
      entrypoint: entrypoint,
      path: `/translations/${locale}/default`,
      options: {cache: 'no-store'}
    });
  }
}
export default translation