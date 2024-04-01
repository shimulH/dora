'use client';
import React, { useEffect, useState } from 'react';
import { getNewsSources } from '@/actions/getSources';
import { useQueryString } from '@/hooks/useQueryString';
import { usePathname, useRouter } from 'next/navigation';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

export default function Sources() {
  const [sources, setSources] = useState<{ name: string; id: string }[]>();

  const { setQueryString } = useQueryString();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getSources = async () => {
      const res = await getNewsSources();

      setSources(res?.data);
    };
    getSources();
  }, []);
  return (
    <div className='flex gap-4 items-center py-2'>
      <p className='bg-slate-600 rounded-sm text-white p-2'>Sources</p>
      <ScrollArea className='w-full whitespace-nowrap '>
        <ul className='flex gap-2 mb-1 h-8 pt-1'>
          <li
            onClick={() =>
              router.push(`${pathname}?${setQueryString('source', 'guardian')}`)
            }
          >
            <label className='bg-pink-500 hover:bg-pink-600 dark:hover:bg-pink-400 cursor-pointer text-white p-1 rounded-sm'>
              Guardian
            </label>
          </li>
          <li
            onClick={() =>
              router.push(`${pathname}?${setQueryString('source', 'new-york')}`)
            }
          >
            <label className='bg-pink-500 hover:bg-pink-600 dark:hover:bg-pink-400 cursor-pointer text-white p-1 rounded-sm'>
              New York Times
            </label>
          </li>
          {sources?.map((source) => (
            <li key={source.id}>
              <label
                onClick={() =>
                  router.push(
                    `${pathname}?${setQueryString('source', source.id)}`
                  )
                }
                className='bg-pink-500 hover:bg-pink-600 dark:hover:bg-pink-400 cursor-pointer text-white p-1  rounded-sm'
              >
                {source.name}
              </label>
            </li>
          ))}
        </ul>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  );
}
