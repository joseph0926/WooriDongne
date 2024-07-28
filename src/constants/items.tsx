import { Home, Newspaper, School, User2 } from 'lucide-react';

export const navItems = [
  {
    href: '/',
    label: 'Blog',
    icon: <Home className="size-8" />,
  },
  {
    href: '/project',
    label: 'Project',
    icon: <School className="size-8" />,
  },
  {
    href: '/about',
    label: 'About',
    icon: <User2 className="size-8" />,
  },
  {
    href: '/newsletter',
    label: 'Newsletter',
    icon: <Newspaper className="size-8" />,
  },
];
