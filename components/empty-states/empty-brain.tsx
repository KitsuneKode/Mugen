'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Brain, Calendar, FileText, Plus, Twitter, Video } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { AddBrainDialog } from '../add-brain-dialog';

export default function EmptyBrain() {
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
          className="dark:brain-float"
        >
          <Brain className="h-20 w-20 text-primary mb-6" />
        </motion.div>

        <motion.h2
          className="text-2xl font-bold mb-3 halloween-font"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Welcome to Your Second Brain
        </motion.h2>

        <motion.p
          className="text-muted-foreground max-w-md mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Your digital brain is empty and ready to be filled with knowledge.
          Start by adding your first piece of content to organize your digital
          life in one place and share it to the world with just a click of a
          button.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="bg-card border border-border rounded-lg p-4 text-left">
            <FileText className="h-6 w-6 text-primary mb-2" />
            <h3 className="font-medium mb-1">Add Notes</h3>
            <p className="text-sm text-muted-foreground">
              Capture your thoughts, ideas, and summaries.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 text-left">
            <Video className="h-6 w-6 text-primary mb-2" />
            <h3 className="font-medium mb-1">Save Videos</h3>
            <p className="text-sm text-muted-foreground">
              Store and organize videos from YouTube and other platforms.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 text-left">
            <Twitter className="h-6 w-6 text-primary mb-2" />
            <h3 className="font-medium mb-1">Collect Tweets</h3>
            <p className="text-sm text-muted-foreground">
              Save valuable tweets and threads for future reference.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 text-left">
            <Calendar className="h-6 w-6 text-primary mb-2" />
            <h3 className="font-medium mb-1">Organize by Date</h3>
            <p className="text-sm text-muted-foreground">
              View your content chronologically to track your learning journey.
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
            Add Your First Brain
          </Button>
        </motion.div>

        <motion.p
          className="text-sm text-muted-foreground mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Need inspiration?{' '}
          <Link href="/explore" className="text-primary hover:underline">
            Explore public brains
          </Link>{' '}
          to see how others organize their knowledge.
        </motion.p>
      </motion.div>
      <AddBrainDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
