'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { buttonStyles } from '@/components/ui/button-styles';
import { cn } from '@/lib/utils';
import { Logo } from './logo';

const links = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/hizmetler', label: 'Hizmetler' },
  { href: '/iletisim', label: 'İletişim' },
  { href: '/rezervasyon', label: 'Rezervasyon' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-6">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium text-neutral-600 transition hover:text-[#ef6c39]',
                  isActive && 'text-[#ef6c39]',
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden gap-2 lg:flex">
          <Link className={buttonStyles('outline')} href="/iletisim">
            İletişime Geç
          </Link>
          <Link className={buttonStyles()} href="/rezervasyon">
            Rezervasyon Yap
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 lg:hidden"
          aria-label="Menüyü aç"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {open ? (
        <div className="border-t border-neutral-100 bg-white px-4 pb-6 pt-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'text-sm font-medium text-neutral-600 transition hover:text-[#ef6c39]',
                    isActive && 'text-[#ef6c39]'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 grid gap-3">
            <Link className={buttonStyles('outline')} href="/iletisim" onClick={() => setOpen(false)}>
              İletişime Geç
            </Link>
            <Link className={buttonStyles()} href="/rezervasyon" onClick={() => setOpen(false)}>
              Rezervasyon Yap
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
