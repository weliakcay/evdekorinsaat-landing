'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'w-full min-h-[140px] rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm transition resize-none',
        'placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef6c39]/60 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400',
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = 'Textarea';

export { Textarea };
