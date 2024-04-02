import { getNewsApiEverything } from '@/actions/getNewsApiEverything';
import Categories from '@/components/categories';

import Feed from '@/components/feed';
import LoadingArticle from '@/components/loading-article';
import Search from '@/components/search';
import Sources from '@/components/sources';
import { Suspense } from 'react';

export default async function page({
  searchParams,
}: {
  searchParams: { q: string; cat: string; source: string };
}) {
  return (
    <div>
      <Suspense fallback={<LoadingArticle />}>
        <Search />

        <Categories />
        <Sources />
      </Suspense>
      <Suspense fallback={<LoadingArticle />}>
        <Feed query={searchParams} />
      </Suspense>
    </div>
  );
}
