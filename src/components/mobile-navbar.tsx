'use client';

import { mobileNavbarContainerVariants, mobileNavbarSvgVariants } from '@/constants/anim';
import { navItems } from '@/constants/items';
import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useState } from 'react';
import { MobileNavbarLink } from './mobile-navbar-link';

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const mobileNavbarContainerControls = useAnimationControls();
  const mobileNavbarSvgControls = useAnimationControls();

  useEffect(() => {
    if (isOpen) {
      mobileNavbarContainerControls.start('open');
      mobileNavbarSvgControls.start('open');
    } else {
      mobileNavbarContainerControls.start('close');
      mobileNavbarSvgControls.start('close');
    }
  }, [isOpen, mobileNavbarContainerControls, mobileNavbarSvgControls]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
    setSelectedProject(null);
  };

  return (
    <aside className="block lg:hidden">
      <motion.nav
        variants={mobileNavbarContainerVariants}
        animate={mobileNavbarContainerControls}
        initial="close"
        className="absolute left-0 top-0 z-10 flex h-full flex-col gap-20 bg-neutral-900 p-5 shadow shadow-neutral-600"
      >
        <div className="flex w-full flex-row place-items-center justify-between">
          <div className="relative h-10 w-10 rounded-full bg-white">
            <h1 className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-2xl font-bold dark:text-black">
              J
            </h1>
          </div>
          <button className="flex rounded-full p-1" onClick={() => handleOpenClose()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="h-8 w-8 stroke-neutral-200"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={mobileNavbarSvgVariants}
                animate={mobileNavbarSvgControls}
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                transition={{
                  duration: 0.5,
                  ease: 'easeInOut',
                }}
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-6">
          {navItems.map((item) => (
            <MobileNavbarLink isOpen={isOpen} href={item.href} name={item.label} key={item.href}>
              {item.icon}
            </MobileNavbarLink>
          ))}
        </div>
      </motion.nav>
    </aside>
  );
}
