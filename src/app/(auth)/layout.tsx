import { Card } from '@/components/ui/card';
import { PropsWithChildren } from 'react';

/**
 * SignIn, SignUp 페이지의 레이아웃 컴포넌트입니다.
 */
export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden">
      <Card>{children}</Card>
    </div>
  );
}
