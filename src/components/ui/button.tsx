'use client';

import * as React from 'react';
import { buttonStyles, ButtonVariant } from './button-styles';

type ButtonProps = {
  variant?: ButtonVariant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

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
