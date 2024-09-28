import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

/**
 * SignIn, SignUp 페이지의 레이아웃 컴포넌트입니다.
 */
export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden">
      <Card className="w-full max-lg:mx-6 lg:w-[35%] lg:min-w-[520px]">
        <div className="relative flex w-full flex-col items-center gap-10">
          <Image
            src="/logo.png"
            alt="logo"
            width={200}
            height={40}
            className="h-auto w-[140px] lg:w-[200px]"
          />
          {children}
        </div>
      </Card>
    </div>
  );
}
