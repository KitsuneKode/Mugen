'use client';

import { type Brain as BrainSchema } from '@prisma/client';
import { motion } from 'framer-motion';
import {
  Brain,
  User,
  Star,
  BookOpen,
  Globe,
  GlobeLockIcon,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { user } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'sonner';

interface Schema extends BrainSchema {
  user: {
    name: string;
    avatarId: number;
  };
  Link?: {
    hash: string;
  } | null;
  Tags: {
    tag: string;
  }[];
}

export default function BrainCard({
  brain,
  publicMode,
}: {
  brain: Schema;
  publicMode: boolean;
}) {
  const { status, data } = useSession();
  const [isOwner, setIsOwner] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (status === 'authenticated') {
      setIsOwner(Number((data?.user as user).id) == brain.userId);
    }
  }, [status, data, brain.userId]);
  return (
    <motion.div
      className="bento-card bg-card border border-border/50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="h-8 w-8 text-primary" />

          <div>
            <h3 className="font-bold text-lg">{brain.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{brain.user.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-amber-300" />
                <span>{brain.stars}</span>
              </div>
            </div>
          </div>
          {isOwner && (
            <div className="ml-auto flex items-center gap-1 ">
              {brain.share && (
                <Button
                  className="hover:bg-accent rounded-md w-10 h-10 bg-transparent transition-colors hover:scale-110"
                  onClick={async () => {
                    try {
                      const response: AxiosResponse = await axios.post(
                        '/api/brain/share',
                        {
                          share: false,
                          brainId: brain.id,
                        }
                      );

                      if (response.status === 200) {
                        toast.success(
                          'Brain converted to private successfully'
                        );

                        router.refresh();
                      }
                    } catch {
                      toast.error('Failed to private brain');
                    }
                  }}
                >
                  <GlobeLockIcon className="h-8 w-8 text-primary m-0" />
                </Button>
              )}
              <Button
                className="hover:bg-accent rounded-md w-10 h-10 bg-transparent transition-colors hover:scale-110"
                onClick={async () => {
                  try {
                    const response: AxiosResponse = await axios.delete(
                      '/api/brain',
                      {
                        data: {
                          brainId: brain.id,
                        },
                      }
                    );

                    if (response.status === 200) {
                      toast.success('Brain deleted successfully');

                      router.refresh();
                    }
                  } catch (error) {
                    if (axios.isAxiosError(error)) {
                      toast.error(
                        `Cannot delete a public brain, please unshare it first`
                      );
                    } else {
                      toast.error('Failed to delete brain');
                    }
                  }
                }}
              >
                <Trash2 className="h-8 w-8 text-primary" />
              </Button>
            </div>
          )}
        </div>
        <Link
          href={`${
            publicMode ? `/brains/${brain?.id}` : `/explore/${brain.Link?.hash}`
          }`}
        >
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {brain.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {brain.Tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
              >
                #{tag.tag}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center gap-2">
              <Image
                src={`/avatars/${brain.user.avatarId}.png`}
                alt={brain.user.name}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-sm">{brain.user.name}</span>
            </div>

            <div className="flex items-center gap-2">
              {brain.share && (
                <Button className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-md text-sm hover:bg-primary/20 transition-colors">
                  <Globe className="h-4 w-4" />
                  <span>Public</span>
                </Button>
              )}
              <Button className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-md text-sm hover:bg-primary/20 transition-colors">
                <BookOpen className="h-4 w-4" />
                <span>View</span>
              </Button>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
