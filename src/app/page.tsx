import Link from 'next/link';
import Image from 'next/image';
import categories from '@/content/categories.json';
import insights from '@/content/insights.json';
import { buttonStyles } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="space-y-24 pb-24">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <Badge className="bg-white text-[#ef6c39]">Antalya merkez ilçelerinde</Badge>
          <h1 className="section-heading text-balance">
            Ev dekorasyon ve inşaat projelerinizi güvenilir bir ekip ile tamamlayın
          </h1>
          <p className="section-subtitle">
            Mermer uygulamalarından özel üretim mobilyaya, montajdan marangozluğa kadar tüm süreçleri tek elden yönetiyoruz. Google Maps arama içgörülerine göre kurgulanmış içerik ve yönlendirmelerle ihtiyacınıza tam karşılık veriyoruz.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link className={buttonStyles()} href="/rezervasyon">
              Rezervasyon Başlat
            </Link>
            <Link className={buttonStyles('outline')} href="/hizmetler">
              Hizmetleri İncele
            </Link>
          </div>
          <dl className="grid gap-6 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-neutral-400">Yıllık Proje</dt>
              <dd className="text-2xl font-semibold text-neutral-900">120+</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-neutral-400">Memnuniyet</dt>
              <dd className="text-2xl font-semibold text-neutral-900">%96</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-neutral-400">İlk dönüş</dt>
              <dd className="text-2xl font-semibold text-neutral-900">2 saat</dd>
            </div>
          </dl>
        </div>
        <div className="relative flex h-full items-center justify-center">
          <div className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[40px] bg-white shadow-[0_40px_120px_-50px_rgba(15,23,42,0.45)]">
            <Image
              src="/window.svg"
              alt="Usta çalışması"
              fill
              className="object-cover opacity-10"
            />
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-[#ef6c39]">
                  Rezervasyon Adımları
                </p>
                <p className="text-lg font-semibold text-neutral-900">
                  Hizmetinizi seçin, ilçenizi belirtin, keşif için bize ulaşın.
                </p>
              </div>
              <div className="grid gap-3">
                {[
                  'Hizmet ve bölge seçimi',
                  'Alan ölçüsü ve beklenti paylaşımı',
                  'İletişim bilgileri ve KVKK onayı',
                ].map((step) => (
                  <div key={step} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ef6c39]/10 text-sm font-semibold text-[#ef6c39]">
                      ✓
                    </span>
                    <p className="text-sm text-neutral-600">{step}</p>
                  </div>
                ))}
              </div>
              <Link className={buttonStyles()} href="/rezervasyon">
                Akışı Gör
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <div className="flex flex-col gap-4">
          <h2 className="section-heading">Uzmanlaştığımız kategoriler</h2>
          <p className="section-subtitle">
            Saha ekiplerimiz Antalya&apos;nın Muratpaşa, Konyaaltı, Kepez, Döşemealtı, Aksu ve çevre ilçelerinde hızlı keşif ve temiz işçilik prensibiyle çalışır.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((category) => (
            <Card key={category.slug} className="flex h-full flex-col gap-5">
              <div>
                <h3 className="text-xl font-semibold text-neutral-900">{category.title}</h3>
                <p className="mt-2 text-sm text-neutral-500">{category.description}</p>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600">
                {category.highlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-[#ef6c39]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link className="text-sm font-semibold text-[#ef6c39]" href={`/hizmetler#${category.slug}`}>
                Detayları Gör →
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-neutral-100 bg-white/80 p-8 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.45)] backdrop-blur lg:p-12">
        <h2 className="section-heading mb-6">Google Maps içgörülerinden seçtiklerimiz</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {insights.map((item) => (
            <div key={item.keyword} className="rounded-2xl bg-neutral-50 p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">Arama trendi</p>
              <p className="mt-2 text-sm font-semibold text-neutral-900">{item.keyword}</p>
              <p className="mt-4 text-2xl font-bold text-[#ef6c39]">{item.demand}</p>
              <p className="mt-2 text-sm text-neutral-600">{item.insight}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-[32px] bg-[#ef6c39] px-8 py-12 text-white lg:flex lg:items-center lg:justify-between lg:px-12">
        <div className="space-y-4 max-w-xl">
          <h2 className="section-heading text-white">
            Projenizi 2 saat içinde konuşmaya başlayalım
          </h2>
          <p className="text-sm text-white/80">
            Rezervasyon sihirbazını tamamlayın, ihtiyaçlarınızı paylaşın. Proje danışmanımız sizi arayıp keşif planını oluştursun.
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-3 text-sm font-medium lg:mt-0">
          <Link className={buttonStyles(undefined, 'bg-white text-[#ef6c39] hover:bg-neutral-100')} href="/rezervasyon">
            Rezervasyonu Tamamla
          </Link>
          <Link className={buttonStyles('outline', 'border-white text-white hover:bg-white/10')} href="/iletisim">
            Hemen Arayın
          </Link>
        </div>
      </section>
    </div>
  );
}
