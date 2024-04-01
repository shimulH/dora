'use server';

import { api } from '@/lib/api';

export const getNewsSources = async () => {
  const newsAPiRes = await api.get(
    `${process.env.NEXT_PUBLIC_NEWS_API}/top-headlines/sources?language=en&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
  );

  const newsApiData = await newsAPiRes.json();

  const newsSources = newsApiData.sources?.slice(0, 6);
  console.log('data--', newsSources);

  return {
    success: newsApiData.status,
    data: [...(newsSources ? newsSources : [])],
  };
};
