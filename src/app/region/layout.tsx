import { Sidebar } from '@/components/layout/sidebar';
import { ProfileWrapper } from '@/components/region/profile-wrapper';
import { PropsWithChildren } from 'react';

export default function RegionLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex">
        <Sidebar />
        {children}
      </div>
      <ProfileWrapper />
    </>
  );
}
