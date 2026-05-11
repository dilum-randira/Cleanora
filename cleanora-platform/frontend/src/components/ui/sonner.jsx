import { Toaster as Sonner } from 'sonner';

function Toaster(props) {
  return (
    <Sonner
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: 'rounded-lg border border-slate-200 bg-white text-cleanora-ink shadow-soft',
          title: 'font-bold',
          description: 'text-slate-600'
        }
      }}
      {...props}
    />
  );
}

export { Toaster };
