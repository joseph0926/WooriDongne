'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ComponentProps, useEffect, useState } from 'react';

const TOGGLE_CLASSES =
  'text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10';

export function ThemeToggle({ className }: ComponentProps<'div'>) {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (!theme) {
      setTheme('system');
    }
  }, [theme, setTheme]);

  if (!isMounted) {
    return null;
  }
  return (
    <div className={cn('relative w-fit items-center rounded-full', className)}>
      <button
        className={cn(TOGGLE_CLASSES, theme === 'light' ? 'text-white' : 'text-slate-300')}
        onClick={() => {
          setTheme('light');
        }}
      >
        <Moon className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Light</span>
      </button>
      <button
        className={cn(TOGGLE_CLASSES, theme === 'dark' ? 'text-white' : 'text-slate-800')}
        onClick={() => {
          setTheme('dark');
        }}
      >
        <Sun className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Dark</span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          theme === 'dark' ? 'justify-end' : 'justify-start'
        }`}
      >
        <motion.span
          layout
          transition={{ type: 'spring', damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-primary via-primary/80 to-primary/60"
        />
      </div>
    </div>
  );
}
