'use client';
import { Bot, User, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

export default function ChatBotSkeleton({ movement = true }) {
  // Generate placeholder messages
  const placeholderMessages = [
    { role: 'assistant', loading: true },
    { role: 'user', loading: true },
    { role: 'assistant', loading: true },
  ];

  return (
    <div
      className={`max-w-3xl mx-auto max-h-screen ${
        !movement ? 'min-w-[60%]' : ''
      }`}
    >
      <motion.div
        className="bg-card border border-border rounded-xl overflow-hidden shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          rotate: movement ? [-1, 1, -1] : 0,
          transition: {
            rotate: {
              repeat: Infinity,
              duration: 2,
              ease: 'easeInOut',
            },
            opacity: { duration: 0.5 },
            y: { duration: 0.5 },
          },
        }}
        viewport={{ once: true }}
      >
        <div className="p-4 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Brain Assistant</h3>
          </div>
        </div>

        <div
          className={`h-96 overflow-y-auto p-4 space-y-4 scroll-smooth ${
            !movement ? 'h-[60vh]' : ''
          }`}
        >
          {placeholderMessages.map((message, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: message.role === 'user' ? 20 : -20,
              }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: 'spring',
                duration: 0.5,
                delay: index * 0.1,
                bounce: 0.3,
              }}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <motion.div
                className={`
                    flex gap-3 max-w-[80%] rounded-lg p-3
                    ${
                      message.role === 'user'
                        ? 'bg-primary/30 text-primary-foreground ml-auto'
                        : 'bg-secondary text-secondary-foreground'
                    }
                  `}
              >
                {message.role === 'assistant' && (
                  <motion.div
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <Bot className="h-5 w-5 mt-1 shrink-0" />
                  </motion.div>
                )}
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-56" />
                  {message.role === 'assistant' && (
                    <Skeleton className="h-4 w-28" />
                  )}
                </div>
                {message.role === 'user' && (
                  <motion.div
                    initial={{ rotate: 10 }}
                    animate={{ rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <User className="h-5 w-5 mt-1 shrink-0" />
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}

          {/* Add a typing indicator for the last message */}
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="bg-secondary rounded-lg p-3 flex gap-2 items-center">
              <Bot className="h-5 w-5 shrink-0" />
              <div className="flex gap-1">
                <div
                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: '0ms' }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: '300ms' }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: '600ms' }}
                ></div>
              </div>
            </div>
          </motion.div>
        </div>

        <form className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Skeleton className="flex-1 h-10 rounded-lg" />
            <Button
              disabled
              className="p-2 mt-1 bg-primary/50 text-primary-foreground rounded-lg"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
