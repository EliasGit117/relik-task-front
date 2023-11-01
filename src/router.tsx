import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import NotFoundPage from '@/pages/not-found-page.tsx';
import DefaultLayout from '@/components/layouts/default/default-layout.tsx';
import AuthorizedLayout from '@/components/layouts/default/authorized-layout.tsx';

const HomePage = React.lazy(() => import('./pages/home-page.tsx'));
const SignInPage = React.lazy(() => import('./pages/sign-in-page.tsx'));
const SignUpPage = React.lazy(() => import('./pages/sign-up-page.tsx'));

export const unauthRouter = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      { path: '', element: <HomePage/> },
      { path: 'sign-in', element: <SignInPage/> },
      { path: 'sign-up', element: <SignUpPage/> },
      { path: '*', element: <NotFoundPage/> }
    ]
  }
]);


export const authRouter = createBrowserRouter([
  {
    path: '/',
    element: <AuthorizedLayout/>,
    children: [
      { path: '', element: <HomePage/> },
      { path: '*', element: <NotFoundPage/> }
    ]
  }
]);

