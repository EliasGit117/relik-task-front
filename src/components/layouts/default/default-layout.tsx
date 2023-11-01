import './styles.css';
import { FC } from 'react';
import SettingsPopover from '@/components/settings-popover.tsx';
import lightLogo from '@/assets/logo-light.png'
import { useTheme } from '@/lib/theme-provider.tsx';
import { Link, Outlet } from 'react-router-dom';

const DefaultLayout: FC = () => {
  const { isDark } = useTheme();

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

      <>
        <Outlet/>
      </>

      <footer className="mt-auto pb-2">
        <div className="flex justify-between container py-4 text-sm">

          <span>
            @2023 Relik Task
          </span>

        </div>
      </footer>
    </>
  );
};

export default DefaultLayout;
