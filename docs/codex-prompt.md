# Codex GPT-5 Prompt Taslağı — Evdekorinsaat Landing

## Projenin Amacı
- Antalya merkez ilçelerinde ev dekorasyon ve inşaat hizmetlerini tanıtacak landing + mini site.
- Kullanıcıyı yönlendiren çok adımlı rezervasyon sihirbazı ile hizmet talebi toplama.
- Google Maps aramalarından elde edilen müşteri davranış verilerini içerik stratejisine entegre etme.

## Teknik Hedefler ve Araçlar
- `pnpm create next-app@latest` ile App Router + TypeScript kurulum.
- Aut yapı: Next.js (App Router, TypeScript), Tailwind CSS, shadcn/ui.
- Kod kalitesi: ESLint, Prettier, strict `tsconfig`.
- Paket yöneticisi olarak `pnpm`.

## Sayfa ve Route Yapısı
- `/` ana sayfa: hero, kategoriler, referans şeridi, güçlü CTA.
- `/hizmetler`: mermer, mobilya, montaj, marangoz kategorileri.
- `/iletisim`: iletişim formu (ad-soyad, telefon, e-posta, mesaj).
- `/rezervasyon`: çok adımlı rezervasyon sihirbazı.
- `/api/rezervasyon`: POST isteği (mock, `console.log`).

## Rezervasyon Akışı Adımları
1. Hizmet Seçimi: mermer, mobilya, montaj, marangoz.
2. Bölge Seçimi: Muratpaşa, Konyaaltı, Kepez, Döşemealtı, Aksu, Diğer.
3. Alan Bilgisi: metrekare, oda/alan sayısı.
4. Detaylar: iş tanımı (min 20 karakter, hız/güven/uygun fiyat beklentilerini toplar).
5. Medya (opsiyonel): görsel yükleme + client-side önizleme.
6. Zamanlama: tarih veya seçenek.
7. İletişim: ad-soyad, telefon, e-posta.
8. Özet & Onay: KVKK onayı, göndermeye hazır özet.

- Form yönetimi: React Hook Form + Zod doğrulama.
- Adımlar arası veri saklama: localStorage.

## İçerik Kaynakları (JSON)
- `content/categories.json`: hizmet kategorileri.
- `content/districts.json`: Antalya ilçeleri.
- `content/faq.json`: sık sorulan sorular.
- `content/insights.json`: Google Maps arama içgörüleri (hız, güven, uygun fiyat vb.).

## SEO, Performans ve A11y
- Next.js metadata API ile SEO ayarları, gerekirse OG görsel.
- Lighthouse performans ve erişilebilirlik hedefi yüksek.

## Çalıştırma ve Teslim Beklentileri
- Komutlar: `pnpm install`, `pnpm dev`.
- Route ve bileşenlerin eksiksiz olması gerekir.
- JSON içerikleri örnek verilerle doldurulmalı.
- `README` içeriği: kurulum, geliştirme adımları, `.env` placeholder, klasör yapısı, komutlar.
