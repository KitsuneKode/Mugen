import '@/app/globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import type React from 'react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'Mugen Signup',
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
          <main className="flex-1 overflow-auto">
            <div className="fixed inset-0 bg-gradient-to-br from-primary/50 via-primary/10 to-secondary/10 -z-10" />
            <div className="fixed inset-0 bg-gradient-to-r from-primary/50 via-primary/10 to-secondary/10 -z-10" />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
