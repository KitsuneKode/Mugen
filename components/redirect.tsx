'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const Redirect = ({ to }: { to: string }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, []);

  return <div></div>;
};
