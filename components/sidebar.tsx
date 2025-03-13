'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Brain,
  ChevronLeft,
  ChevronRight,
  FileText,
  Hash,
  LinkIcon,
  Twitter,
  Video,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import Logo from './logo';
import Reddit from './reddit';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { icon: Twitter, label: 'Tweets', href: '#tweets' },
    { icon: Video, label: 'Videos', href: '#videos' },
    { icon: FileText, label: 'Documents', href: '#documents' },
    { icon: LinkIcon, label: 'Links', href: '#links' },
    { icon: Reddit, label: 'Reddit', href: '#reddit' },
    { icon: Hash, label: 'Tags', href: '#tags' },
  ];

  const handleChatClick = () => {
    toast.info('Coming soon', {
      icon: <Brain className="h-4 w-4 " />,
    });
  };

  return (
    <div
      className={cn(
        'flex flex-col h-screen bg-card border-r border-border transition-all duration-300 z-60',
        isCollapsed ? 'w-0 md:w-20' : 'w-0 md:w-56'
      )}
    >
      <div className="hidden md:flex items-center justify-between p-4 border-b border-border">
        <Link
          href={pathname === '/dashboard' ? '/' : '/dashboard'}
          className="flex items-center gap-2 "
        >
          <Logo
            width={8}
            height={8}
            className={
              isCollapsed
                ? 'h-8 w-8 mr-0 pr-0 scale-110 ml-1'
                : 'h-10 w-12 mx-2'
            }
          />
          {!isCollapsed && (
            <h1 className="text-xl font-bold font-space-grotesk">Mugen</h1>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex text-primary border-bg-primary p-0 m-0"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 " />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="hidden md:flex flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <span
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                    pathname === item.href
                      ? 'bg-primary text-primary'
                      : 'text-muted-foreground hover:bg-primary/15 hover:text-primary',
                    !isCollapsed && 'ml-6'
                  )}
                >
                  <item.icon
                    className={`h-5 w-5 text-primary ${isCollapsed && 'ml-2'}`}
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-border ">
        <Button
          variant="default"
          className={`w-full justify-center gap-2 h-10 ${
            isCollapsed
              ? 'rounded-full z-10 scale-125 hover:scale-140 fixed right-8 bottom-10 w-fit'
              : 'rounded-full z-10 scale-125 hover:scale-140 fixed right-8 bottom-10 w-fit md:right-0 md:scale-100 md:hover:scale-110 md:rounded-2xl md:w-full md:static'
          }`}
          onClick={handleChatClick}
        >
          <Brain className="h-10 w-10" />
          {!isCollapsed && <span className="hidden md:flex">Ask Brain</span>}
        </Button>
      </div>
    </div>
  );
}
