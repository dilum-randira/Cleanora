import * as React from 'react';
import { cn } from '../../lib/utils.js';

const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      'flex h-11 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-cleanora-ink outline-none transition placeholder:text-slate-400 focus:border-cleanora-mint focus:ring-4 focus:ring-cleanora-mint/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-70',
      className
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };
