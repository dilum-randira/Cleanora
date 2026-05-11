import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';

const badgeVariants = cva(
  'inline-flex items-center rounded-lg px-3 py-1 text-xs font-black transition',
  {
    variants: {
      variant: {
        default: 'bg-cleanora-ink text-white',
        secondary: 'bg-cleanora-mist text-cleanora-ink',
        outline: 'border border-slate-300 text-slate-600',
        success: 'bg-emerald-100 text-emerald-700',
        warning: 'bg-amber-100 text-amber-700',
        destructive: 'bg-red-100 text-red-700'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
