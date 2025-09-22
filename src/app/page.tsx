import Link from 'next/link';
import Image from 'next/image';
import { Play } from 'lucide-react';
import categories from '@/content/categories.json';
import { buttonStyles } from '@/components/ui/button-styles';
import { Card } from '@/components/ui/card';

const heroImage =
  'https://images.unsplash.com/photo-1505692763633-eb58e87e51b7?auto=format&fit=crop&w=2000&q=80';
const aboutImage =
  'https://images.unsplash.com/photo-1616627808264-8b6f1771d234?auto=format&fit=crop&w=1400&q=80';
const testimonialImage =
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80';

const whyUsCards = [
  {
    title: 'Hızlı Planlama',
    description:
      'Randevularınızı 48 saat içinde planlıyor, keşif sonrası detaylı iş kalemi paylaşımı yapıyoruz.',
  },
  {
    title: 'Uzman Ekip',
    description:
      'Mermer, marangoz ve montaj ekiplerimiz Antalya ilçelerinde sürekli saha deneyimine sahip.',
  },
  {
    title: 'Özenli Proje Yönetimi',
    description:
      'Süreç boyunca fotoğraf, video ve raporlarla düzenli bilgilendirme sağlıyoruz.',
  },
  {
    title: 'Estetik Tasarım',
    description:
      'İç mimari danışmanlığımızla her mekâna uygun malzeme, renk ve dokunuşlar öneriyoruz.',
  },
];

const partnerLogos = ['TheDoors', 'MyHouse', 'Property', 'HumanShelter'];

