import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ComponentProps } from 'react';

type MobileNavbarLinkProps = ComponentProps<typeof Link> & {
  name: string;
  isOpen: boolean;
};

export function MobileNavbarLink({ isOpen, children, name, href }: MobileNavbarLinkProps) {
  return (
    <Link
      href={href}
      className="flex cursor-pointer place-items-center gap-3 rounded stroke-neutral-400 stroke-[0.75] p-1 text-neutral-400 transition-colors duration-100 hover:bg-neutral-700/30 hover:stroke-neutral-100 hover:text-neutral-100"
    >
      {children}
      <p
        className={cn(
          'font-poppins overflow-clip whitespace-nowrap tracking-wide text-inherit',
          isOpen ? 'block' : 'hidden'
        )}
      >
        {name}
      </p>
    </Link>
  );
}
