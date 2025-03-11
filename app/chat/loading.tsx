'use client';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import ChatBotSkeleton from '@/components/loaders/chat-skeleton';

export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-0.5rem)] flex flex-col gap-4">
      <div className="flex-1 items-center justify-center flex flex-col">
        <div className="container mx-auto my-auto px-4 mb-2">
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center items-center mb-4">
              <Skeleton className="h-10 w-72" />
            </div>
            <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-2" />
            <Skeleton className="h-6 w-4/5 max-w-xl mx-auto" />
          </motion.div>
        </div>

        <ChatBotSkeleton movement={false} />
      </div>

      <div className="text-center">
        <Skeleton className="h-4 w-96 mx-auto mb-2" />
      </div>
    </div>
  );
}
