import { useForm } from 'react-hook-form';
import { AlertDescription } from '@/components/ui/alert';
import customToast from '@/lib/custom-toast.tsx';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Loader2, LogIn, LogInIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator.tsx';
import { Link } from 'react-router-dom';

interface ISignUpForm {
  email: string,
  username: string,
  password: string,
  repeatPassword: string,
}

const SignUpPage = () => {
  const { register, handleSubmit, formState } = useForm<ISignUpForm>();
  const { errors, isValid, isSubmitting } = formState;

  const onSubmit =   (data: ISignUpForm) => {

  };

  return (
    <main className="container">

      <section className="max-w-2xl ml-auto mr-auto mt-16 sm:mt-12 md:mt-44">
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <LogInIcon/>
              <span>Sign Up</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">

            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <fieldset disabled={isSubmitting} className="space-y-4">

                <Input
                  type="email"
                  name="email"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  placeholder="Email"
                  required
                  {...register('email', {
                    required: "Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email"
                    }
                  })}
                />
                {errors.email && <p className="text-sm pl-2 text-destructive">{errors.email?.message}</p>}

                <Input
                  type="text"
                  name="username"
                  aria-invalid={errors.username ? 'true' : 'false'}
                  placeholder="Username"
                  required
                  {...register('username', {
                    required: "Required",
                    minLength: 6
                  })}
                />
                {errors.username && <p className="text-sm pl-2 text-destructive">{errors.username?.message}</p>}

                <Input
                  type="password"
                  name="psw"
                  placeholder="Password"
                  {...register('password', {
                    required: "Required"
                  })}
                />
                {errors.password && <p className="text-sm pl-2 text-destructive">{errors.password?.message}</p>}

                <Input
                  type="password"
                  name="psw-repeat"
                  placeholder="Repeat password"
                  required
                  {...register('repeatPassword')}
                />
                {
                  errors.repeatPassword && <p className="text-sm pl-2 text-destructive">
                    {errors.repeatPassword?.message}
                  </p>
                }

                <Button type="submit" className="w-full" disabled={!isValid}>
                  {
                    isSubmitting ?
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/> :
                    <Check className="mr-2 h-4 w-4"/>
                  }
                  Submit
                </Button>
              </fieldset>
            </form>


            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full"/>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <div className="bg-background px-2">
                  OR
                </div>
              </div>
            </div>

            <Button variant="outline" asChild>
              <Link to="/sign-in">
                <LogIn className="h-4 w-4 mr-2"/> Sign In
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

    </main>
  )
    ;
};

export default SignUpPage;
