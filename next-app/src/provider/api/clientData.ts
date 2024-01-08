import apiProvider from '@/provider/api/apiProvider';

const entrypoint = process.env.NEXT_PUBLIC_API_ENDPOINT!

const clientData = {
  getData: async <T>(path: string, query?: object): Promise<T> => {
    return await apiProvider.fetchClientData({
      entrypoint: entrypoint,
      path: path,
      options: { cache: 'no-store' },
      query
    });
  }
}
export default clientData