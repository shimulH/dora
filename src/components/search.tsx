'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Input } from './ui/input';
import { useQueryString } from '@/hooks/useQueryString';
import { usePathname, useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';

export default function Search() {
  const { setQueryString } = useQueryString();
  const router = useRouter();
  const pathname = usePathname();
  const [text, setText] = useState('');
  const [debouncedText] = useDebounce(text, 1000, { leading: true });

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  useEffect(() => {
    router.push(pathname);
  }, []);

  useEffect(() => {
    router.push(`${pathname}?${setQueryString('q', debouncedText)}`);
  }, [debouncedText]);

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
