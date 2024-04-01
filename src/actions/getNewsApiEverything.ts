'use server';

import { api } from '@/lib/api';
import { format } from 'date-fns';
export const getNewsApiEverything = async (queries: {
  q: string;
  cat: string;
  source: string;
}) => {
  const { q, cat, source } = queries;
  const query = q ? q : 'tech';
  const nySubString = cat
    ? `${cat}.json&api-key=${process.env.NEXT_PUBLIC_NY_TIMES_API_KEY}`
    : `articlesearch.json?q=${query}&api-key=${process.env.NEXT_PUBLIC_NY_TIMES_API_KEY}`;

  const newsAPiRes = await api.get(
    `${process.env.NEXT_PUBLIC_NEWS_API}/everything?q=${query}&sources=${queries.source}&category=${cat}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
  );
  const guardianApiRes = await api.get(
    `${process.env.NEXT_PUBLIC_GUARDIAN_API}/search?q=${query}&sections=${cat}&api-key=${process.env.NEXT_PUBLIC_GUARDIAN_API_KEY}`
  );
  const nyTimesApiRes = await api.get(
    `${process.env.NEXT_PUBLIC_NY_TIMES_API}/${nySubString}`
  );

  const newsApiData = await newsAPiRes.json();
  const guardianApiData = await guardianApiRes.json();
  const nyTimesApiData = await nyTimesApiRes.json();

  const nyTimesPosts = nyTimesApiData?.response?.docs
    .slice(0, 10)
    .reduce((prev: any, article: any) => {
      const imageUrl = `${process.env.NEXT_PUBLIC_NY_TIMES}/${article?.multimedia[0]?.url}`;
      prev = [
        ...prev,
        {
          source: article?.source ?? '',
          title: article?.headline.main ?? '',
          summary: article?.headline.content_kicker ?? '',
          date: format(article?.pub_date, 'yyyy-MM-dd') ?? '',
          image: imageUrl ?? '',
          url: article?.web_url ?? '',
        },
      ];
      return prev;
    }, []);

  const guardianPosts =
    queries.source !== 'new-york' &&
    guardianApiData.response.results
      .slice(0, 10)
      .reduce((prev: any, article: any) => {
        prev = [
          ...prev,
          {
            source: article?.webUrl ?? '',
            title: article?.webTitle ?? '',
            summary: article?.description ?? '',
            date: format(article?.webPublicationDate, 'yyyy-MM-dd') ?? '',
            image: article?.urlToImage ?? '',
            url: article?.webUrl ?? '',
          },
        ];
        return prev;
      }, []);

  const newsApiPosts = newsApiData.articles
    ?.slice(0, 10)
    .reduce((prev: any, article: any) => {
      prev = [
        ...prev,
        {
          source: article?.source ?? '',
          title: article?.title ?? '',
          summary: article?.description ?? '',
          date: format(article?.publishedAt, 'yyyy-MM-dd') ?? '',
          image: article?.urlToImage ?? '',
          url: article?.url ?? '',
        },
      ];
      return prev;
    }, []);
  return {
    success: newsApiData.status,
    data: [
      ...(newsApiPosts ? newsApiPosts : []),
      ...(guardianPosts ? guardianPosts : []),
      ...(nyTimesPosts ? nyTimesPosts : []),
    ],
  };
};
