'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import categories from '@/content/categories.json';
import districts from '@/content/districts.json';
import { buttonStyles } from '@/components/ui/button-styles';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const expectationOptions = [
  { value: 'speed', label: 'Hızlı dönüş' },
  { value: 'trust', label: 'Güvenilir ekip' },
  { value: 'price', label: 'Uygun fiyat' },
  { value: 'clean', label: 'Temiz çalışma' },
];

const scheduleOptions = [
  { value: 'haftaici-sabah', label: 'Hafta içi sabah (09:00-12:00)' },
  { value: 'haftaici-aksam', label: 'Hafta içi akşam (17:00-20:00)' },
  { value: 'haftasonu', label: 'Hafta sonu (10:00-18:00)' },
];

const reservationSchema = z.object({
  service: z.string().min(1, 'Lütfen hizmet seçin'),
  district: z.string().min(1, 'Lütfen bölge seçin'),
  areaSize: z
    .string()
    .min(1, 'Metrekare bilgisini girin')
    .refine((value) => Number(value) >= 5, 'Metrekare bilgisi minimum 5 olmalıdır'),
  roomCount: z
    .string()
    .min(1, 'Oda/alan sayısını girin')
    .refine((value) => Number(value) >= 1, 'Alan sayısı en az 1 olmalıdır'),
  description: z.string().min(20, 'En az 20 karakter ile beklentilerinizi yazın'),
  expectations: z.array(z.string()).min(1, 'En az bir beklenti seçin'),
  media: z.any().optional(),
  scheduleDate: z.string().min(1, 'Tarih seçin'),
  scheduleSlot: z.string().min(1, 'Zaman dilimi seçin'),
  fullName: z.string().min(3, 'Lütfen adınızı ve soyadınızı yazın'),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\s()-]{10,}$/i, 'Geçerli bir telefon numarası girin'),
  email: z.string().email('Geçerli bir e-posta girin'),
  kvkk: z.boolean().refine((value) => value, 'KVKK onayını işaretleyin'),
});

export type ReservationFormValues = z.infer<typeof reservationSchema>;

const steps = [
  { id: 'service', title: 'Hizmet Seçimi', fields: ['service'] as const },
  { id: 'district', title: 'Bölge Seçimi', fields: ['district'] as const },
  {
    id: 'space',
    title: 'Alan Bilgisi',
    fields: ['areaSize', 'roomCount'] as const,
  },
  {
    id: 'details',
    title: 'Detaylar',
    fields: ['description', 'expectations'] as const,
  },
  { id: 'media', title: 'Medya', fields: [] as const },
  {
    id: 'schedule',
    title: 'Zamanlama',
    fields: ['scheduleDate', 'scheduleSlot'] as const,
  },
  {
    id: 'contact',
    title: 'İletişim',
    fields: ['fullName', 'phone', 'email'] as const,
  },
  { id: 'summary', title: 'Özet & Onay', fields: ['kvkk'] as const },
] as const;

const storageKey = 'evdekor-reservation-data';

type PersistedReservationData = Omit<ReservationFormValues, 'media'>;

function getInitialData(): PersistedReservationData {
  if (typeof window === 'undefined')
    return {
      service: '',
      district: '',
      areaSize: '',
      roomCount: '',
      description: '',
      expectations: [],
      scheduleDate: '',
      scheduleSlot: '',
      fullName: '',
      phone: '',
      email: '',
      kvkk: false,
    };

  const stored = window.localStorage.getItem(storageKey);
  if (!stored) {
    return {
      service: '',
      district: '',
      areaSize: '',
      roomCount: '',
      description: '',
      expectations: [],
      scheduleDate: '',
      scheduleSlot: '',
      fullName: '',
      phone: '',
      email: '',
      kvkk: false,
    };
  }

  try {
    const parsed = JSON.parse(stored) as PersistedReservationData;
    return {
      ...parsed,
      expectations: parsed.expectations ?? [],
    };
  } catch (error) {
    console.warn('Rezervasyon verisi okunamadı', error);
    return {
      service: '',
      district: '',
      areaSize: '',
      roomCount: '',
      description: '',
      expectations: [],
      scheduleDate: '',
      scheduleSlot: '',
      fullName: '',
      phone: '',
      email: '',
      kvkk: false,
    };
  }
}

