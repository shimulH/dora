import React from 'react';
import { Skeleton } from './ui/skeleton';

export default function LoadingArticle() {
  return (
    <div className='flex-1 space-y-4 p-4 '>
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
          <li className='py-12'>
            <div className='space-y-2 '>
              <div className='space-y-5 xl:col-span-3'>
                <div className='space-y-6'>
                  <Skeleton className='h-96 w-full object-center transition-all hover:scale-105' />

                  <div>
                    <h2 className='text-2xl flex flex-col gap-2 font-bold leading-8 tracking-tight'>
                      <Skeleton className='h-6 w-full text-gray-900 dark:text-gray-100' />
                      <Skeleton className='h-6 w-1/2 text-gray-900 dark:text-gray-100' />
                    </h2>
                    <dl>
                      <dd className='text-base font-medium leading-6 pt-4 text-gray-500 dark:text-gray-400'>
                        <Skeleton className='h-4 w-3/12 text-gray-500 dark:text-gray-400' />
                      </dd>
                    </dl>
                  </div>
                  <div className='prose max-w-none flex flex-col gap-2 text-gray-500 dark:text-gray-400'>
                    <Skeleton className='h-6 w-full text-gray-900 dark:text-gray-100' />
                    <Skeleton className='h-6 w-full text-gray-900 dark:text-gray-100' />
                    <Skeleton className='h-6 w-full text-gray-900 dark:text-gray-100' />
                    <Skeleton className='h-6 w-1/2 text-gray-900 dark:text-gray-100' />
                  </div>
                </div>
                <div className='text-base font-medium leading-6'>
                  <Skeleton className='h-4 w-16' />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
