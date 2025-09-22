import Link from 'next/link';
import { Facebook, Instagram, Phone } from 'lucide-react';
import { Logo } from './logo';

const nav = [
  { label: 'Hizmetler', href: '/hizmetler' },
  { label: 'Rezervasyon', href: '/rezervasyon' },
  { label: 'İletişim', href: '/iletisim' },
];

const socials = [
  { label: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { label: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { label: 'Ara', href: 'tel:+908505321525', icon: Phone },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <div className="max-w-sm space-y-4">
          <Logo />
          <p className="text-sm text-neutral-500">
            Antalya&apos;nın her ilçesinde mermer, marangozluk ve montaj projelerinizi uçtan uca yönetiyoruz. Güvenilir ekip, hızlı dönüş ve şeffaf fiyatlandırma.
          </p>
        </div>
        <nav className="flex flex-col gap-2 text-sm text-neutral-500">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[#ef6c39]">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Sosyal</p>
          <div className="flex gap-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition hover:border-[#ef6c39] hover:text-[#ef6c39]"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-100 bg-neutral-50 py-4">
        <p className="mx-auto max-w-6xl px-4 text-xs text-neutral-400 lg:px-6">
          © {new Date().getFullYear()} Evdekor İnşaat. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
