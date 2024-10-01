import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiChevronDown } from 'react-icons/fi';

export function SidebarTitle({ open }: { open: boolean }) {
  return (
    <div className="my-3 border-b pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-secondary">
        <div className="flex gap-4">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              {/* <span className="block text-base font-semibold">{data?.user.username}</span> */}
              <span className="block text-base text-primary">Pro Plan</span>
            </motion.div>
          )}
        </div>
        {open && <FiChevronDown className="mr-2" />}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <motion.div layout className="grid size-10 shrink-0 place-content-center rounded-md">
      <Image src="/logo-no-text.png" alt="logo" width={50} height={50} className="h-auto w-auto" />
    </motion.div>
  );
}
