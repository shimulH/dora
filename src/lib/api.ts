import { cookies } from 'next/headers';

export const fetchAPI = (
  url: string,
  method: string,
  payload: any,
  tags?: string[],
  cache?: boolean
) => {
  return fetch(`${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(method === 'POST' && {
      body: JSON.stringify({
        ...payload,
      }),
    }),
  });
};

export const api = {
  get: async (url: string, tags?: string[]) => await fetchAPI(url, 'GET', tags),
  post: (url: string, payload?: any, tags?: string[]) =>
    fetchAPI(url, 'POST', payload, tags),
};