export function ReservationWizard() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle');
  const [previews, setPreviews] = useState<string[]>([]);

  const defaultValues = useMemo(() => getInitialData(), []);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    watch,
    formState: { errors },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      ...defaultValues,
      media: undefined,
    },
  });

  useEffect(() => {
    const subscription = watch((value) => {
      const { media, ...rest } = value as ReservationFormValues;
      void media;
      window.localStorage.setItem(storageKey, JSON.stringify(rest));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setPreviews([]);
  }, []);

  const goNext = async () => {
    const step = steps[currentStepIndex];
    if (step.fields.length) {
      const fieldNames = [...step.fields] as Array<keyof ReservationFormValues>;
      const valid = await trigger(fieldNames);
      if (!valid) return;
    }
    setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const goBack = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);
    setSubmitState('idle');
    try {
      const formData: PersistedReservationData = {
        service: values.service,
        district: values.district,
        areaSize: values.areaSize,
        roomCount: values.roomCount,
        description: values.description,
        expectations: values.expectations,
        scheduleDate: values.scheduleDate,
        scheduleSlot: values.scheduleSlot,
        fullName: values.fullName,
        phone: values.phone,
        email: values.email,
        kvkk: values.kvkk,
      };

      await fetch('/api/rezervasyon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, mediaCount: previews.length }),
      });

      window.localStorage.removeItem(storageKey);
      const cleared: PersistedReservationData = {
        service: '',
        district: '',
        areaSize: '',
        roomCount: '',
        description: '',
        expectations: [],
        scheduleDate: '',
        scheduleSlot: '',
        fullName: '',
        phone: '',
        email: '',
        kvkk: false,
      };
      reset({ ...cleared, media: undefined });
      setPreviews([]);
      setSubmitState('success');
      setCurrentStepIndex(0);
    } catch (error) {
      console.error('Rezervasyon gönderimi başarısız', error);
      setSubmitState('error');
    } finally {
      setIsSubmitting(false);
    }
  });

  const currentStep = steps[currentStepIndex];

  return (
    <Card className="border-none bg-white p-6 shadow-[0_30px_100px_-60px_rgba(15,23,42,0.55)]">
      <div className="flex flex-wrap items-center gap-3">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;
          return (
            <div key={step.id} className="flex items-center gap-2 text-sm">
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold',
                  isActive && 'border-[#ef6c39] bg-[#ef6c39] text-white',
                  isCompleted && 'border-[#ef6c39]/40 bg-[#ef6c39]/10 text-[#ef6c39]',
                  !isActive && !isCompleted && 'border-neutral-200 text-neutral-400',
                )}
              >
                {index + 1}
              </span>
              <span className={cn('hidden text-xs uppercase tracking-[0.25em] text-neutral-400 sm:block', isActive && 'text-[#ef6c39]')}>
                {step.title}
              </span>
              {index !== steps.length - 1 ? <span className="hidden h-px w-10 bg-neutral-200 sm:block" /> : null}
            </div>
          );
        })}
      </div>

      <form className="mt-8 space-y-8" onSubmit={onSubmit}>
        {currentStep.id === 'service' && (
          <div className="grid gap-4">
            <label className="text-sm font-semibold text-neutral-800" htmlFor="service">
              Hangi hizmeti talep ediyorsunuz?
            </label>
            <Select id="service" defaultValue={defaultValues.service} {...register('service')}>
              <option value="" disabled>
                Hizmet seçin
              </option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.title}
                </option>
              ))}
            </Select>
            {errors.service ? <p className="text-sm text-red-500">{errors.service.message}</p> : null}
          </div>
        )}

        {currentStep.id === 'district' && (
          <div className="grid gap-4">
            <label className="text-sm font-semibold text-neutral-800" htmlFor="district">
              Hangi bölgede hizmet almak istiyorsunuz?
            </label>
            <Select id="district" defaultValue={defaultValues.district} {...register('district')}>
              <option value="" disabled>
                İlçe seçin
              </option>
              {districts.map((district) => (
                <option key={district.value} value={district.value}>
                  {district.label}
                </option>
              ))}
            </Select>
            {errors.district ? <p className="text-sm text-red-500">{errors.district.message}</p> : null}
          </div>
        )}

        {currentStep.id === 'space' && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="areaSize" className="text-sm font-medium text-neutral-700">
                Alan büyüklüğü (m²)
              </label>
              <Input id="areaSize" type="number" placeholder="Örn. 120" {...register('areaSize')} />
              {errors.areaSize ? <p className="text-sm text-red-500">{errors.areaSize.message}</p> : null}
            </div>
            <div className="grid gap-2">
              <label htmlFor="roomCount" className="text-sm font-medium text-neutral-700">
                Oda / alan sayısı
              </label>
              <Input id="roomCount" type="number" placeholder="Örn. 4" {...register('roomCount')} />
              {errors.roomCount ? <p className="text-sm text-red-500">{errors.roomCount.message}</p> : null}
            </div>
          </div>
        )}

        {currentStep.id === 'details' && (
          <div className="grid gap-6">
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium text-neutral-700">
                Projeyi detaylandırın
              </label>
              <Textarea
                id="description"
                placeholder="İş tanımınızı, beklentilerinizi ve önceliklerinizi yazın. Hızlı dönüş, güven, uygun fiyat gibi beklentileri eklemeyi unutmayın."
                {...register('description')}
              />
              {errors.description ? <p className="text-sm text-red-500">{errors.description.message}</p> : null}
            </div>
            <div className="grid gap-3">
              <p className="text-sm font-medium text-neutral-700">Beklentileriniz</p>
              <div className="grid gap-3 md:grid-cols-2">
                {expectationOptions.map((option) => {
                  const values = watch('expectations') ?? [];
                  const checked = values.includes(option.value);
                  return (
                    <label key={option.value} className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 transition hover:border-[#ef6c39]/60">
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={checked}
                        onChange={(event) => {
                          const next = new Set(values);
                          if (event.target.checked) {
                            next.add(option.value);
                          } else {
                            next.delete(option.value);
                          }
                          setValue('expectations', Array.from(next), { shouldDirty: true });
                        }}
                        className="h-5 w-5 rounded border-neutral-300 text-[#ef6c39] focus:ring-[#ef6c39]"
                      />
                      <span className="text-sm text-neutral-600">{option.label}</span>
                    </label>
                  );
                })}
              </div>
              {errors.expectations ? (
                <p className="text-sm text-red-500">{errors.expectations.message}</p>
              ) : null}
            </div>
          </div>
        )}

        {currentStep.id === 'media' && (
          <div className="grid gap-4">
            <label htmlFor="media" className="text-sm font-medium text-neutral-700">
              Projeye ait görseller (opsiyonel)
            </label>
            <Input
              id="media"
              type="file"
              multiple
              accept="image/*"
              onChange={(event) => {
                const files = event.target.files;
                if (!files) return;
                setValue('media', files, { shouldDirty: true });
                const urls = Array.from(files).map((file) => URL.createObjectURL(file));
                setPreviews(urls);
              }}
            />
            <p className="text-xs text-neutral-500">Görseller sadece ön inceleme içindir ve kaydedilmez.</p>
            {previews.length ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {previews.map((src) => (
                  <div key={src} className="relative aspect-square overflow-hidden rounded-xl border border-neutral-200">
                    <Image src={src} alt="Yüklenen görsel" fill className="object-cover" unoptimized />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}

        {currentStep.id === 'schedule' && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="scheduleDate" className="text-sm font-medium text-neutral-700">
                Tercih ettiğiniz tarih
              </label>
              <Input id="scheduleDate" type="date" {...register('scheduleDate')} />
              {errors.scheduleDate ? <p className="text-sm text-red-500">{errors.scheduleDate.message}</p> : null}
            </div>
            <div className="grid gap-2">
              <label htmlFor="scheduleSlot" className="text-sm font-medium text-neutral-700">
                Uygun zaman dilimi
              </label>
              <Select id="scheduleSlot" defaultValue={defaultValues.scheduleSlot} {...register('scheduleSlot')}>
                <option value="" disabled>
                  Zaman dilimi seçin
                </option>
                {scheduleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              {errors.scheduleSlot ? <p className="text-sm text-red-500">{errors.scheduleSlot.message}</p> : null}
            </div>
          </div>
        )}

        {currentStep.id === 'contact' && (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="fullName" className="text-sm font-medium text-neutral-700">
                Ad Soyad
              </label>
              <Input id="fullName" placeholder="Adınız ve soyadınız" {...register('fullName')} />
              {errors.fullName ? <p className="text-sm text-red-500">{errors.fullName.message}</p> : null}
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm font-medium text-neutral-700">
                Telefon
              </label>
              <Input id="phone" placeholder="05XX XXX XX XX" {...register('phone')} />
              {errors.phone ? <p className="text-sm text-red-500">{errors.phone.message}</p> : null}
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium text-neutral-700">
                E-posta
              </label>
              <Input id="email" placeholder="ornek@eposta.com" type="email" {...register('email')} />
              {errors.email ? <p className="text-sm text-red-500">{errors.email.message}</p> : null}
            </div>
          </div>
        )}

        {currentStep.id === 'summary' && (
          <div className="space-y-6">
            <div className="grid gap-3 rounded-2xl bg-neutral-50 p-6 text-sm text-neutral-600">
              <p className="text-lg font-semibold text-neutral-900">Rezervasyon özetiniz</p>
              <SummaryRow label="Hizmet" value={categories.find((item) => item.slug === watch('service'))?.title} />
              <SummaryRow label="Bölge" value={districts.find((item) => item.value === watch('district'))?.label} />
              <SummaryRow
                label="Alan bilgisi"
                value={`${watch('areaSize') || '-'} m², ${watch('roomCount') || '-'} alan`}
              />
              <SummaryRow label="Tercihler" value={watch('expectations')?.length ? watch('expectations').length + ' tercih' : 'Belirtilmedi'} />
              <SummaryRow label="Tarih" value={watch('scheduleDate') || '-'} />
              <SummaryRow label="Zaman" value={scheduleOptions.find((option) => option.value === watch('scheduleSlot'))?.label} />
            </div>
            <label className="flex items-start gap-3 text-sm text-neutral-600">
              <input type="checkbox" checked={watch('kvkk') ?? false} onChange={(event) => setValue('kvkk', event.target.checked, { shouldDirty: true })} />
              <span>
                KVKK aydınlatma metnini okudum, kişisel verilerimin işlenmesine onay veriyorum. Bilgilerim yalnızca talep edilen hizmet için kullanılacaktır.
              </span>
            </label>
            {errors.kvkk ? <p className="text-sm text-red-500">{errors.kvkk.message}</p> : null}
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <button type="button" onClick={goBack} className={buttonStyles('ghost')} disabled={currentStepIndex === 0}>
              Geri
            </button>
            {currentStepIndex < steps.length - 1 ? (
              <button type="button" onClick={goNext} className={buttonStyles()}>İleri</button>
            ) : (
              <button type="submit" className={buttonStyles(undefined, 'min-w-[180px]')} disabled={isSubmitting}>
                {isSubmitting ? 'Gönderiliyor...' : 'Rezervasyonu Tamamla'}
              </button>
            )}
          </div>
          {submitState === 'success' ? (
            <p className="text-sm font-medium text-[#ef6c39]">Teşekkürler! Talebiniz bize ulaştı.</p>
          ) : null}
          {submitState === 'error' ? (
            <p className="text-sm text-red-500">Gönderim sırasında bir hata oluştu. Lütfen tekrar deneyin.</p>
          ) : null}
        </div>
      </form>
    </Card>
  );
}

type SummaryRowProps = {
  label: string;
  value?: string;
};

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-neutral-400">{label}</span>
      <span className="max-w-[60%] text-right text-neutral-700">{value || '-'}</span>
    </div>
  );
}
