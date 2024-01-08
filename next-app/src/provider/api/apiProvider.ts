import queryString from 'query-string';
import { Protocol } from "@/config/protocol";
import cookieStore from '@/provider/cookieStore';
import { getHost } from '@/utils/config';
import { IFetchDataProps } from '@/provider/api/types';

const getQuery = async (query: object) => {
  const client = await cookieStore.getClient()
  return { client: client, ...query }
}

const apiProvider = {
  fetchClientData: async <T = any>({ entrypoint, path, query = {}, options }: IFetchDataProps): Promise<T> => {
    let { protocol, domain } = getHost()
    if ("development" === process.env.NODE_ENV) {
      protocol = Protocol.http
      domain = 'localhost:3000'
    }
    const queryObj = await getQuery(query)
    const formatQuery = queryString.stringify(queryObj, { arrayFormat: 'bracket' });
    const url = `${protocol}${domain}${entrypoint}${path}?${formatQuery}`;
    const res = await fetch(url, options);

    if (!res.ok) {
      try {
        const data = await res.json().catch(() => {
          throw new Error(`Failed to fetch data - ${url}`)
        });
        if (data?.message) {
          throw data;
        }
      } catch (e) {
        const error = e as Error;
        if (error.message) {
          throw error;
        }
        throw new Error(`Failed to fetch data - ${url}`)
      }
    }
    if (res.status === 204) {
      return null as T
    }

    return await res.json();
  }
}

export default apiProvider;
