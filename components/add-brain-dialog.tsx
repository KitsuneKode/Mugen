'use client';

import { getMyContentsName } from '@/app/actions/lib';
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
import { Brain, Check } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Textarea } from './ui/textarea';
import { session } from '@/lib/auth';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface ShareBrainDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddBrainDialog({ open, onOpenChange }: ShareBrainDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sharedContent, setSharedContent] = useState<number[]>([]);
  const router = useRouter();

  const [content, setContent] = useState<{ id: number; title: string }[]>([
    { title: '', id: 0 },
  ]);
  const session = useSession();

  const userId = (session.data as session)?.user?.id;

  useEffect(() => {
    const fetchContent = async () => {
      const response = await getMyContentsName(Number(userId));

      if (response) {
        setContent(response);
      } else {
        toast.error('Failed to fetch content');
      }
    };
    if (session.status === 'authenticated') {
      fetchContent();
    }
  }, [session.status, userId]);

  const handleAddBrain = async () => {
    try {
      const response = await axios.post(
        '/api/brain',
        {
          contentIds: sharedContent,
          name,
          description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        toast.success('Brain added successfully');
      }
    } catch (err) {
      console.error('Error adding brain:', err);
      toast.error('Failed to add brain');
      setName('');
      setDescription('');
      setSharedContent([]);
      setContent([{ title: '', id: 0 }]);
      onOpenChange(false);
      return;
    }

    setName('');
    setDescription('');
    setSharedContent([]);
    setContent([{ title: '', id: 0 }]);
    onOpenChange(false);

    router.refresh();
  };

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
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter a name for your brain"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Brain Description</Label>
              <Textarea
                id="description"
                value={description}
                rows={3}
                required
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description for your brain"
              />
            </div>

            <div className="space-y-2">
              <Label>Select Content to Share</Label>
              <div className="max-h-60 overflow-y-auto grid grid-cols-2 gap-2">
                {content.map((item) => (
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
              <div className="text-sm text-muted-foreground p-2"></div>

              {sharedContent.length > 0 && name && description && (
                <Button onClick={handleAddBrain} className="w-full ">
                  <Brain className="mr-2 h-4 w-4" />
                  Add Brain
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
