'use client';

import { Star, User, Plus } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import { toast } from 'sonner';

const BrainContentButtons = ({
  stars,
  name,
}: {
  name: string;
  stars: string;
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
          }}
        >
          <Star className="h-5 w-5 text-amber-500 hover:scale-120" />
        </Button>
        <span>{stars}</span>
      </div>
      <Button
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors glow"
        onClick={() => {
          toast.info('Coming soon');
        }}
      >
        <Plus className="" />
        Add to Brain
      </Button>
    </div>
  );
};

export default BrainContentButtons;
