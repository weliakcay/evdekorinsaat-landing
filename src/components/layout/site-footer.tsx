import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Phone, Mail } from 'lucide-react';
import { Logo } from './logo';

const footerNav = {
  other: [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Hizmetler', href: '/hizmetler' },
    { label: 'Rezervasyon', href: '/rezervasyon' },
    { label: 'İletişim', href: '/iletisim' },
  ],
  quick: [
    { label: 'KVKK & Gizlilik', href: '/iletisim' },
    { label: 'Sözleşme', href: '/iletisim' },
    { label: 'Sık Sorulan Sorular', href: '/hizmetler' },
    { label: 'Referanslar', href: '/hizmetler' },
  ],
};

const latestProjects = [
  { label: 'Modern Salon Tasarımı' },
  { label: 'Mutfak Detay Çalışması' },
  { label: 'Ofis İç Mekan' },
  { label: 'Mermer Banyo Çözümü' },
];

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/evdekorinsaat/', icon: Instagram },
  { label: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-neutral-200">
      <div className="bg-[#0f172a] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-12 lg:px-6">
          <div className="space-y-5 lg:col-span-4">
            <Logo theme="dark" />
            <p className="text-sm text-white/70">
              Antalya merkez ilçelerinde mermer, marangozluk ve komple iç mekân tadilat projelerini anahtar teslim yönetiyoruz. Her detayda şeffaf süreç ve uzman ekip.
            </p>
            <div className="space-y-2 text-sm text-white/70">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#d9aa63]" /> +90 532 485 72 57
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#d9aa63]" /> destek@evdekorinsaat.com
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-[#d9aa63] hover:text-[#d9aa63]"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
          <div className="grid gap-10 text-sm text-white/70 lg:col-span-8 lg:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Diğer Sayfalar</h3>
              <ul className="mt-4 space-y-2">
                {footerNav.other.map((item) => (
                  <li key={item.label}>
                    <Link className="transition hover:text-[#d9aa63]" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Hızlı Erişim</h3>
              <ul className="mt-4 space-y-2">
                {footerNav.quick.map((item) => (
                  <li key={item.label}>
                    <Link className="transition hover:text-[#d9aa63]" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Güncel Projeler</h3>
              <ul className="mt-4 space-y-2">
                {latestProjects.map((item) => (
                  <li key={item.label} className="flex items-start gap-2 text-white/70">
                    <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-[#d9aa63]" />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#0b1220] py-5">
        <p className="mx-auto max-w-6xl px-4 text-xs uppercase tracking-[0.3em] text-white/40 lg:px-6">
          © {new Date().getFullYear()} Evdekor İnşaat. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
