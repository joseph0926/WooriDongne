import Image from 'next/image';

export default function SignInPage() {
  return (
    <div className="relative flex flex-col gap-10">
      <Image src="/logo.png" alt="logo" width={200} height={40} />
    </div>
  );
}
