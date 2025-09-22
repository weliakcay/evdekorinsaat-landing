import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-[#fff4ee] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#ef6c39]',
        className,
      )}
      {...props}
    />
  );
}
