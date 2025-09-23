/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import districts from '@/content/districts.json';
import { buttonStyles } from '@/components/ui/button-styles';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const serviceValues = [
  'anahtar-teslim',
  'mermer-dogaltas',
  'ozel-mobilya',
  'mutfak-tadilati',
  'banyo-tadilati',
] as const;

type ServiceValue = (typeof serviceValues)[number];

const serviceOptions: Array<{
  value: ServiceValue;
  title: string;
  description: string;
}> = [
  {
    value: 'anahtar-teslim',
    title: 'Anahtar Teslim Proje',
    description: 'Keşiften tasarıma, uygulamadan teslimata tüm süreci tek noktadan yönetiyoruz.',
  },
  {
    value: 'mermer-dogaltas',
    title: 'Mermer & Doğaltaş Uygulama',
    description: 'Kesim, montaj ve emprenye işlemleriyle mutfak, banyo ve özel yüzey projeleri.',
  },
  {
    value: 'ozel-mobilya',
    title: 'Özel Mobilya',
    description: 'Kişiye özel tasarım, üretim ve montaj süreçlerini uçtan uca planlıyoruz.',
  },
  {
    value: 'mutfak-tadilati',
    title: 'Mutfak Tadilatı',
    description: 'Dolap, tezgâh, tesisat ve zemin yenilemesini planlıyoruz.',
  },
  {
    value: 'banyo-tadilati',
    title: 'Banyo Tadilatı',
    description: 'Seramik, vitrifiye ve tesisat yenilemeleriyle komple banyo çözümleri.',
  },
];

const scheduleOptions = [
  { value: 'haftaici-sabah', label: 'Hafta içi sabah (09:00-12:00)' },
  { value: 'haftaici-aksam', label: 'Hafta içi akşam (17:00-20:00)' },
  { value: 'haftasonu', label: 'Hafta sonu (10:00-18:00)' },
];

const reservationSchema = z
  .object({
    service: z.enum(serviceValues, { errorMap: () => ({ message: 'Lütfen hizmet seçin' }) }),
    district: z.string().min(1, 'Lütfen bölge seçin'),
    districtOther: z.string().optional(),
    areaSize: z.string().optional(),
    roomCount: z.string().optional(),
    description: z.string().min(20, 'En az 20 karakter ile beklentilerinizi yazın'),
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
  })
  .superRefine((data, ctx) => {
    if (data.district === 'digar' && !data.districtOther?.trim()) {
      ctx.addIssue({
        path: ['districtOther'],
        code: z.ZodIssueCode.custom,
        message: 'Lütfen hizmet almak istediğiniz bölgeyi yazın',
      });
    }

    if (data.service !== 'ozel-mobilya') {
      if (!data.areaSize?.trim()) {
        ctx.addIssue({
          path: ['areaSize'],
          code: z.ZodIssueCode.custom,
          message: 'Metrekare bilgisini girin',
        });
      } else if (Number(data.areaSize) < 5) {
        ctx.addIssue({
          path: ['areaSize'],
          code: z.ZodIssueCode.custom,
          message: 'Metrekare en az 5 olmalıdır',
        });
      }

      if (!data.roomCount?.trim()) {
        ctx.addIssue({
          path: ['roomCount'],
          code: z.ZodIssueCode.custom,
          message: 'Oda/alan sayısını girin',
        });
      } else if (Number(data.roomCount) < 1) {
        ctx.addIssue({
          path: ['roomCount'],
          code: z.ZodIssueCode.custom,
          message: 'Alan sayısı en az 1 olmalıdır',
        });
      }
    }
  });

export type ReservationFormValues = z.infer<typeof reservationSchema>;

