import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import type React from 'react';
import './globals.css';
import { Providers } from './providers';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'Mugen - Your Digital Knowledge Hub',
  description:
    'Organize your digital life with Second Brain - a place to store, connect, and interact with your content from across the web.',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <Providers>
          <div className="flex min-h-screen">
            <main className="flex-1 overflow-auto">{children}</main>
            <Toaster richColors />
            <Analytics />
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
