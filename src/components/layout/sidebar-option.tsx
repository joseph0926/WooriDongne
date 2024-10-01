import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons/lib';

type OptionProps = {
  Icon: IconType;
  title: string;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
  notifs?: number;
};

export function SidebarOption({ Icon, title, selected, setSelected, open, notifs }: OptionProps) {
  return (
    <motion.button
      layout
      onClick={() => setSelected(title)}
      className={cn(
        `relative flex h-10 w-full items-center rounded-md transition-colors`,
        selected === title
          ? 'bg-secondary text-primary'
          : 'text-secondary-foreground hover:bg-secondary'
      )}
    >
      <motion.div layout className="grid size-14 h-full place-content-center text-lg">
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="font-medium"
        >
          {title}
        </motion.span>
      )}

      {notifs && open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          style={{ y: '-50%' }}
          transition={{ delay: 0.5 }}
          className="absolute right-2 top-1/2 size-5 rounded bg-primary text-center text-sm text-white"
        >
          {notifs}
        </motion.span>
      )}
    </motion.button>
  );
}
