'use client';
import { motion } from 'framer-motion';
import {
  FileText,
  Video,
  Twitter,
  Share2,
  Trash2,
  LinkIcon,
  ExternalLink,
} from 'lucide-react';
import Reddit from './reddit';

export default function EmbedCard({
  type,
  title,
  author,
  date,
  content,
}: {
  type: 'twitter' | 'youtube' | 'article' | 'reddit' | 'website';
  title: string;
  author: string;
  date: string;
  content: React.ReactNode;
}) {
  const getIcon = () => {
    switch (type) {
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'youtube':
        return <Video className="h-5 w-5" />;
      case 'article':
        return <FileText className="h-5 w-5" />;
      case 'reddit':
        return <Reddit className="h-5 w-5" />;
      case 'website':
        return <LinkIcon className="h-5 w-5" />;
      default:
        return <LinkIcon className="h-5 w-5" />;
    }
  };

  return (
    <motion.div
      className="bento-card bg-card border border-border/50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            {getIcon()}
            <h3 className="font-medium">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 hover:bg-accent rounded-md transition-colors">
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="p-1.5 hover:bg-accent rounded-md transition-colors">
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="p-1.5 hover:bg-accent rounded-md transition-colors">
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {content}

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-border/50">
          <div className="text-sm text-muted-foreground">{author}</div>
          <div className="text-xs text-muted-foreground">{date}</div>
        </div>
      </div>
    </motion.div>
  );
}
