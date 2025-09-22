# Evdekor İnşaat Landing

Antalya merkez ilçelerinde ev dekorasyon ve inşaat hizmetleri sunan Evdekor İnşaat için hazırlanan landing + mini site. Proje, rehberli rezervasyon sihirbazı ile kullanıcıdan detaylı talep toplayan ve Google Maps arama içgörülerini içerikte kullanan bir yapı sunar.

## Özellikler
- Next.js 15 (App Router) & TypeScript
- Tailwind CSS 4 + hafif shadcn/ui tarzı bileşen seti
- Rezervasyon sihirbazı: RHF + Zod doğrulama + localStorage kalıcılığı
- İçerik JSON kaynakları: kategoriler, ilçeler, SSS ve içgörü kartları
- `/api/rezervasyon` mock endpoint (gelen verileri `console.log`)
- SEO metadata & yüksek Lighthouse hedefi için optimize edilmiş görsel/CTA düzeni

## Kurulum
1. Gerekli bağımlılıkları yükleyin:
   ```bash
   pnpm install
   ```
2. Geliştirme sunucusunu başlatın:
   ```bash
   pnpm dev
   ```
3. Uygulamayı `http://localhost:3000` adresinde görüntüleyin.

## Çevresel Değerler
Varsayılan olarak herhangi bir zorunlu `.env` değişkeni yoktur. Yine de dağıtımda kullanılmak üzere bir örnek dosya yer alır:

```bash
cp .env.example .env.local
```

`NEXT_PUBLIC_SITE_URL` değerini canlı URL ile güncelleyebilirsiniz.

## Komutlar
- `pnpm dev` – geliştirme sunucusu (hot reload)
- `pnpm build` – üretim derlemesi
- `pnpm start` – üretim derlemesini çalıştırır
- `pnpm lint` – ESLint kontrolleri
- `pnpm format` – Prettier ile kod formatlama

## Klasör Yapısı
```
content/                 → JSON içerik kaynakları
src/app/                 → App Router sayfaları ve API route
src/app/(sayfalar)       → `/`, `/hizmetler`, `/iletisim`, `/rezervasyon`
src/app/api/rezervasyon/ → POST endpoint (mock)
src/components/          → UI, layout ve form bileşenleri
docs/                    → Proje promptu ve dokümantasyon notları
```

## Dağıtım Notları
- `.gitignore`, `node_modules`, `.next` gibi gereksiz dosyaları hariç tutar.
- Vercel deploy süreci için ekstra yapılandırma gerekmez; `pnpm install` ve `pnpm build` yeterlidir.
- Logo ve görsel varlıklar `public/` altında tutulur. Yeni logoyu aynı isimle güncellerseniz otomatik olarak yansır.

## Sonraki Adımlar
- İçerik metinlerini SEO anahtar kelimelerine göre revize edin.
- Gerçek CRM / mail entegrasyonu için `/api/rezervasyon` endpointini güncelleyin.
- KVKK metni ve detaylı sözleşme dosyalarını sayfalara ekleyin.