const steps = [
  { id: 'service', title: 'Hizmet Seçimi', fields: ['service'] as const },
  { id: 'district', title: 'Bölge Seçimi', fields: ['district', 'districtOther'] as const },
  {
    id: 'space',
    title: 'Alan Bilgisi',
    fields: ['areaSize', 'roomCount'] as const,
  },
  {
    id: 'details',
    title: 'Detaylar',
    fields: ['description'] as const,
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
  const base: PersistedReservationData = {
    service: 'anahtar-teslim',
    district: '',
    districtOther: '',
    areaSize: '',
    roomCount: '',
    description: '',
    scheduleDate: '',
    scheduleSlot: '',
    fullName: '',
    phone: '',
    email: '',
    kvkk: false,
  };

  if (typeof window === 'undefined') {
    return base;
  }

  const stored = window.localStorage.getItem(storageKey);
  if (!stored) {
    return base;
  }

  try {
    return { ...base, ...JSON.parse(stored) };
  } catch (error) {
    console.warn('Rezervasyon verisi okunamadı', error);
    return base;
  }
}

export function ReservationWizard() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle');
  const [previews, setPreviews] = useState<string[]>([]);

  const defaultValues = useMemo(() => getInitialData(), []);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    defaultValues,
  });

  const selectedService = watch('service');
  const selectedDistrict = watch('district');

  const skipSpaceStep = selectedService === 'ozel-mobilya';

  useEffect(() => {
    const subscription = watch((value) => {
      const { media, ...rest } = value;
      void media;
      window.localStorage.setItem(storageKey, JSON.stringify(rest));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (selectedService === 'ozel-mobilya') {
      setValue('areaSize', '', { shouldDirty: true });
      setValue('roomCount', '', { shouldDirty: true });
    }
  }, [selectedService, setValue]);

  useEffect(() => () => {
    previews.forEach((url) => URL.revokeObjectURL(url));
  }, [previews]);

  const goNext = async () => {
    const step = steps[currentStepIndex];
    if (step.id === 'space' && skipSpaceStep) {
      setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
      return;
    }
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
        districtOther: values.districtOther ?? '',
        areaSize: values.areaSize ?? '',
        roomCount: values.roomCount ?? '',
        description: values.description,
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
      reset(getInitialData());
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
  const serviceLabel = serviceOptions.find((option) => option.value === selectedService)?.title;

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
                  isActive && 'border-[#d9aa63] bg-[#d9aa63] text-[#111827]',
                  isCompleted && 'border-[#d9aa63]/40 bg-[#d9aa63]/10 text-[#d9aa63]',
                  !isActive && !isCompleted && 'border-neutral-200 text-neutral-400',
                )}
              >
                {index + 1}
              </span>
              <span className={cn('hidden text-xs uppercase tracking-[0.25em] text-neutral-400 sm:block', isActive && 'text-[#d9aa63]')}>
                {step.title}
              </span>
              {index !== steps.length - 1 ? <span className="hidden h-px w-10 bg-neutral-200 sm:block" /> : null}
            </div>
          );
        })}
      </div>

      <form className="mt-8 space-y-8" onSubmit={onSubmit}>
        {currentStep.id === 'service' && (
          <div className="grid gap-4 md:grid-cols-2">
            <input type="hidden" {...register('service')} />
            {serviceOptions.map((option) => {
              const isSelected = selectedService === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setValue('service', option.value, { shouldDirty: true, shouldValidate: true });
                    void trigger('service');
                  }}
                  className={cn(
                    'flex h-full flex-col items-start gap-2 rounded-2xl border border-neutral-200 bg-white p-5 text-left transition hover:border-[#d9aa63]/60 hover:shadow-sm',
                    isSelected && 'border-[#d9aa63] bg-[#fdf8f1] shadow-sm',
                  )}
                  aria-pressed={isSelected}
                >
                  <span className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">Hizmet</span>
                  <span className="text-lg font-semibold text-[#111827]">{option.title}</span>
                  <span className="text-sm text-neutral-500">{option.description}</span>
                </button>
              );
            })}
            {errors.service ? <p className="col-span-full text-sm text-red-500">{errors.service.message}</p> : null}
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
            {selectedDistrict === 'digar' ? (
              <div className="grid gap-2">
                <label htmlFor="districtOther" className="text-sm font-medium text-neutral-700">
                  İlçe adı
                </label>
                <Input id="districtOther" placeholder="Örn. Serik" {...register('districtOther')} />
                {errors.districtOther ? <p className="text-sm text-red-500">{errors.districtOther.message}</p> : null}
              </div>
            ) : null}
          </div>
        )}

        {currentStep.id === 'space' && (
          <div className="grid gap-6">
            {skipSpaceStep ? (
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
                Özel mobilya projelerinde ölçü bilgisini keşif esnasında birlikte çıkarıyoruz. Bu adımı atlayabilirsiniz.
              </div>
            ) : (
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
          </div>
        )}

        {currentStep.id === 'details' && (
          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium text-neutral-700">
              Projeyi detaylandırın
            </label>
            <Textarea
              id="description"
              placeholder="İş tanımınızı, beklentilerinizi ve önceliklerinizi yazın. Proje programı, malzeme tercihleri, teslim tarihi gibi detayları ekleyin."
              {...register('description')}
            />
            {errors.description ? <p className="text-sm text-red-500">{errors.description.message}</p> : null}
          </div>
        )}

        {currentStep.id === 'media' && (
          <div className="grid gap-4">
            <span className="text-sm font-medium text-neutral-700">Projeye ait görseller (opsiyonel)</span>
            <input
              ref={fileInputRef}
              id="media"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const { files } = event.target;
                if (!files) return;
                const fileArray = Array.from(files);
                setValue('media', files, { shouldDirty: true });
                setPreviews((prev) => {
                  prev.forEach((url) => URL.revokeObjectURL(url));
                  return fileArray.map((file) => URL.createObjectURL(file));
                });
                event.target.value = '';
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={buttonStyles('outline', 'justify-center')}
            >
              Görsel Seç
            </button>
            <p className="text-xs text-neutral-500">Görseller sadece ön inceleme içindir ve kaydedilmez.</p>
            {previews.length ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {previews.map((src) => (
                  <div key={src} className="relative aspect-square overflow-hidden rounded-xl border border-neutral-200">
                    <img src={src} alt="Yüklenen görsel" className="h-full w-full object-cover" />
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
              <SummaryRow label="Hizmet" value={serviceLabel} />
              <SummaryRow
                label="Bölge"
                value={
                  selectedDistrict === 'digar'
                    ? watch('districtOther') || 'Belirtilmedi'
                    : districts.find((item) => item.value === selectedDistrict)?.label
                }
              />
              <SummaryRow
                label="Alan bilgisi"
                value={
                  skipSpaceStep
                    ? 'Bu hizmet için ölçü gerekmiyor'
                    : `${watch('areaSize') || '-'} m², ${watch('roomCount') || '-'} alan`
                }
              />
              <SummaryRow label="Tarih" value={watch('scheduleDate') || '-'} />
              <SummaryRow
                label="Zaman"
                value={scheduleOptions.find((option) => option.value === watch('scheduleSlot'))?.label}
              />
            </div>
            <label className="flex items-start gap-3 text-sm text-neutral-600">
              <input
                type="checkbox"
                checked={watch('kvkk') ?? false}
                onChange={(event) => setValue('kvkk', event.target.checked, { shouldDirty: true })}
              />
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
              <button type="button" onClick={goNext} className={buttonStyles()}>
                İleri
              </button>
            ) : (
              <button type="submit" className={buttonStyles(undefined, 'min-w-[180px]')} disabled={isSubmitting}>
                {isSubmitting ? 'Gönderiliyor...' : 'Rezervasyonu Tamamla'}
              </button>
            )}
          </div>
          {submitState === 'success' ? (
            <p className="text-sm font-medium text-[#d9aa63]">Teşekkürler! Talebiniz bize ulaştı.</p>
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
  value?: string | null;
};

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-neutral-400">{label}</span>
      <span className="max-w-[60%] text-right text-neutral-700">{value || '-'}</span>
    </div>
  );
}
