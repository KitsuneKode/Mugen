'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { FileText, Globe, LinkIcon, Plus, Twitter, Video } from 'lucide-react';
import { useState } from 'react';
import { AddContentDialog } from '../add-content-dialog';

export default function EmptyDashboard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        className="flex flex-col items-center justify-center py-16 px-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative"
        >
          <LinkIcon className="h-20 w-20 text-primary mb-6" />
          <motion.div
            className="absolute top-0 right-0"
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'loop',
            }}
          >
            <Plus className="h-8 w-8 text-accent" />
          </motion.div>
        </motion.div>

        <motion.h2
          className="text-2xl font-bold mb-3 halloween-font"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Start Collecting Web Content
        </motion.h2>

        <motion.p
          className="text-muted-foreground max-w-md mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Your content collection is empty. Save content from across the web to
          build your personal knowledge repository.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="bg-card border border-border rounded-lg p-4 text-left">
            <Twitter className="h-6 w-6 text-primary mb-2" />
            <h3 className="font-medium mb-1">Twitter Threads</h3>
            <p className="text-sm text-muted-foreground">
              Save valuable Twitter threads and tweets.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 text-left">
            <Video className="h-6 w-6 text-primary mb-2" />
            <h3 className="font-medium mb-1">YouTube Videos</h3>
            <p className="text-sm text-muted-foreground">
              Embed and organize videos from YouTube.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 text-left">
            <FileText className="h-6 w-6 text-primary mb-2" />
            <h3 className="font-medium mb-1">Articles & Blogs</h3>
            <p className="text-sm text-muted-foreground">
              Save articles and blog posts for future reference.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 text-left">
            <Globe className="h-6 w-6 text-primary mb-2" />
            <h3 className="font-medium mb-1">Websites</h3>
            <p className="text-sm text-muted-foreground">
              Bookmark and organize websites you want to remember.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="lg"
            className="glow dark:glow-button"
            onClick={() => setOpen((prev) => !prev)}
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Your First Content
          </Button>
        </motion.div>

        <motion.div
          className="mt-8 p-4 bg-secondary/30 border border-border rounded-lg max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <h3 className="font-medium mb-2">Pro Tip</h3>
          <p className="text-sm text-muted-foreground">
            Install our browser extension to quickly save content while browsing
            the web. One click to save to your Second Brain!
          </p>
          <Button variant="link" className="text-primary p-0 h-auto mt-2">
            Get Browser Extension
          </Button>
        </motion.div>
      </motion.div>

      <AddContentDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
