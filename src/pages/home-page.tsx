import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store.ts';

const HomePage: FC = () => {
  const { token } = useAuthStore();

  return (
    <main className="container py-8 flex flex-col gap-4">
      <h1 className="text-4xl">Home</h1>

      {
        !token &&
        <>
          <Link to="sign-in">Sign in</Link>
          <Link to="sign-up">Sign up</Link>
        </>
      }
    </main>
  );
}

export default HomePage;
