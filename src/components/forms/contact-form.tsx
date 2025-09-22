'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { buttonStyles } from '@/components/ui/button';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Lütfen adınızı girin'),
  phone: z
    .string()
    .regex(/^[0-9+\s()-]{10,}$/i, 'Geçerli bir telefon numarası girin'),
  email: z.string().email('Geçerli bir e-posta girin'),
  message: z.string().min(20, 'Mesajınızı en az 20 karakter ile detaylandırın'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    console.log('İletişim formu gönderildi', values);
    setSubmitted(true);
    reset();
  });

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <label htmlFor="fullName" className="text-sm font-medium text-neutral-700">
          Ad Soyad
        </label>
        <Input id="fullName" placeholder="Adınız ve soyadınız" {...register('fullName')} />
        {errors.fullName ? (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        ) : null}
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
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium text-neutral-700">
          Mesajınız
        </label>
        <Textarea id="message" placeholder="Projenizin detaylarından bahsedin" {...register('message')} />
        {errors.message ? <p className="text-sm text-red-500">{errors.message.message}</p> : null}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className={buttonStyles(undefined, 'px-6')}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Gönderiliyor...' : 'Bilgilerimi Gönder'}
        </button>
        {submitted ? <p className="text-sm text-[#ef6c39]">Teşekkürler! En kısa sürede sizinle iletişime geçeceğiz.</p> : null}
      </div>
    </form>
  );
}
