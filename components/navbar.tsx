'use client';

import type React from 'react';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggle } from './theme-toggle';

import { user } from '@/lib/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { signOut, useSession } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from './ui/button';
import Logo from './logo';

export default function Navbar() {
  const { data, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string>('1');
  const pathname = usePathname();

  const avatarInitials = data
    ? (data?.user as user).name.split(' ').map((n) => n[0])
    : 'MB';

  const handleRandomImage = () => {
    const randomNumber = Math.floor(Math.random() * 15);
    setImage(randomNumber.toString());
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full border-b border-border/70 bg-card backdrop-blur-sm supports-backdrop-filter:bg-card/60 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="p-8 ">
            <Link
              href={pathname === '/dashboard' ? '/' : '/dashboard'}
              className="flex items-center absolute top-1 left-2 gap-2 p-2"
            >
              <Logo height={32} width={32} className={`w-12 h-12`} />
              <h1 className=" text-xl font-bold font-space-grotesk md:hidden flex">
                Mugen
              </h1>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/brains">Brains</NavLink>
            <NavLink href="/chat">Chat</NavLink>
            <NavLink href="/explore">Explore</NavLink>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Button
              className="mx-0"
              onClick={async () => {
                if (status === 'unauthenticated') {
                  return redirect('/signin');
                }
                setLoading(true);
                await signOut({
                  redirect: pathname === '/explore' ? false : true,
                  callbackUrl: '/',
                });
                toast.success('Logged out successfully');
                setLoading(false);
              }}
            >
              {status === 'unauthenticated'
                ? 'Signin'
                : loading
                ? 'Logging out...'
                : 'Logout'}
            </Button>
            <Button
              onClick={handleRandomImage}
              variant="ghost"
              className="rounded-full hover:shadow-lg h-8 w-8 m-0 p-0 hover:shadow-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent/20"
            >
              <Avatar className="h-8 w-8 items-center overflow-hidden rounded-full">
                <AvatarImage src={`/avatars/${image}.png`} alt="@username" />
                <AvatarFallback className="flex items-center justify-center h-full w-full text-primary">
                  <span>{avatarInitials}</span>
                </AvatarFallback>
              </Avatar>
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-b border-border/40 bg-card flex justify-center h-screen">
            <nav className="flex flex-col p-4 gap-2 items-center">
              <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </MobileNavLink>
              <MobileNavLink
                href="/brains"
                onClick={() => setIsMenuOpen(false)}
              >
                Brain
              </MobileNavLink>
              <MobileNavLink
                href="/explore"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </MobileNavLink>

              <MobileNavLink href="/chat" onClick={() => setIsMenuOpen(false)}>
                Chat
              </MobileNavLink>
              <MobileNavLink
                href="/dashboard/tweets"
                onClick={() => setIsMenuOpen(false)}
              >
                Tweets
              </MobileNavLink>
              <MobileNavLink
                href="/dashboard/videos"
                onClick={() => setIsMenuOpen(false)}
              >
                Videos
              </MobileNavLink>
              <MobileNavLink
                href="/dashboard/article"
                onClick={() => setIsMenuOpen(false)}
              >
                Articles
              </MobileNavLink>

              <MobileNavLink href="/chat" onClick={() => setIsMenuOpen(false)}>
                Chat
              </MobileNavLink>

              {/* <div className="flex flex-col gap-2 mt-4 border-t border-border/40 hover:cursor-pointer"> */}
              <Button
                className="m-2 hover:cursor-pointer"
                onClick={async () => {
                  if (status === 'unauthenticated') {
                    return redirect('/signin');
                  }
                  setLoading(true);
                  await signOut({
                    redirect: pathname === '/explore' ? false : true,
                    callbackUrl: '/',
                  });
                  toast.success('Logged out successfully');
                  setLoading(false);
                }}
              >
                {status === 'unauthenticated'
                  ? 'Signin'
                  : loading
                  ? 'Logging out...'
                  : 'Logout'}
              </Button>
              {/* </div> */}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-foreground/70 hover:text-foreground transition-colors"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="py-2 text-foreground/70 hover:text-foreground transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
