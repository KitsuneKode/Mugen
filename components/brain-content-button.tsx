'use client';

import { Star, User } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';

const BrainContentButtons = ({
  stars,
  name,
  publicMode = true,
}: {
  name: string;
  stars: string;
  publicMode?: boolean;
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex items-center gap-1 text-xl font-bold text-primary">
        <User className="h-5 w-5 text-green-500" />
        <span>{name}</span>
      </div>
      <div className="flex items-center gap-1 font-bold text-xl text-primary">
        <Button
          className="p-0 m-0 hover:bg-accent hover:scale-120 rounded-md bg-transparent transition-colors"
          onClick={() => {
            //TODO
            // Handle star click
            console.log('Star clicked');
            toast.info('Coming soon');
          }}
        >
          <Star className="h-5 w-5 text-amber-500 hover:scale-120" />
        </Button>
        <span>{stars}</span>
      </div>
      {!publicMode && (
        <Button
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors glow"
          onClick={() => {
            toast.info('Coming soon');
          }}
        >
          Add to Brain
        </Button>
      )}
    </div>
  );
};

export default BrainContentButtons;
