'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Logo } from './logo';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/25 to-background -z-10" />

      {/* Animated dots */}
      <div className="absolute inset-0 -z-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/20 animate-pulse-slow"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Logo
              width={90}
              height={72}
              className="h-24 w-24 text-primary animate-float"
            />
            <Sparkles className="h-6 w-6 text-primary/80" />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-space-grotesk tracking-tight">
              Your <span className="text-primary">Second Brain</span> for the
              Digital Age
            </h1>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Organize your digital life in one place. Connect your thoughts, save
            content from across the web, and interact with your knowledge in new
            ways.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium shadow-md hover:shadow-xl hover:bg-primary/90 transition-all glow">
              Get Started
            </button>
            <button className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-all shadow-md hover:shadow-lg glow">
              Explore Public Brains
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
