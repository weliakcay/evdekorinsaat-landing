import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/forms/contact-form';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Evdekor İnşaat ile iletişim kurun, projeleriniz için hızlı dönüş alın.',
};

const contactDetails = [
  {
    title: 'Telefon',
    value: '+90 850 532 15 25',
    href: 'tel:+908505321525',
  },
  {
    title: 'E-posta',
    value: 'destek@evdekorinsaat.com',
    href: 'mailto:destek@evdekorinsaat.com',
  },
  {
    title: 'Adres',
    value: 'Fener Mah. Lara Cad. No:18 Muratpaşa / Antalya',
  },
];

export default function ContactPage() {
  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr]">
      <section className="space-y-5">
        <h1 className="section-heading">Sizi dinleyerek başlıyoruz</h1>
        <p className="section-subtitle">
          Ekibimiz haftanın her günü 09:00-19:00 arasında hizmet veriyor. Formu doldurun, aynı gün içinde sizi arayıp ihtiyaçlarınızı dinleyelim ve keşif planlayalım.
        </p>
        <Card className="border-none bg-white">
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
            İletişim kanalları
          </h2>
          <ul className="mt-4 space-y-4 text-sm text-neutral-600">
            {contactDetails.map(({ title, value, href }) => (
              <li key={title}>
                <p className="font-semibold text-neutral-900">{title}</p>
                {href ? (
                  <Link href={href} className="transition hover:text-[#d9aa63]">
                    {value}
                  </Link>
                ) : (
                  <p>{value}</p>
                )}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="border-none bg-neutral-50">
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
            Antalya saha günleri
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Muratpaşa ve Konyaaltı randevuları için aynı gün, Kepez ve Döşemealtı için haftada 3 gün ekip yönlendiriyoruz. Aksu ve çevre ilçeler için randevu yoğunluğuna göre planlama yapıyoruz.
          </p>
        </Card>
      </section>
      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-neutral-900">Hızlı iletişim formu</h2>
        <ContactForm />
      </section>
    </div>
  );
}
