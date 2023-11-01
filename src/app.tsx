import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/lib/theme-provider.tsx';
import { authRouter, unauthRouter } from '@/router.tsx';
import { useAuthStore } from '@/stores/auth-store.ts';

const App = () => {
  const { token } = useAuthStore();

  return(
    <ThemeProvider storageKey="theme">
      <Suspense>
        <RouterProvider router={!token ? unauthRouter : authRouter}/>
      </Suspense>
      <Toaster position='bottom-right'/>
    </ThemeProvider>
  );
}

export default App;
