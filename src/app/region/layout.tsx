import { ProfileWrapper } from '@/components/region/profile-wrapper';
import { PropsWithChildren, Suspense } from 'react';

export default function RegionLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex">
        <Suspense fallback={<div>Loading</div>}>
          <ProfileWrapper />
        </Suspense>
        {children}
      </div>
    </>
  );
}
