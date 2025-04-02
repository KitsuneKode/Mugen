'use client';
import { Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import type { UIMessage } from 'ai';

interface ChatBubbleProps {
  message: UIMessage;
  isLoading?: boolean;
  isLastMessage?: boolean;
}

export function ChatBubble({
  message,
  isLoading = false,
  isLastMessage = false,
}: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.1,
        type: 'tween',
      }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <motion.div
        className={cn(
          'flex gap-3 max-w-[80%] rounded-lg p-3',
          isUser
            ? 'bg-primary text-primary-foreground ml-auto'
            : 'bg-secondary text-secondary-foreground'
        )}
      >
        {!isUser && (
          <div className="h-5 w-5 mt-1 shrink-0">
            <Bot className="h-5 w-5" />
          </div>
        )}

        <div className="overflow-hidden break-words">
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="text-[15px] leading-relaxed mb-2 last:mb-0">
                  {children}
                </p>
              ),
              a: ({ node, ...props }) => (
                <a
                  {...props}
                  className="text-blue-400 hover:text-blue-300 hover:underline transition-colors break-words"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
              //@ts-ignore
              code: ({ node, inline, className, children, ...props }) => {
                return inline ? (
                  <code
                    className="px-1.5 py-0.5 bg-gray-800/30 rounded-sm font-mono text-[13px]"
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <div className="relative my-2">
                    <pre className="overflow-x-auto rounded-md bg-gray-800/30 p-3">
                      <code className="font-mono text-[13px]" {...props}>
                        {children}
                      </code>
                    </pre>
                  </div>
                );
              },
              ul: ({ children }) => (
                <ul className="list-disc pl-4 mb-2 space-y-0.5 text-[15px]">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-4 mb-2 space-y-0.5 text-[15px]">
                  {children}
                </ol>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-gray-500 pl-3 my-2 text-gray-300 text-[15px]">
                  {children}
                </blockquote>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>

          {isLoading && !isUser && (
            <div className="inline-flex items-center gap-1 ml-1">
              <div className="w-1.5 h-1.5 bg-current rounded-full animate-ping [animation-delay:-0.3s] opacity-75" />
              <div className="w-1.5 h-1.5 bg-current rounded-full animate-ping [animation-delay:-0.15s] opacity-85" />
              <div className="w-1.5 h-1.5 bg-current rounded-full animate-ping [animation-delay:-0.21s] opacity-90" />
            </div>
          )}
        </div>

        {isUser && (
          <div className="h-5 w-5 mt-1 shrink-0">
            <User className="h-5 w-5" />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
