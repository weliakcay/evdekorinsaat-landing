'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          'flex h-11 w-full appearance-none rounded-lg border border-neutral-200 bg-white px-4 pr-10 text-sm text-neutral-900 shadow-sm transition',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9aa63]/60 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
    </div>
  ),
);
Select.displayName = 'Select';

export { Select };