export default function HomePage() {
  return (
    <div className="space-y-24 pb-24">
      <section className="relative isolate overflow-hidden rounded-b-[48px] bg-[#111827] text-white">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `linear-gradient(rgba(17,23,39,0.85), rgba(17,23,39,0.85)), url(${heroImage})` }}
        />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-24 pt-16 lg:grid-cols-[1fr_0.8fr] lg:px-6 lg:pt-24">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-[#d9aa63]">Hakkımızda</p>
            <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl">
              İnovatif iç tasarım fikirleri ile yaşam alanlarınızı yeniden yorumluyoruz
            </h1>
            <p className="text-base text-white/75">
              Antalya&apos;nın merkez ilçelerinde mermer uygulamalarından özel mobilyaya kadar uçtan uca proje yönetimi. Güvenilir ekip, şeffaf süreç ve estetik çözümler.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link className={buttonStyles(undefined, 'bg-[#d9aa63] text-[#111827] hover:bg-[#b18343]')} href="/rezervasyon">
                Projenizi Başlatın
              </Link>
              <Link className="flex items-center gap-3 text-sm font-semibold text-white/80 transition hover:text-white" href="/iletisim">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30">
                  <Play className="h-4 w-4" />
                </span>
                Tanıtım Videosu
              </Link>
            </div>
          </div>
          <div className="relative -mt-8 flex flex-col justify-end lg:mt-0">
            <div className="card-shadow relative mx-auto w-full max-w-[420px] overflow-hidden rounded-[32px] bg-white/95 p-8 text-[#111827]">
              <p className="text-xs uppercase tracking-[0.3em] text-[#d9aa63]">Evdekor Sözleri</p>
              <h2 className="mt-4 text-2xl font-semibold">25+ yıl deneyim, 1.250+ tamamlanan proje</h2>
              <p className="mt-3 text-sm text-neutral-600">
                Her projenin farklı hikâyesi var. Keşiften teslimata kadar planlı ilerleyen ekiplerimizle zamandan tasarruf sağlıyoruz.
              </p>
              <div className="mt-6 grid gap-6 text-sm font-semibold text-[#111827] sm:grid-cols-2">
                <div>
                  <p className="text-3xl font-bold text-[#d9aa63]">25+</p>
                  <p>Yıllık Deneyim</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#d9aa63]">1.250+</p>
                  <p>Tamamlanan Proje</p>
                </div>
              </div>
              <Link className={buttonStyles('ghost', 'mt-6 w-full border border-[#111827]/15 bg-white text-sm font-semibold uppercase tracking-[0.2em] text-[#111827]')}
                href="/hizmetler"
              >
                Tüm Hizmetler
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col gap-12 px-4 lg:flex-row lg:px-6">
        <div className="relative flex-1 overflow-hidden rounded-[32px] bg-neutral-100">
          <Image
            src={aboutImage}
            alt="İç mekân uygulaması"
            width={700}
            height={900}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1 space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d9aa63]">Evdekor ile tanışın</p>
          <h2 className="section-heading">Estetik ve fonksiyonu bir araya getiren çözümler</h2>
          <p className="text-neutral-600">
            İç mekân tasarımında teknik disiplin ile görsel uyumu buluşturuyoruz. Her projede iş programı, bütçe kontrolü ve raporlama odağımız var.
          </p>
          <div className="grid gap-4">
            {categories.slice(0, 4).map((category) => (
              <Card key={category.slug} className="flex items-start gap-4 border-none bg-white p-5 shadow-sm">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#d9aa63]" />
                <div>
                  <h3 className="text-base font-semibold text-[#111827]">{category.title}</h3>
                  <p className="mt-1 text-sm text-neutral-500">{category.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:flex-row lg:px-6">
          <div className="flex-1 space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[#d9aa63]">Neden Biz?</p>
            <h2 className="section-heading text-[#111827]">Sizi öncelikleyen çalışma prensipleri</h2>
            <p className="section-subtitle">
              Google Maps arama verilerini analiz ederek müşterilerin hız, güven ve maliyet beklentilerine yanıt verecek süreçler geliştirdik.
            </p>
            <Link className={buttonStyles(undefined, 'mt-4 bg-[#d9aa63] text-[#111827] hover:bg-[#b18343]')} href="/rezervasyon">
              Tüm Süreci İnceleyin
            </Link>
          </div>
          <div className="flex-1">
            <div className="grid gap-5 sm:grid-cols-2">
              {whyUsCards.map((card) => (
                <Card key={card.title} className="h-full border-none bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#111827]">{card.title}</h3>
                  <p className="mt-2 text-sm text-neutral-500">{card.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 text-sm uppercase tracking-[0.3em] text-neutral-400 lg:px-6">
          {partnerLogos.map((logo) => (
            <span key={logo} className="flex-1 min-w-[120px] text-center text-neutral-400">
              {logo}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:px-6">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d9aa63]">Ödüllü tasarım</p>
          <h2 className="section-heading">İç mekân projelerinde ödüllü yaklaşım</h2>
          <p className="text-neutral-600">
            Detaylı keşif, güçlü tedarik zinciri ve koordineli ekip yönetimi ile tüm iş kalemlerini tek çatı altında topluyoruz. Müşterilerimiz için akışta kaybolmadan her aşamayı açıkça takip edilebilir kılıyoruz.
          </p>
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-neutral-500">
              “Evdekor ile çalıştığımız projelerde süreç şeffaf ve profesyonel ilerliyor. Zamanında teslim edilen işler ve detaylı raporlarla güven veriyorlar.”
            </p>
            <p className="mt-4 text-sm font-semibold text-[#111827]">Mark M. — Proje Sahibi</p>
          </div>
          <div className="flex gap-4">
            <Link className={buttonStyles(undefined, 'bg-[#d9aa63] text-[#111827] hover:bg-[#b18343]')} href="/rezervasyon">
              Projenizi Planlayın
            </Link>
            <Link className={buttonStyles('outline', 'border-[#111827] text-[#111827] hover:bg-[#111827] hover:text-white')} href="/iletisim">
              Teklif Talep Et
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[32px] bg-neutral-100">
          <Image
            src={testimonialImage}
            alt="Modern iç tasarım"
            width={720}
            height={900}
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="rounded-[32px] bg-[#111827] px-6 py-12 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 text-left lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-[#d9aa63]">Birlikte çalışalım</p>
            <h2 className="text-3xl font-semibold">Yeni projenize başlamak için hazır mısınız?</h2>
            <p className="max-w-xl text-sm text-white/70">
              İhtiyaçlarınızı paylaşın, 2 saat içinde proje danışmanımız sizinle iletişime geçsin. Keşif ve teklif sürecini başlatalım.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link className={buttonStyles(undefined, 'bg-[#d9aa63] text-[#111827] hover:bg-[#b18343]')} href="/rezervasyon">
              Rezervasyon Oluştur
            </Link>
            <Link className={buttonStyles('outline', 'border-white text-white hover:bg-white/10')} href="/iletisim">
              Hemen İletişime Geç
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
