import type { Metadata } from 'next';
import { ReservationWizard } from '@/components/forms/reservation-wizard';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Rezervasyon',
  description:
    'Evdekor İnşaat rezervasyon sihirbazı ile hizmet ve bölge bilgilerinizi paylaşın, keşif için hızlı dönüş alın.',
};

const highlights = [
  'Formu tamamlayın, 2 saat içinde sizi arayalım',
  'Verileriniz KVKK uyumludur ve üçüncü kişilerle paylaşılmaz',
  'Keşif randevusu için uygun tarih ve saati seçebilirsiniz',
];

export default function ReservationPage() {
  return (
    <div className="space-y-10 pb-20">
      <section className="space-y-4">
        <h1 className="section-heading">Rezervasyon sihirbazını başlatın</h1>
        <p className="section-subtitle">
          İhtiyacınıza göre adım adım ilerleyin. Hizmet alanını, beklentilerinizi ve iletişim bilgilerinizi paylaştığınızda keşif randevunuzu birlikte planlayacağız.
        </p>
      </section>
      <Card className="border-none bg-neutral-50 p-6">
        <ul className="grid gap-3 text-sm text-neutral-600 sm:grid-cols-3">
          {highlights.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-[#ef6c39]" />
              {item}
            </li>
          ))}
        </ul>
      </Card>
      <ReservationWizard />
    </div>
  );
}
