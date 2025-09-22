import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl = new URL('https://evdekorinsaat.com');

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: 'Evdekor İnşaat | Antalya Ev Dekorasyon ve Tadilat Hizmetleri',
    template: '%s | Evdekor İnşaat',
  },
  description:
    'Antalya merkez ilçelerinde mermer, mobilya, montaj ve marangozluk hizmetleri. Hızlı keşif, şeffaf fiyatlandırma ve uzman ekiplerle evinizi yenileyin.',
  keywords: [
    'Antalya mermer',
    'Antalya marangoz',
    'ev dekorasyon',
    'montaj hizmeti',
    'Antalya tadilat',
  ],
  openGraph: {
    title: 'Evdekor İnşaat | Antalya Ev Dekorasyon ve Tadilat Hizmetleri',
    description:
      'Antalya merkez ilçelerinde mermer, marangozluk ve montaj projeleriniz için uçtan uca hizmet. Hızlı keşif, güvenilir ekip, şeffaf fiyat.',
    url: siteUrl,
    siteName: 'Evdekor İnşaat',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evdekor İnşaat',
    description:
      'Antalya merkez ilçelerinde mermer, mobilya, montaj ve marangozluk hizmetleri.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-50 text-neutral-900`}>
        <SiteHeader />
        <main className="mx-auto min-h-[calc(100vh-280px)] w-full max-w-6xl px-4 py-12 lg:px-6">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
