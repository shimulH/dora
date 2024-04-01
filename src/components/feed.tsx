import { getNewsApiEverything } from '@/actions/getNewsApiEverything';
import Link from '@/components/Link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

const MAX_DISPLAY = 50;

export default function Feed({
  posts,
}: {
  posts: {
    data: {
      source: string;
      title: string;
      summary: string;
      date: string;
      image: string;
      url: string;
    }[];
  };
}) {
  return (
    <ScrollArea className='h-[1000px]'>
      <div className='flex-1 space-y-4 p-4 '>
        <div className='divide-y divide-gray-200 dark:divide-gray-700'>
          <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
            {!posts.data.length && 'No posts found.'}
            {posts.data
              .slice(0, MAX_DISPLAY)
              .filter((post) => post.title !== '[Removed]')
              .map((post: any, index: number) => {
                // const { slug, date, title, summary, tags } = post
                return (
                  <li
                    key={post.date}
                    className={cn(index !== 0 ? 'py-12' : 'pb-12')}
                  >
                    <article>
                      <div className='space-y-2 '>
                        <div className='space-y-5 xl:col-span-3'>
                          <div className='space-y-6'>
                            {post.image.length ? (
                              <Link href={post.url}>
                                <Image
                                  src={post.image}
                                  width={400}
                                  height={300}
                                  alt='Picture of the author'
                                  className='h-auto w-full object-center transition-all hover:scale-105'
                                />
                              </Link>
                            ) : null}

                            <div>
                              <h2 className='text-2xl font-bold leading-8 tracking-tight'>
                                <Link
                                  href={post.url}
                                  className='text-gray-900 dark:text-gray-100'
                                >
                                  {post.title}
                                </Link>
                              </h2>
                              <dl>
                                <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                                  <time dateTime={post.date}>{post.date}</time>
                                </dd>
                              </dl>
                            </div>
                            <div className='prose max-w-none text-gray-500 dark:text-gray-400'>
                              {post.summary}
                            </div>
                          </div>
                          <div className='text-base font-medium leading-6'>
                            <Link
                              href={post.url}
                              className='text-pink-500 hover:text-pink-600 dark:hover:text-pink-400'
                              aria-label={`Read more: "${post.title}"`}
                            >
                              Read more &rarr;
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </ScrollArea>
  );
}
