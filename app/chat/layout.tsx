import '@/app/globals.css';
import Navbar from '@/components/navbar';
import type { Metadata } from 'next';
import type React from 'react';

export const metadata: Metadata = {
  title: 'Chat with MugenBot',
  description:
    'Organize your digital life with Mugen Second Brain - a place to store, connect, and interact with your content.',
  icons: '/logo.svg',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col flex-1">
        <div className="absolute inset-0 bg-gradient-to-tl from-primary/11 to-secondary -z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/11 to-secondary -z-10" />
        <Navbar />
        <main className="flex-1 overflow-hidden">{children}</main>
        <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background/30 to-secondary/10 -z-10" />
      </div>
    </div>
  );
}
