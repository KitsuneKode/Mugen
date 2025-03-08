'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Check, Copy, Globe, Share2 } from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface ShareBrainDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareBrainDialog({
  open,
  onOpenChange,
}: ShareBrainDialogProps) {
  const [selectedBrain, setSelectedBrain] = useState<string | null>(null);
  const [publicName, setPublicName] = useState('');
  const [sharedContent, setSharedContent] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(false);
  const [publicLink, setPublicLink] = useState('');

  const dummyBrains = [
    { id: '1', name: 'Work Projects' },
    { id: '2', name: 'Personal Notes' },
    { id: '3', name: 'Research Ideas' },
  ];

  const dummyContent = [
    { id: '1', title: 'Project Roadmap' },
    { id: '2', title: 'Meeting Notes' },
    { id: '3', title: 'Research Paper' },
    { id: '4', title: 'Book Summary' },
  ];

  const handleShare = () => {
    // In a real application, you would make an API call here to share the brain
    const generatedLink = `https://secondbrain.app/public/${publicName
      .toLowerCase()
      .replace(/\s+/g, '-')}`;
    setPublicLink(generatedLink);
    toast.success('Brain shared to public successfully');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicLink);
    toast.message('Link copied');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share Your Brain</DialogTitle>
          <DialogDescription>
            Choose a brain to share and customize its public settings.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Select a Brain</Label>
            <div className="grid grid-cols-2 gap-2">
              {dummyBrains.map((brain) => (
                <Button
                  disabled={publicLink !== ''}
                  key={brain.id}
                  variant={selectedBrain === brain.id ? 'default' : 'outline'}
                  className="justify-start"
                  onClick={() => setSelectedBrain(brain.id)}
                >
                  <Brain className="mr-2 h-4 w-4" />
                  {brain.name}
                </Button>
              ))}
            </div>
          </div>

          {selectedBrain && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="public-name">Public Name</Label>
                  <Input
                    id="public-name"
                    disabled={publicLink !== ''}
                    value={publicName}
                    onChange={(e) => setPublicName(e.target.value)}
                    placeholder="Enter a public name for your brain"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Select Content to Share</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {dummyContent.map((item) => (
                      <Button
                        key={item.id}
                        disabled={publicLink !== ''}
                        variant={
                          sharedContent.includes(item.id)
                            ? 'default'
                            : 'outline'
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

                <div className="flex items-center space-x-2">
                  <Switch
                    id="public-access"
                    checked={isPublic}
                    disabled={publicLink !== ''}
                    onCheckedChange={setIsPublic}
                  />
                  <Label htmlFor="public-access">Make brain public</Label>
                </div>

                {isPublic && (
                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span>
                        This brain will be accessible to anyone with the link
                      </span>
                    </div>
                  </div>
                )}

                {!publicLink && (
                  <Button onClick={handleShare} className="w-full">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Brain
                  </Button>
                )}

                {publicLink && (
                  <div className="space-y-2">
                    <Label>Public Link</Label>
                    <div className="flex items-center gap-2">
                      <Input value={publicLink} readOnly />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={copyToClipboard}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
