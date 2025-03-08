'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      title={
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      }
      className={`relative overflow-hidden group ${className}`}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-primary relative z-10" />
      ) : (
        <Moon className="h-5 w-5 relative z-10" />
      )}
      <span className="sr-only">Toggle theme</span>
      <span className="absolute inset-0 dark:bg-primary/10 dark:group-hover:bg-primary/20 transition-colors rounded-md"></span>
    </Button>
  );
}
