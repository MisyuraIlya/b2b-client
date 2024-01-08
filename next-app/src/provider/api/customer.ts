"use client"

import clientSideApiProvider from "./clientSideApiProvider"
const entrypoint = process.env.NEXT_PUBLIC_API_ENDPOINT!

const customer = {
  fetch: async <T>(path: string, options?: RequestInit, token?: string): Promise<T> => {
    const headers = new Headers({
      'Content-Type': 'application/json',
      ...(options?.headers || {})
    });
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return await clientSideApiProvider.fetch({
      entrypoint,
      path,
      options: {
        ...options,
        headers,
      }
    })
  }
}

export default customer;