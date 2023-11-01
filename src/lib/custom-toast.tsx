import toast, { ToastOptions } from 'react-hot-toast';
import { Alert } from '@/components/ui/alert.tsx';
import { Button } from '@/components/ui/button.tsx';
import { X } from 'lucide-react';
import React from 'react';

interface IToastOptions extends ToastOptions {
  variant?: 'default' | 'destructive';
}

const customToast = (children: React.ReactNode, options?: IToastOptions) => {

  const toastId = toast.custom((t) => (
    <Alert
      variant={options?.variant ?? 'default'}
      className={
        `bg-background shadow-md border-2 max-w-md flex justify-between 
         ${t.visible ? 'animate-enter' : 'animate-leave'}`
      }
    >
      {children}
      <Button variant="ghost" size="xs" onClick={() => toast.dismiss(toastId)}>
        <X className="h-4 w-4"/>
      </Button>
    </Alert>
  ), options);
};
export default customToast;
