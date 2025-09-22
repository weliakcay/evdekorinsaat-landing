'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'ghost';

type ButtonProps = {
  variant?: Variant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#ef6c39] disabled:pointer-events-none disabled:opacity-60 px-5 py-2.5';

const variantStyles: Record<Variant, string> = {
  primary: 'bg-[#ef6c39] text-white hover:bg-[#d95e2f]',
  outline: 'border border-current text-[#ef6c39] hover:bg-[#fff4ee] focus-visible:ring-[#ef6c39]/20',
  ghost: 'text-[#1f2937] hover:bg-neutral-100',
};

export function buttonStyles(variant: Variant = 'primary', className?: string) {
  return cn(baseStyles, variantStyles[variant], className);
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={buttonStyles(variant, className)}
      {...props}
    />
  ),
);
Button.displayName = 'Button';

export { Button };
