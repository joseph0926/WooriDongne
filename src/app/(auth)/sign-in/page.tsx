import { SignInForm } from '@/components/auth/sign-in-form';
import Image from 'next/image';

export default function SignInPage() {
  return (
    <div className="relative flex w-full flex-col items-center gap-10">
      <Image src="/logo.png" alt="logo" width={200} height={40} />
      <SignInForm />
    </div>
  );
}
