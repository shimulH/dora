'use client';
import React from 'react';
import { Button } from './ui/button';
import { CATEGORIES } from '@/constants/data';
import { useQueryString } from '@/hooks/useQueryString';
import { usePathname, useRouter } from 'next/navigation';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

export default function Categories() {
  const { setQueryString } = useQueryString();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className='flex gap-4 items-center py-2'>
      <p className='bg-slate-600 rounded-sm text-white p-2'>Categories</p>
      <ScrollArea className='w-full whitespace-nowrap '>
        <ul className='flex gap-2 mb-1 h-8 pt-1'>
          {Object.values(CATEGORIES)
            .slice(0, 9)
            .map((category) => (
              <li key={category}>
                <label
                  onClick={() =>
                    router.push(
                      `${pathname}?${setQueryString('cat', category)}`
                    )
                  }
                  className='bg-pink-500 hover:bg-pink-600 dark:hover:bg-pink-400 cursor-pointer text-white p-1 rounded-sm'
                >
                  {category}
                </label>
              </li>
            ))}
        </ul>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  );
}
