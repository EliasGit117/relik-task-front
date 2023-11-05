import { FC, useEffect } from 'react';
import { AuthApi } from '@/api/requests/auth.api.ts';

const DashboardPage: FC = () => {

  useEffect(() => {
    AuthApi.testRole().then(x => console.log(x));
  }, []);

  return (
    <main className="flex flex-col grow container gap-8">
      <p className="text-foreground">Dashboard</p>

    </main>
  );
}

export default DashboardPage;
