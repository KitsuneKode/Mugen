'use client';

import { Share2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AddContentDialog } from './add-content-dialog';
import { ShareBrainDialog } from './share-brain-dailog';
import { Button } from './ui/button';
import { AddBrainDialog } from './add-brain-dialog';

export function ContentButtons() {
  const [open, setOpen] = useState(false);
  const [shareBrain, setShareBrain] = useState(false);
  const [openBrain, setOpenBrain] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const handleButtonClick = () => {
    setIsLoading(true);
    if (pathname.includes('/brains')) {
      setOpenBrain((prev) => !prev);
    } else {
      setOpen((prev) => !prev);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex gap-4">
        <Button
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors glow"
          onClick={handleButtonClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Loading...
            </>
          ) : pathname.includes('/brains') ? (
            'Add New Brain'
          ) : (
            'Add New Content'
          )}
        </Button>
        <Button
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 glow transition-colors"
          onClick={
            pathname.includes('/brains') ? () => setShareBrain(true) : () => {}
          }
        >
          {pathname.includes('/brains') ? (
            <>
              <Share2 /> Share Brain
            </>
          ) : (
            'Filter'
          )}
        </Button>
      </div>
      <AddContentDialog open={open} onOpenChange={setOpen} />
      <ShareBrainDialog open={shareBrain} onOpenChange={setShareBrain} />
      <AddBrainDialog open={openBrain} onOpenChange={setOpenBrain} />
    </>
  );
}
