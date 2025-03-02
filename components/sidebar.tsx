import { FileText, Hash, LinkIcon, Twitter, Video } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import { Logo } from './logo';

export default function Sidebar() {
  return (
    <div className="w-64 border-r border-border bg-card p-4 flex flex-col h-screen">
      <div className="flex items-center gap-2 mb-8">
        <Logo width={32} height={32} className="h-16 w-12" />
        <h1 className="text-xl font-bold font-space-grotesk">Second Brain</h1>
      </div>

      <nav className="space-y-4 flex-1">
        <SidebarLink
          icon={<Twitter className="h-5 w-5" />}
          label="Tweets"
          href="/tweets"
        />
        <SidebarLink
          icon={<Video className="h-5 w-5 text-primary" />}
          label="Videos"
          href="/videos"
        />
        <SidebarLink
          icon={<FileText className="h-5 w-5 text-primary" />}
          label="Documents"
          href="/documents"
        />
        <SidebarLink
          icon={<LinkIcon className="h-5 w-5 text-primary" />}
          label="Links"
          href="/links"
        />
        <SidebarLink
          icon={<Hash className="h-5 w-5 text-primary" />}
          label="Tags"
          href="/tags"
        />
      </nav>

      <div className="mt-auto pt-4 border-t border-border">
        <button className="w-full py-2 px-3 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors">
          Ask Brain
        </button>
      </div>
    </div>
  );
}

function SidebarLink({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
    >
      {icon}
      <span className="text-foreground/80">{label}</span>
    </Link>
  );
}
