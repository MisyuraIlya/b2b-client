"use client"
import queryString from 'query-string';
import { IFetchDataProps } from '@/provider/api/types';

const clientSideApiProvider = {
  fetch: async <T = any>({ entrypoint, path, query = {}, options }: IFetchDataProps): Promise<T> => {
    const formatQuery = queryString.stringify(query, { arrayFormat: 'bracket' })
    const url = `${entrypoint}${path}${formatQuery ? `?${formatQuery}` : ''}`
    const res = await fetch(url, options);
    if (!res.ok) {
      try {
        const data = await res.json();
        if (data.message) {
          throw data;
        }
      } catch (e) {
        throw new Error(`Failed to fetch data - ${url}`)
      }
    }

    return await res.json();
  }
}

export default clientSideApiProvider;
