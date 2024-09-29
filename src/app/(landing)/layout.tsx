import { Navbar } from '@/components/layout/navbar';
import { PropsWithChildren } from 'react';

export default function LandingLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
