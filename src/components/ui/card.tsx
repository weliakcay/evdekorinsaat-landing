import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-neutral-100 bg-white p-6 shadow-[0_12px_45px_-30px_rgba(0,0,0,0.4)]',
        className,
      )}
      {...props}
    />
  );
}
