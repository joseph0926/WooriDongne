import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from './navbar';
import { Loader2, User2 } from 'lucide-react';
import { Suspense } from 'react';
import { getProfile } from '@/services/region.service';
import { redirect } from 'next/navigation';

export function NavbarWrapper({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'sticky inset-x-0 top-0 z-50 flex h-24 items-center justify-between px-10',
        className
      )}
    >
      <Link href="/">
        <Image
          src="/logo-no-text.png"
          alt="logo"
          width={50}
          height={50}
          priority
          className="h-auto w-auto"
        />
      </Link>
      <Navbar />
      <Suspense fallback={<Loader2 className="mx-2.5 size-6 animate-spin" />}>
        <NavbarUserSide />
      </Suspense>
    </div>
  );
}

async function NavbarUserSide() {
  const { data, success } = await getProfile();
  if (success && data) {
    redirect(`/region/${data.regionalGroup.id}`);
  }

  return (
    <div className="flex items-center gap-8">
      <Link href="/sign-in">
        <User2 className="size-8" />
      </Link>
    </div>
  );
}
