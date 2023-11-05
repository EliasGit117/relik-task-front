import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/lib/theme-provider.tsx';
import { useAuthStore } from '@/stores/auth-store.ts';
import { router } from '@/router.tsx';
import { Toaster as ShadcnToaster } from "@/components/ui/toaster"

const App = () => {
  const { token } = useAuthStore();

  return (
    <ThemeProvider storageKey="theme">
      <RouterProvider router={router(!!token)}/>
      <Toaster position="bottom-right"/>
      <ShadcnToaster/>
    </ThemeProvider>
  );
}

export default App;
