'use client';

import React, { useState } from 'react';
import {
  FiBarChart,
  FiChevronsRight,
  FiDollarSign,
  FiHome,
  FiMonitor,
  FiShoppingCart,
  FiTag,
  FiUsers,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { SidebarOption } from './sidebar-option';
import { SidebarTitle } from './sidebar-title';
import { ProfileResponseType } from '@/types/profile.type';
import { cn } from '@/lib/utils';

type SidebarProps = {
  profile: ProfileResponseType;
};

export function Sidebar({ profile }: SidebarProps) {
  const [open, setOpen] = useState<boolean>(true);
  const [selected, setSelected] = useState<string>('Dashboard');

  return (
    <motion.nav
      layout
      className={cn(
        'sticky top-0 h-screen shrink-0 border border-r p-2',
        open ? 'w-fit sm:w-[260px]' : 'w-fit'
      )}
    >
      <SidebarTitle open={open} profile={profile} />
      <div className="space-y-2.5">
        <SidebarOption
          Icon={FiHome}
          title="Dashboard"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <SidebarOption
          Icon={FiDollarSign}
          title="Sales"
          selected={selected}
          setSelected={setSelected}
          open={open}
          notifs={3}
        />
        <SidebarOption
          Icon={FiMonitor}
          title="View Site"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <SidebarOption
          Icon={FiShoppingCart}
          title="Products"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <SidebarOption
          Icon={FiTag}
          title="Tags"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <SidebarOption
          Icon={FiBarChart}
          title="Analytics"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <SidebarOption
          Icon={FiUsers}
          title="Members"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
}

function ToggleClose({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 hidden border-t transition-colors hover:bg-secondary sm:block"
    >
      <div className="flex items-center p-2">
        <motion.div layout className="grid size-10 place-content-center text-xl">
          <FiChevronsRight className={`transition-transform ${open && 'rotate-180'}`} />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-base font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
}
