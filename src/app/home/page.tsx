import { getNewsApiEverything } from '@/actions/getNewsApiEverything';

import Feed from '@/components/feed';
import Search from '@/components/search';

export default async function page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q ?? 'tech';
  const posts = await getNewsApiEverything(query);
  console.log(posts.data);

  return (
    <div>
      <Search />
      <Feed posts={posts} />
    </div>
  );
}
