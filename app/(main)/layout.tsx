import '@/app/globals.css';
import type { Metadata } from 'next';
import type React from 'react';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';

export const metadata: Metadata = {
  title: 'Mugen Dashboard',
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
        <div className="fixed inset-0 bg-gradient-to-bl from-primary/20 via-background/30 to-secondary/10 -z-10" />
        <Navbar />
        <Sidebar />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
