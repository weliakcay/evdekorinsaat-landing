import type { Metadata } from 'next';
import Link from 'next/link';
import categories from '@/content/categories.json';
import { Card } from '@/components/ui/card';
import { buttonStyles } from '@/components/ui/button-styles';

export const metadata: Metadata = {
  title: 'Hizmetler',
  description:
    'Mermer, özel mobilya, montaj ve marangozluk hizmetlerimizle Antalya merkez ilçelerinde uçtan uca çözüm sunuyoruz.',
};

const processes: Record<string, string[]> = {
  mermer: [
    'İlk keşif ve numune paylaşımı',
    '3 boyutlu yerleşim ve kesim planı',
    'Montaj öncesi yüzey hazırlığı',
    'Teslim sonrası bakım eğitimi',
  ],
  mobilya: [
    'İhtiyaç analizi ve stil seçimi',
    '3D tasarım onayı',
    'Atölye üretimi ve kalite kontrol',
    'Yerinde montaj ve ince ayar',
  ],
  montaj: [
    'Proje paylaşımı ve randevu planlama',
    'Malzeme ve ekip kontrolü',
    'Temiz ve hızlı montaj uygulaması',
    'Son testler ve teslim raporu',
  ],
  marangoz: [
    'Sorun tespiti ve ölçülendirme',
    'Tamir/yenileme için malzeme seçimi',
    'Ustalarımızla uygulama',
    'Bakım önerileri ve garanti belgesi',
  ],
};

export default function ServicesPage() {
  return (
    <div className="space-y-20 pb-20">
      <section className="space-y-4">
        <h1 className="section-heading">Antalya için özelleştirilmiş hizmet paketleri</h1>
        <p className="section-subtitle">
          Google Maps aramalarında en çok talep edilen hizmetler üzerinden şekillenen paketlerimiz, ilçelerin ihtiyaçlarına göre yeniden düzenlenmiştir.
        </p>
      </section>

      <div className="space-y-12">
        {categories.map((category) => (
          <article id={category.slug} key={category.slug} className="scroll-mt-24 space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-neutral-900">{category.title}</h2>
                <p className="mt-2 text-sm text-neutral-600">{category.description}</p>
              </div>
              <Link href="/rezervasyon" className={buttonStyles('outline')}>
                Keşif Planla
              </Link>
            </div>
            <Card className="grid gap-6 border-none bg-neutral-50 p-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
                  Öne çıkan talepler
                </h3>
                <ul className="space-y-3 text-sm text-neutral-600">
                  {category.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span aria-hidden className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#d9aa63]" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
                  İş akışımız
                </h3>
                <ol className="space-y-3 text-sm text-neutral-600">
                  {processes[category.slug]?.map((step, index) => (
                    <li key={step} className="flex gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-semibold text-[#d9aa63]">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </Card>
          </article>
        ))}
      </div>

      <section className="rounded-3xl border border-neutral-100 bg-white/80 p-10 shadow-[0_35px_120px_-70px_rgba(15,23,42,0.6)]">
        <h2 className="section-heading text-neutral-900">İlçelere göre hizmet planı</h2>
        <p className="mt-4 text-sm text-neutral-600">
          Muratpaşa ve Konyaaltı&apos;nda hızlı montaj ekipleri, Kepez ve Döşemealtı&apos;nda geniş ölçekli tadilat ekibimizle hizmet veriyoruz. Aksu ve çevre ilçeler için saha günlerimizi haftalık planlıyoruz.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          {[
            'İlçe bazlı keşif programı',
            'Şeffaf iş kalemi fiyatlandırması',
            'Sözleşme ve KVKK uyumlu süreç yönetimi',
          ].map((item) => (
            <span
              key={item}
              className="rounded-full bg-neutral-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500"
            >
              {item}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
