'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Brain, ExternalLink, Share2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function BrainEmpty({
  publicMode = true,
}: {
  publicMode?: boolean;
}) {
  return (
    <div className="container mx-auto py-16 px-4 max-h-screen overflow-y-auto">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'loop',
          }}
          className="mx-auto mb-6 w-fit"
        >
          <Brain className="h-16 w-16 text-primary" />
        </motion.div>

        <h1 className="text-3xl font-bold mb-4">This Brain is Empty</h1>
        <p className="text-muted-foreground mb-8">
          {publicMode
            ? `This public brain doesn't have any content yet. The owner might
          be still working on it or hasn't shared any content publicly or
          removed his contents.`
            : `This brain doesn't have any content yet. You can start to add
          content to your brain.`}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {publicMode && (
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success('Brain link copied to clipboard');
              }}
            >
              <Share2 className="h-4 w-4" />
              Share This Brain
            </Button>
          )}

          <Link href="/explore">
            <Button variant="default" className="gap-2 w-full sm:w-auto">
              <ExternalLink className="h-4 w-4" />
              Explore Other Public Brains
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-xl font-medium mb-4">
            Want to create your own Second Brain?
          </h2>
          <Link href="/brains">
            <Button className="glow">Get Started For Free</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
