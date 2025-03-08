'use client';

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
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Share2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ShareBrainDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddBrainDialog({ open, onOpenChange }: ShareBrainDialogProps) {
  const [name, setName] = useState('');
  const [sharedContent, setSharedContent] = useState<string[]>([]);

  const dummyContent = [
    { id: '1', title: 'Project Roadmap' },
    { id: '2', title: 'Meeting Notes' },
    { id: '3', title: 'Research Paper' },
    { id: '4', title: 'Book Summary' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Brain</DialogTitle>
          <DialogDescription>
            Choose a brain to share and customize its public settings.
          </DialogDescription>
        </DialogHeader>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="public-name">Brain Name</Label>
              <Input
                id="public-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter a name for your brain"
              />
            </div>

            <div className="space-y-2">
              <Label>Select Content to Share</Label>
              <div className="grid grid-cols-2 gap-2">
                {dummyContent.map((item) => (
                  <Button
                    key={item.id}
                    variant={
                      sharedContent.includes(item.id) ? 'default' : 'outline'
                    }
                    className="justify-start"
                    onClick={() =>
                      setSharedContent((prev) =>
                        prev.includes(item.id)
                          ? prev.filter((id) => id !== item.id)
                          : [...prev, item.id]
                      )
                    }
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        sharedContent.includes(item.id)
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    />
                    {item.title}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
