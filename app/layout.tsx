import Footer from '@/components/footer';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import type React from 'react';
import './globals.css';

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
        <div className="flex min-h-screen">
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
