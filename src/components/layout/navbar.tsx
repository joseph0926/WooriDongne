'use client';

import { useState } from 'react';
import { MenuItem, HoveredLink, ProductItem, Menu } from '@/components/ui/navbar-menu';

export function Navbar() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <Menu setActive={setActive}>
      <MenuItem setActive={setActive} active={active} item="Services">
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="#intro">동네생활이란?</HoveredLink>
          <HoveredLink href="#function">이런 기능이 있어요</HoveredLink>
          <HoveredLink href="#how">이렇게 개발되었어요</HoveredLink>
        </div>
      </MenuItem>
      <MenuItem setActive={setActive} active={active} item="Products">
        <div className="grid grid-cols-2 gap-10 p-4 text-sm">
          <ProductItem
            title="Algochurn"
            href="https://algochurn.com"
            src="https://assets.aceternity.com/demos/algochurn.webp"
            description="Prepare for tech interviews like never before."
          />
          <ProductItem
            title="Tailwind Master Kit"
            href="https://tailwindmasterkit.com"
            src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
            description="Production ready Tailwind css components for your next project"
          />
          <ProductItem
            title="Moonbeam"
            href="https://gomoonbeam.com"
            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
            description="Never write from scratch again. Go from idea to blog in minutes."
          />
          <ProductItem
            title="Rogue"
            href="https://userogue.com"
            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
            description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
          />
        </div>
      </MenuItem>
      <MenuItem setActive={setActive} active={active} item="About">
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/contact">문의하기</HoveredLink>
          <HoveredLink target="_blank" href="https://github.com/joseph0926/WooriDongne">
            기여하기
          </HoveredLink>
        </div>
      </MenuItem>
    </Menu>
  );
}
