import './styles.css';
import React, { FC, Suspense, useState } from 'react';
import SettingsPopover from '@/components/settings-popover.tsx';
import lightLogo from '@/assets/logo-light.png'
import { Link, NavLink, Outlet } from 'react-router-dom';
import AccountPopover from '@/components/account-popover.tsx';
import { Sidebar } from 'react-pro-sidebar';
import { Button } from '@/components/ui/button.tsx';
import { CheckCircle, Home, Loader2, Menu as MenuIcon, Users } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store.ts';
import { Role } from '@/data/enums/role.ts';


const AuthorizedLayout: FC = () => {
  const [toggled, setToggled] = React.useState(false);
  const { user } = useAuthStore();

  return (
    <>
      <header>
        <div className="flex items-center gap-4 py-4 px-6">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setToggled(pv => !pv)}>
            <MenuIcon className="h-5 w-5"/>
          </Button>

          <Link className="flex gap-2 font-bold uppercase" to="/">
            <img src={lightLogo} className="invert dark:invert-0 h-9 w-9" alt="logo"/>
            <h1 className="text-primary text-2xl">Relik</h1>
          </Link>

          <div className="flex-grow"/>
          <AccountPopover/>
          <SettingsPopover/>
        </div>
      </header>

      <div className="flex flex-grow">
        <Sidebar
          rootStyles={{
            border: 'none',
            position: 'sticky',
            top: 0,
            height: '100%',
            overflow: 'auto',
          }}
          backgroundColor="none"
          className="bg-background border-r-0"
          onBackdropClick={() => setToggled(false)} toggled={toggled} breakPoint="md"
        >
          <section className="flex bg-background flex-col flex-grow h-full align py-8 px-4 md:py-2 gap-2 active-links">

            <Button asChild variant="ghost" className="justify-start">
              <NavLink to="/" className="gap-4">
                <Home className="h-4 w-4"/> Dashboard
              </NavLink>
            </Button>

            <Button asChild variant="ghost" className="justify-start">
              <NavLink to="/task" className="gap-4">
                <CheckCircle className="h-4 w-4"/> Tasks
              </NavLink>
            </Button>

            {
              user?.role === Role.admin &&
              <Button asChild variant="ghost" className="justify-start">
                <NavLink to="/users" className="gap-4">
                  <Users className="h-4 w-4"/> Users
                </NavLink>
              </Button>
            }

          </section>
        </Sidebar>

        <Suspense
          fallback={<div className="flex justify-center flex-grow">
            <Loader2 className="h-8 w-8 animate-spin"/>
          </div>}
        >
          <Outlet/>
        </Suspense>
      </div>

      <footer className="mt-auto pb-2">
        <div className="flex justify-between px-8 py-4 text-sm text-muted-foreground">
          @2023 Relik Task
        </div>
      </footer>
    </>
  );
};

export default AuthorizedLayout;
