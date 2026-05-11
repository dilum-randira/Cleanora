import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cleanora-mint/20 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-cleanora-ink text-white shadow-soft hover:bg-cleanora-charcoal',
        secondary: 'bg-cleanora-mist text-cleanora-ink hover:bg-cleanora-mint/20',
        outline: 'border border-slate-300 bg-white text-cleanora-ink hover:border-cleanora-mint hover:text-cleanora-mint',
        ghost: 'text-slate-600 hover:bg-slate-100 hover:text-cleanora-ink',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        whatsapp: 'bg-[#25D366] text-white shadow-soft hover:bg-[#1ebe5d]'
      },
      size: {
        default: 'h-11 px-5 py-3',
        sm: 'h-9 px-3 text-xs',
        lg: 'h-12 px-6',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export { Button, buttonVariants };
