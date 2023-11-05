import { FC } from 'react';
import { Link } from 'react-router-dom';
import planning from '@/assets/planning.png';
import { Button } from '@/components/ui/button.tsx';
import { LogIn, UserPlus } from 'lucide-react';

const HomePage: FC = () => {

  return (
    <main className="container flex flex-col gap-4 py-8">

      <div className="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-sm border mt-12 lg:mt-24">
        <img src={planning} alt="planning" className="object-cover h-full"/>

        <div className="flex flex-col items-center justify-center text-2xl gap-10 py-10">
          <h1 className="text-4xl">Welcome!</h1>

          <div className="flex flex-col gap-4 min-w-[250px]">
            <Button asChild>
              <Link to="sign-in" className="gap-2">
                <LogIn className="h-4 w-4"/> Sign in
              </Link>
            </Button>

            <Button asChild>
              <Link to="sign-up" className="gap-2">
                <UserPlus className="h-4 w-4"/> Create new account
              </Link>
            </Button>
          </div>
        </div>
      </div>


    </main>
  );
}

export default HomePage;
