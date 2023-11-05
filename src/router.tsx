import { createBrowserRouter, Navigate } from 'react-router-dom';
import React from 'react';
import DefaultLayout from '@/components/layouts/default/default-layout.tsx';
import AuthorizedLayout from '@/components/layouts/default/authorized-layout.tsx';

const HomePage = React.lazy(() => import('./pages/home/home-page.tsx'));
const SignInPage = React.lazy(() => import('./pages/sign-in/sign-in-page.tsx'));
const UsersPages = React.lazy(() => import('./pages/users/users-page.tsx'));
const SignUpPage = React.lazy(() => import('./pages/sign-up/sign-up-page.tsx'));
const DashboardPage = React.lazy(() => import('./pages/dashboards/dashboard-page.tsx'));
const TasksPage = React.lazy(() => import('./pages/tasks/tasks-page.tsx'));
const TaskDetailsPage = React.lazy(() => import('./pages/tasks/tasks-details-page.tsx'));

const adminPages = [
  { path: 'users', element: <UsersPages/> },
];

export const router = (isLogged: boolean) => createBrowserRouter([
  {
    path: '/',
    element: isLogged ? <AuthorizedLayout/> : <DefaultLayout/>,
    children: isLogged ? [
      ...adminPages,
      { path: '', element: <DashboardPage/> },
      { path: 'task', element: <TasksPage/> },
      { path: 'task/:id', element: <TaskDetailsPage/> },
      { path: '*', element: <Navigate to="/" replace /> }
    ] : [
      { path: '', element: <HomePage/> },
      { path: 'sign-in', element: <SignInPage/> },
      { path: 'sign-up', element: <SignUpPage/> },
      { path: '*', element: <Navigate to="/" replace /> }
    ]
  }
]);


