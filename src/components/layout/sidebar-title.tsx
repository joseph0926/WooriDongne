import { ProfileResponseType } from '@/types/profile.type';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { ChevronDown } from 'lucide-react';

type SidebarTitleProps = {
  profile: ProfileResponseType;
  open: boolean;
};

export function SidebarTitle({ open, profile }: SidebarTitleProps) {
  return (
    <Accordion collapsible type="single" className="my-3 border-b pb-3">
      <AccordionItem value="main" className="rounded-md px-2 transition-colors hover:bg-secondary">
        <AccordionTrigger className="flex gap-4">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
              className="hidden text-start sm:block"
            >
              <span className="block text-base font-semibold">{profile.name}</span>
              <span className="block text-base text-primary">{profile.regionalGroup.name}</span>
            </motion.div>
          )}
          {open && (
            <ChevronDown className="hidden h-4 w-4 shrink-0 transition-transform duration-200 sm:block" />
          )}
        </AccordionTrigger>
        {open && (
          <AccordionContent className="text-dark/70 flex flex-col gap-4 dark:text-white/70">
            <div>
              이름:{' '}
              <span className="ml-2 font-semibold text-secondary-foreground">{profile.name}</span>
            </div>
            <div>
              이메일:{' '}
              <span className="ml-2 font-semibold text-secondary-foreground">
                {profile.user.email}
              </span>
            </div>
            <div>
              닉네임:{' '}
              <span className="ml-2 font-semibold text-secondary-foreground">
                {profile.user.username}
              </span>
            </div>
            <div>
              지역:{' '}
              <span className="ml-2 font-semibold text-secondary-foreground">
                {profile.regionalGroup.name}
              </span>
            </div>
          </AccordionContent>
        )}
      </AccordionItem>
    </Accordion>
  );
}

function Logo() {
  return (
    <motion.div layout className="grid size-10 shrink-0 place-content-center rounded-md">
      <Image src="/logo-no-text.png" alt="logo" width={50} height={50} className="h-auto w-auto" />
    </motion.div>
  );
}
