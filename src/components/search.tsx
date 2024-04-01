'use client';
import React, { ChangeEvent, useEffect } from 'react';
import { Input } from './ui/input';
import { useQueryString } from '@/hooks/useQueryString';
import { usePathname, useRouter } from 'next/navigation';

export default function Search() {
  const { setQueryString } = useQueryString();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    router.push(`${pathname}?${setQueryString('q', event.target.value)}`);
  };

  useEffect(() => {
    router.push(`${pathname}?${setQueryString('q', '')}`);
  }, []);
  return (
    <div className='pb-12 px-4'>
      <Input
        type='text'
        className='h-10'
        onChange={handleSearch}
        placeholder='Search'
      />
    </div>
  );
}
