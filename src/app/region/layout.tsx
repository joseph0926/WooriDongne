import { ProfileWrapper } from '@/components/region/profile-wrapper';
import { Skeleton } from '@/components/ui/skeleton';
import SkeletonList from '@/components/ui/skeleton-list';
import { PropsWithChildren, Suspense } from 'react';

export default function RegionLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex">
        <Suspense fallback={<SidebarLoading />}>
          <ProfileWrapper />
        </Suspense>
        {children}
      </div>
    </>
  );
}

function SidebarLoading() {
  return (
    <div className="relative flex h-screen w-[260px] flex-col gap-4 px-4">
      <div className="flex h-20 items-center gap-4">
        <Skeleton className="size-10 rounded-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="flex flex-col gap-6">
        <SkeletonList length={7} className="h-8 w-full rounded-md" />
      </div>
      <Skeleton className="absolute bottom-6 left-4 h-14 w-[calc(100%-2rem)]" />
    </div>
  );
}
