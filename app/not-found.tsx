'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Home, Search, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const [jokeIndex, setJokeIndex] = useState(0);

  const brainJokes = [
    'Looks like your neurons took a wrong turn!',
    'This page has been lost in the folds of our cerebral cortex.',
    '404: Brain cell connection failed.',
    'Oops! Your thought wandered into uncharted territory.',
    'This memory seems to have been forgotten.',
    'Even a Second Brain forgets sometimes.',
    "We've searched every lobe, but this page is nowhere to be found.",
    "This synapse doesn't seem to be firing correctly.",
    'Your request got lost in our neural network.',
    "This page has been archived in the hippocampus... and we can't find it.",
  ];

  const handleNewJoke = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * brainJokes.length);
    } while (newIndex === jokeIndex);
    setJokeIndex(newIndex);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 star-bg">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-secondary/30 to-background -z-10" />

      {/* Animated dots */}
      <div className="absolute inset-0 -z-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: Math.random() * 2 + 1,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md z-10">
        <motion.div
          className="bg-card border border-border rounded-xl p-8 shadow-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.div
            className="flex justify-center mb-6"
            animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 4,
              ease: 'easeInOut',
            }}
          >
            <Brain className="h-24 w-24 text-primary" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-6xl font-bold font-space-grotesk mb-2 text-primary text-3d glow-text">
              404
            </h1>
            <h2 className="text-2xl font-bold mb-6">Page Not Found</h2>
          </motion.div>

          <motion.p
            className="text-lg text-muted-foreground mb-8"
            key={jokeIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {brainJokes[jokeIndex]}
          </motion.p>

          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={handleNewJoke}
              variant="secondary"
              className="w-full"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Try Another Joke
            </Button>

            <div className="grid grid-cols-2 gap-4">
              <Link href="/" className="w-full">
                <Button className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>

              <Link href="/dashboard" className="w-full">
                <Button variant="outline" className="w-full">
                  <Brain className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            </div>

            <div className="relative mt-2">
              <input
                type="text"
                placeholder="Search for content..."
                className="w-full px-4 py-2 pr-10 bg-background border border-input rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/50"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </motion.div>

          <motion.p
            className="text-sm text-muted-foreground mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Even a Second Brain has its limits. Let&apos;s get you back on
            track!
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
