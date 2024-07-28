import { navItems } from '@/constants/items';
import Link from 'next/link';
import { MobileNavbar } from './mobile-navbar';
import { ThemeToggle } from './ui/theme-toggle';

export function Navbar() {
  return (
    <>
      <nav className="lg:flex-bet hidden h-[3.75rem] w-full">
        <h1 className="hidden text-2xl font-bold uppercase text-primary lg:block">Joseph0926</h1>
        <div className="flex items-center gap-5">
          <ul className="hidden items-center gap-4 lg:flex">
            {navItems.map((item) => (
              <li key={item.href} className="text-xl font-medium capitalize">
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <ThemeToggle className="hidden lg:flex" />
        </div>
      </nav>
      <MobileNavbar />
    </>
  );
}
