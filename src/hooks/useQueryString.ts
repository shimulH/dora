import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

export const useQueryString = () => {
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const setQueryString = useCallback(
    (name: string, value: string | number | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value ? value.toString() : '');

      return params.toString();
    },
    [searchParams]
  );

  const getQueryString = (name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    return params.get(name);
  };

  return { setQueryString, getQueryString };
};
