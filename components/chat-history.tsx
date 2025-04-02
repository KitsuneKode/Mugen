import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Calendar, Clock, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatSession {
  id: string;
  title: string;
  date: string;
  preview: string;
  lastMessage: string;
}

interface ChatHistoryProps {
  sessions: ChatSession[];
  currentSessionId: string;
  onSessionSelect: (id: string) => void;
}

export function ChatHistory({
  sessions,
  currentSessionId,
  onSessionSelect,
}: ChatHistoryProps) {
  return (
    <div className="fixed left-0 top-[4rem] bottom-0 w-80 border-r border-border bg-card/50 backdrop-blur-xl">
      <div className="p-4 border-b border-border bg-background/50">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          Chat History
        </h2>
        <div className="mt-3 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-background/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-12rem)] scrollbar-thin scrollbar-thumb-primary/10 hover:scrollbar-thumb-primary/20">
        <AnimatePresence>
          {sessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                'p-4 cursor-pointer hover:bg-accent transition-all border-b border-border group relative',
                currentSessionId === session.id &&
                  'bg-accent/80 hover:bg-accent/90'
              )}
              onClick={() => onSessionSelect(session.id)}
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1 min-w-0">
                  <p className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                    {session.title}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2 group-hover:text-muted-foreground/80">
                    {session.preview}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/80">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{session.date}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{session.lastMessage}</span>
                    </div>
                  </div>
                </div>
              </div>
              <motion.div
                className={cn(
                  'absolute left-0 top-0 w-1 h-full bg-primary',
                  currentSessionId === session.id ? 'opacity-100' : 'opacity-0'
                )}
                initial={false}
                animate={{
                  opacity: currentSessionId === session.id ? 1 : 0,
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
