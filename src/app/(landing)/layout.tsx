import { Navbar } from '@/components/layout/navbar';
import { getUserInfo } from '@/services/user.service';
import { PropsWithChildren } from 'react';

export default async function LandingLayout({ children }: PropsWithChildren) {
  const { data } = await getUserInfo();

  return (
    <div className="relative flex h-full w-full flex-col">
      <Navbar userData={data} />
      {children}
    </div>
  );
}
