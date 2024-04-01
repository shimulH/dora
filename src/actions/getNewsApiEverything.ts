'use server';

import { api } from '@/lib/api';

export const getNewsApiEverything = async (q: string) => {
  const query = q.length ? q : 'tech';
  console.log('aaaaaaa', query);

  const newsAPiRes = await api.get(
    `${process.env.NEXT_PUBLIC_NEWS_API}/everything?q=${query}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
  );
  const guardianApiRes = await api.get(
    `${process.env.NEXT_PUBLIC_GUARDIAN_API}/search?q=${query}&api-key=${process.env.NEXT_PUBLIC_GUARDIAN_API_KEY}`
  );
  const nyTimesApiRes = await api.get(
    `${process.env.NEXT_PUBLIC_NY_TIMES_API}/articlesearch.json?q=${query}&api-key=${process.env.NEXT_PUBLIC_NY_TIMES_API_KEY}`
  );
  // console.log(res);
  // const { slug, date, title, summary, tags } = post

  const newsApiData = await newsAPiRes.json();
  const guardianApiData = await guardianApiRes.json();
  const nyTimesApiData = await nyTimesApiRes.json();
  // console.log('data--', nyTimesApiData.response.docs[0].multimedia);

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
          date: article?.pub_date ?? '',
          image: imageUrl ?? '',
          url: article?.web_url ?? '',
        },
      ];
      return prev;
    }, []);
  const guardianPosts = guardianApiData.response.results
    .slice(0, 10)
    .reduce((prev: any, article: any) => {
      prev = [
        ...prev,
        {
          source: article?.webUrl ?? '',
          title: article?.webTitle ?? '',
          summary: article?.description ?? '',
          date: article?.webPublicationDate ?? '',
          image: article?.urlToImage ?? '',
          url: article?.webUrl ?? '',
        },
      ];
      return prev;
    }, []);

  const newsApiPosts = newsApiData.articles
    .slice(0, 10)
    .reduce((prev: any, article: any) => {
      prev = [
        ...prev,
        {
          source: article?.source ?? '',
          title: article?.title ?? '',
          summary: article?.description ?? '',
          date: article?.publishedAt ?? '',
          image: article?.urlToImage ?? '',
          url: article?.url ?? '',
        },
      ];
      return prev;
    }, []);
  return {
    success: newsApiData.status,
    data: [
      ...newsApiPosts,
      ...guardianPosts,
      ...(nyTimesPosts ? nyTimesPosts : []),
    ],
  };
};
