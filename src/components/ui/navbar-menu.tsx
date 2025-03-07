'use client';

import React, { ComponentProps, PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import Link, { LinkProps } from 'next/link';
import Image from 'next/image';
import { navbarMenuTransition } from '@/constants/navbar';
import { cn } from '@/lib/utils';

export const MenuItem = React.memo(
  ({
    setActive,
    active,
    item,
    children,
  }: {
    setActive: (item: string) => void;
    active: string | null;
    item: string;
    children?: React.ReactNode;
  }) => {
    return (
      <div onMouseEnter={() => setActive(item)} className="relative">
        <motion.p
          transition={{ duration: 0.3 }}
          className="cursor-pointer font-medium transition-all hover:font-bold"
        >
          {item}
        </motion.p>
        {active === item && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={navbarMenuTransition}
          >
            <div className="absolute left-1/2 top-[calc(100%_+_1.2rem)] -translate-x-1/2 transform pt-4">
              <motion.div
                transition={navbarMenuTransition}
                layoutId="active"
                className="overflow-hidden rounded-2xl border border-black/[0.2] bg-white shadow-xl backdrop-blur-sm dark:border-white/[0.2] dark:bg-black"
              >
                <motion.div layout className="h-full w-max p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    );
  }
);
MenuItem.displayName = 'MenuItem';

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className={cn(
        'relative flex justify-center space-x-12 rounded-full border border-transparent px-8 py-6'
      )}
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="mb-1 text-xl font-bold text-black dark:text-white">{title}</h4>
        <p className="max-w-[10rem] text-sm text-neutral-700 dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({
  children,
  ...rest
}: ComponentProps<'a'> & PropsWithChildren<LinkProps>) => {
  return (
    <Link {...rest} className="text-neutral-700 hover:text-black dark:text-neutral-200">
      {children}
    </Link>
  );
};
