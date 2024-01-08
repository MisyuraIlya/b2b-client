import apiProvider from '@/provider/api/apiProvider';
const entrypoint = process.env.NEXT_PUBLIC_API_ENDPOINT!

const customerServer = {
  fetch: async <T>(path: string, options?: RequestInit, token?: string): Promise<T> => {
    const headers = new Headers({
      'Content-Type': 'application/json',
      ...(options?.headers || {})
    });
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return await apiProvider.fetchClientData({
      entrypoint,
      path,
      options: {
        cache: 'no-store',
        ...options,
        headers
      }
    })
  }
}

export default customerServer;