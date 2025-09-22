'use client';

import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => (
  <label className={cn('relative inline-flex cursor-pointer items-center gap-2 text-sm text-neutral-700', className)}>
    <input
      ref={ref}
      type="checkbox"
      className="peer sr-only"
      {...props}
    />
    <span className="flex h-5 w-5 items-center justify-center rounded-md border border-neutral-300 bg-white transition peer-checked:border-[#ef6c39] peer-checked:bg-[#ef6c39]">
      <Check className="h-3 w-3 text-white opacity-0 transition peer-checked:opacity-100" />
    </span>
    {props.children}
  </label>
));
Checkbox.displayName = 'Checkbox';

export { Checkbox };
