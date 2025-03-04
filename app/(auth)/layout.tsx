import '@/app/globals.css';
import type { Metadata } from 'next';
import type React from 'react';

export const metadata: Metadata = {
  title: 'Mugen Signup',
  description:
    'Organize your digital life with Second Brain - a place to store, connect, and interact with your content from across the web.',
  icons: '/logo.svg',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 overflow-auto">
        <div className="fixed inset-0 bg-gradient-to-br from-primary/50 via-primary/10 to-secondary/10 -z-10" />
        {children}
        <div className="fixed inset-0 bg-gradient-to-r from-primary/50 via-primary/10 to-secondary/10 -z-10" />
      </main>
    </div>
  );
}
