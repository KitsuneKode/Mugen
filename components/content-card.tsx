'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import type { ContentType } from '@prisma/client';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  AudioLines,
  ExternalLink,
  FileText,
  LinkIcon,
  Share2,
  Trash2,
  Twitter,
  Video,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { InstagramEmbed, XEmbed, YouTubeEmbed } from 'react-social-media-embed';
import { toast } from 'sonner';
import Reddit from './reddit';
import RedditEmbed from './reddit-embed';
import { user } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface ContentCard {
  link: string;
  id: number;
  createdAt: Date;
  Tags: {
    tag: string;
  }[];
  type: ContentType;
  title: string;
  user: {
    id: number;
    name: string;
    avatarId: number;
  };
}

export function ContentCard({ content }: { content: ContentCard }) {
  const { Tags, createdAt, link, title, type, user, id } = content;
  const { status, data } = useSession();
  const [redditEmbed, setRedditEmbed] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchEmbed = async () => {
      try {
        const { data } = await axios.post(`/api/reddit`, { link: link });
        setRedditEmbed(data.html);
      } catch {
        setRedditEmbed('');
      }
    };
    if (type === 'reddit' && redditEmbed === '') {
      fetchEmbed();
    }
  }, [link, redditEmbed, type]);

  useEffect(() => {
    if (status === 'authenticated') {
      setIsOwner(Number((data?.user as user).id) == content.user.id);
    }
  }, [status, data, content.user.id]);

  const getIcon = () => {
    switch (type) {
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'youtube':
        return <Video className="h-5 w-5" />;
      case 'article':
        return <FileText className="h-5 w-5" />;
      case 'reddit':
        return <Reddit className="h-5 w-5" />;
      case 'embed_link':
        return <LinkIcon className="h-5 w-5" />;
      case 'audio':
        return <AudioLines className="h-5 w-5" />;
      default:
        return <LinkIcon className="h-5 w-5" />;
    }
  };
  const getEmbed = () => {
    switch (type) {
      case 'twitter':
        return (
          <div className="flex items-center justify-center">
            <XEmbed url={link} />;
          </div>
        );
      case 'youtube':
        return (
          <div className="flex items-center justify-center">
            <YouTubeEmbed url={link} />;
          </div>
        );
      case 'instagram':
        return (
          <div className="flex items-center justify-center">
            <InstagramEmbed captioned url={link} />;
          </div>
        );
      case 'image':
        return (
          <div className="flex items-center justify-center">
            <Image
              src={link}
              width={100}
              height={100}
              alt={title}
              className="h-full w-full"
            />
          </div>
        );
      case 'article':
        return (
          <div className="aspect-3/2 bg-muted rounded-lg flex items-center justify-center overflow-hidden text-bold">
            {/* {JSON.parse(link)?.title && link} */}
            <p className="text-foreground line-clamp-3">
              {link}
              {/* {JSON.parse(link)?.description && link} */}
            </p>
          </div>
        );
      case 'reddit':
        return (
          <div className="flex justify-center items-center">
            {redditEmbed ? (
              <RedditEmbed className="w-full h-full" htmlString={redditEmbed} />
            ) : (
              link
            )}
          </div>
        );
      case 'embed_link':
        return (
          <div className="w-full h-full flex items-center justify-center">
            {link}
          </div>
        );
      case 'audio':
        return (
          <div className="h-full w-full flex items-center justify-center">
            <AudioLines className="h-5 w-5" />
            <audio src={link} className="w-full h-full"></audio>
          </div>
        );
      default:
        return <iframe src={link} className="h-full w-full" />;
    }
  };

  return (
    <motion.div
      className="bento-card bg-card border border-border/50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            {getIcon()}
            <h3 className="font-medium">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={link}
              target="_blank"
              className="p-1.5 hover:bg-accent bg-transparent rounded-md transition-colors"
            >
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </Link>
            {isOwner && (
              <>
                <Button
                  className="p-1.5 hover:bg-accent rounded-md bg-transparent transition-colors"
                  onClick={() => toast('Share to Brain Feature coming soon!')}
                >
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger className="p-1.5 hover:bg-accent rounded-md bg-transparent transition-colors">
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        remove this content from your brain.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => {
                          const res = await axios.delete(
                            `/api/content?contentId=${id}`
                          );
                          if (res.status === 200) {
                            toast.success('Content deleted successfully');
                            router.refresh();
                          } else {
                            toast.error('Unable to delete content');
                          }
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </div>
        </div>
        <div className="space-y-4 h-full w-full">
          <div className="aspect-3/2 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
            {getEmbed()}
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Image
              src={`/avatars/${user.avatarId}.png`}
              alt={title}
              width={24}
              height={24}
              className="rounded-full"
            />
            <div className="text-sm text-muted-foreground">{user.name}</div>
            <div className="text-xs text-muted-foreground">
              {createdAt.toDateString()}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {Tags.map((allTags) => (
            <span
              key={allTags.tag}
              className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md"
            >
              #{allTags.tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
