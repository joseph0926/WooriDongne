import { NavbarWrapper } from '@/components/layout/navbar-wrapper';
import { PropsWithChildren } from 'react';

export default function LandingLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex h-full w-full flex-col">
      <NavbarWrapper />
      {children}
    </div>
  );
}
