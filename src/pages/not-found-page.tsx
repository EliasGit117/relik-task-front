import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { Home, StepBack, Undo, Undo2 } from 'lucide-react';
import React from 'react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col flex-grow justify-center items-center p-8">

      <section className="flex flex-col gap-8">

        <header className="text-9xl text-center">
          404
        </header>


        <h3 className="ml-auto mr-auto max-w-4xl text-3xl">
          Oops... requested page has not been found!
        </h3>

        <footer className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <Button variant="outline" asChild className="gap-3">
            <Link
              to=".."
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              <Undo2 className="h-4 w-4"/> Go back
            </Link>
          </Button>

          <Button variant="outline" asChild className="gap-3">
            <Link to="/">
              <Home className="h-4 w-4"/> Go home
            </Link>
          </Button>
        </footer>
      </section>

    </main>
  );
};

export default NotFoundPage;
