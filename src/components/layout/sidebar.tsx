'use client';

import React, { useState } from 'react';
import {
  FiBarChart,
  FiChevronsRight,
  FiDollarSign,
  FiHome,
  FiLogOut,
  FiMonitor,
  FiSettings,
  FiShoppingCart,
  FiTag,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { SidebarOption } from './sidebar-option';
import { SidebarTitle } from './sidebar-title';
import { ProfileResponseType } from '@/types/profile.type';
import { cn } from '@/lib/utils';
import { logout } from '@/actions/auth.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type SidebarProps = {
  profile: ProfileResponseType;
};

export function Sidebar({ profile }: SidebarProps) {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(true);
  const [selected, setSelected] = useState<string>('Dashboard');

  const logoutHandler = async () => {
    const { success, message } = await logout();
    if (!success) {
      toast.error(message);
      return;
    }
    if (success) {
      router.push('/');
    }
  };

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
          Icon={FiSettings}
          title="Settings"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 hidden flex-col sm:flex">
        <motion.button
          layout
          onClick={logoutHandler}
          className="border-t transition-colors hover:bg-secondary"
        >
          <div className="flex items-center p-2">
            <motion.div layout className="grid size-10 place-content-center text-xl">
              <FiLogOut className="transition-transform" />
            </motion.div>
            {open && (
              <motion.span
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.125 }}
                className="text-base font-medium"
              >
                Logout
              </motion.span>
            )}
          </div>
        </motion.button>
        <ToggleClose open={open} setOpen={setOpen} />
      </div>
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
      className="border-t transition-colors hover:bg-secondary"
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
