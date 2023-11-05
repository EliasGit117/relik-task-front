import './styles.css';
import React, { FC, Suspense } from 'react';
import SettingsPopover from '@/components/settings-popover.tsx';
import lightLogo from '@/assets/logo-light.png'
import { useTheme } from '@/lib/theme-provider.tsx';
import { Link, Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const DefaultLayout: FC = () => {
  return (
    <>
      <header>
        <div className="container flex items-center gap-4 py-4 justify-between">
          <Link className="flex gap-2 font-bold uppercase" to="/">
            <img src={lightLogo} className="invert dark:invert-0 h-9 w-9" alt="logo"/>
            <h1 className="text-primary text-2xl">Relik</h1>
          </Link>

          <SettingsPopover/>
        </div>
      </header>

      <Suspense
        fallback={<div className="flex justify-center flex-grow">
          <Loader2 className="h-8 w-8 animate-spin"/>
        </div>}
      >
        <Outlet/>
      </Suspense>

      <footer className="mt-auto pb-2">
        <div className="flex justify-between container py-4 text-sm">@2023 Relik Task</div>
      </footer>
    </>
  );
};

export default DefaultLayout;
