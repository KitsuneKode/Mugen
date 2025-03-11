'use client';

import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function BrainContentSkeleton() {
  return (
    <div className="py-24 px-4">
      <div className="container mx-auto py-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'loop',
              }}
            >
              <Brain className="h-12 w-12 text-primary" />
            </motion.div>
            <Skeleton className="h-10 w-64" />
          </div>
          <Skeleton className="h-5 w-full max-w-md mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <BentoCardSkeleton key={i} />
            ))}
        </div>

        <div className="mt-8 text-center">
          <Skeleton className="h-10 w-40 mx-auto" />
        </div>
      </div>
    </div>
  );
}

function BentoCardSkeleton() {
  return (
    <div className="bento-card bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <Skeleton className="h-6 w-20 rounded-md" />
            <Skeleton className="h-6 w-16 rounded-md" />
          </div>

          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>
  );
}
