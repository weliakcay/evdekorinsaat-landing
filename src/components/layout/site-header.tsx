'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MapPin, Phone, Clock } from 'lucide-react';
import { useState } from 'react';
import { buttonStyles } from '@/components/ui/button-styles';
import { cn } from '@/lib/utils';
import { Logo } from './logo';

const navLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/hizmetler', label: 'Hizmetler' },
  { href: '/rezervasyon', label: 'Projeye Başla' },
  { href: '/iletisim', label: 'İletişim' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50">
      <div className="hidden w-full bg-[#0f172a] text-xs text-white lg:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-2" role="presentation">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-[#d9aa63]" />
              <span>Fener Mah. Lara Cad. No:18 Muratpaşa / Antalya</span>
            </span>
            <a href="tel:+905324857257" className="flex items-center gap-2 hover:text-[#d9aa63]">
              <Phone className="h-3.5 w-3.5 text-[#d9aa63]" />
              <span>+90 532 485 72 57</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-[#d9aa63]" />
            <span>Pzt - Cuma 08:00 - 19:00</span>
          </div>
        </div>
      </div>
      <div className="bg-[#111827]/95 text-white shadow-lg backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-6">
          <Logo theme="dark" />
          <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.2em] lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'transition-colors text-white/80 hover:text-white',
                    isActive && 'text-[#d9aa63]'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden lg:flex">
            <Link className={buttonStyles('outline', 'border-white text-white hover:bg-white/10')} href="/rezervasyon">
              Proje Talebi Oluştur
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
            aria-label="Menüyü aç"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open ? (
          <div className="border-t border-white/10 px-4 pb-6 pt-4 lg:hidden">
            <nav className="grid gap-4 text-sm uppercase tracking-[0.2em] text-white/80">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn('transition hover:text-white', isActive && 'text-[#d9aa63]')}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <Link
              className={buttonStyles('outline', 'mt-4 w-full border-white text-white hover:bg-white/10')}
              href="/rezervasyon"
              onClick={() => setOpen(false)}
            >
              Proje Talebi Oluştur
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
