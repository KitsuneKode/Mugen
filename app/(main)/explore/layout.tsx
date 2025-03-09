import '@/app/globals.css';
import type { Metadata } from 'next';
import type React from 'react';

export const metadata: Metadata = {
  title: 'Mugen Public Brains',
  description:
    'Share and explore public resources with Mugen Second Brain - a place to store, connect, and interact with your content from across the web.',
  icons: '/logo.svg',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
