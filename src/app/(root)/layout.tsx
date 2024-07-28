import { Navbar } from '@/components/navbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-7 pl-[8rem] pr-[3rem] lg:px-[6rem]">
      <Navbar />
      {children}
    </div>
  );
}
