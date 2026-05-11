import * as React from 'react';
import { cn } from '../../lib/utils.js';

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      'flex min-h-[96px] w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-cleanora-ink outline-none transition placeholder:text-slate-400 focus:border-cleanora-mint focus:ring-4 focus:ring-cleanora-mint/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-70',
      className
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

export { Textarea };
