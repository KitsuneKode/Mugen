'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FileText,
  InstagramIcon,
  LinkIcon,
  Twitter,
  X,
  YoutubeIcon,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import Reddit from './reddit';

type ContentType =
  | 'link'
  | 'note'
  | 'tweet'
  | 'reddit'
  | 'youtube'
  | 'instagram';

interface AddContentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddContentDialog({
  open,
  onOpenChange,
}: AddContentDialogProps) {
  const [contentType, setContentType] = useState<ContentType | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast.success('Content added successfully');
    onOpenChange(false);
    setContentType(null);
  };

  const contentTypes = [
    {
      type: 'link' as const,
      icon: LinkIcon,
      label: 'Link',
      description: 'Save a link to an article, website, or resource',
    },
    {
      type: 'note' as const,
      icon: FileText,
      label: 'Note',
      description: 'Create a new note or document',
    },
    {
      type: 'tweet' as const,
      icon: Twitter,
      label: 'Tweet',
      description: 'Save a tweet or thread',
    },
    {
      type: 'youtube' as const,
      icon: YoutubeIcon,
      label: 'Youtube',
      description: 'Save a video from YouTube or other platforms',
    },
    {
      type: 'instagram' as const,
      icon: InstagramIcon,
      label: 'Instagram',
      description: 'Save reel/post/ from Instagram',
    },
    {
      type: 'reddit' as const,
      icon: Reddit,
      label: 'Reddit',
      description: 'Save reddit posts or comments',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Content</DialogTitle>
          <DialogDescription>
            Choose the type of content you want to add to your Second Brain.
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!contentType ? (
            <motion.div
              key="content-types"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-2 gap-4 py-4"
            >
              {contentTypes.map((type) => (
                <button
                  key={type.type}
                  onClick={() => setContentType(type.type)}
                  className="group relative flex flex-col items-center gap-2 rounded-lg border border-border p-4 hover:cursor-pointer hover:border-primary/50 hover:bg-accent"
                >
                  <type.icon className="h-8 w-8 text-primary" />
                  <div className="text-center">
                    <h3 className="font-medium">{type.label}</h3>
                    <p className="text-xs text-muted-foreground">
                      {type.description}
                    </p>
                  </div>
                </button>
              ))}
            </motion.div>
          ) : (
            <motion.form
              key="content-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="space-y-4 py-4"
            >
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="hover:bg-accent hover:cursor-pointer"
                  onClick={() => setContentType(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <h3 className="font-medium">
                  Add{' '}
                  {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
                </h3>
              </div>

              {contentType === 'link' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      placeholder="https://example.com"
                      type="url"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Title of the content"
                      required
                    />
                  </div>
                </>
              )}

              {contentType === 'note' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Note title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Write your note here..."
                      required
                      rows={5}
                    />
                  </div>
                </>
              )}

              {contentType === 'tweet' && (
                <div className="space-y-2">
                  <Label htmlFor="tweet-url">Tweet URL</Label>
                  <Input
                    id="tweet-url"
                    placeholder="https://twitter.com/user/status/123456789"
                    type="url"
                    required
                  />
                </div>
              )}

              {contentType === 'youtube' && (
                <div className="space-y-2">
                  <Label htmlFor="video-url">Video URL</Label>
                  <Input
                    id="video-url"
                    placeholder="https://youtube.com/watch?v=..."
                    type="url"
                    required
                  />
                </div>
              )}

              {contentType === 'reddit' && (
                <div className="space-y-2">
                  <Label htmlFor="video-url">Video Embed URL</Label>
                  <Input
                    id="video-url"
                    placeholder={`<blockquote class="reddit-embed-bq" style....`}
                    type="url"
                    required
                  />
                </div>
              )}

              {contentType === 'instagram' && (
                <div className="space-y-2">
                  <Label htmlFor="video-url">Video URL</Label>
                  <Input
                    id="video-url"
                    placeholder="https://instagram.com/..."
                    type="url"
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="Add tags separated by commas" />
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full">
                  Add to Second Brain
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
