'use client';

import { getMyPrivateBrainsNames, shareBrain } from '@/app/actions/lib';
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
import { session } from '@/lib/auth';
import { AnimatePresence, motion } from 'framer-motion';
import { Brain, Copy, Globe, RefreshCw, Share2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ShareBrainDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareBrainDialog({
  open,
  onOpenChange,
}: ShareBrainDialogProps) {
  const [selectedBrain, setSelectedBrain] = useState<number | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [publicLink, setPublicLink] = useState('');
  const [brains, setBrains] = useState<{ id: number; name: string }[]>([]);
  const router = useRouter();
  const session = useSession();
  const userId = (session.data as session)?.user?.id;

  useEffect(() => {
    const fetchBrains = async () => {
      const response = await getMyPrivateBrainsNames(Number(userId));

      if (response) {
        setBrains(response);
      } else {
        toast.error('Failed to fetch Brains');
      }
    };
    if (session.status === 'authenticated') {
      fetchBrains();
    }

    if (!open) {
      setPublicLink('');
      setSelectedBrain(null);
      setIsPublic(false);
    }

    return () => {
      setPublicLink('');
      setSelectedBrain(null);
      setIsPublic(false);
    };
  }, [session, userId, refresh, open]);

  const handleShare = async () => {
    try {
      const response = await shareBrain(selectedBrain!, isPublic);

      if (response.link) {
        toast.success('Brain shared successfully');
        setPublicLink(response.link);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to share brain');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicLink);
    toast.message('Link copied');
    router.refresh();
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
            <Label>
              Select a Brain{' '}
              <Button
                className="ml-2 rounded-full"
                variant="outline"
                size="icon"
                disabled={publicLink !== ''}
                onClick={() => setRefresh(!refresh)}
              >
                <RefreshCw className="w-2 h-2" />
              </Button>
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {brains.map((brain) => (
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
                <div className=" h-1"></div>

                <div className="flex items-center space-x-2 border-2 rounded-2xl p-4">
                  <Switch
                    id="public-access"
                    checked={isPublic}
                    disabled={publicLink !== ''}
                    onCheckedChange={setIsPublic}
                  />
                  <Label htmlFor="public-access">Make brain public</Label>
                </div>
                <div className=" h-1"></div>

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
