import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Check, Loader2, LogInIcon, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useForm } from 'react-hook-form';
import { Separator } from '@/components/ui/separator.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { AuthApi } from '@/api/requests/auth.api.ts';
import customToast from '@/lib/custom-toast.tsx';
import { useAuthStore } from '@/stores/auth-store.ts';
import { AuthedUser } from '@/data/dtos/authed-user.ts';

type TSignInForm = {
  userNameOrEmail: string;
  password: string;
};

const SignInPage = () => {
  const { register, handleSubmit, formState } = useForm<TSignInForm>();
  const { isValid, isSubmitting, errors } = formState;
  const { signIn } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (form: TSignInForm) => {

    return AuthApi.signIn({
      usernameOrEmail: form.userNameOrEmail,
      password: form.password
    })
      .then((res: { token: string, user: AuthedUser }) => {
        navigate('/', { replace: true });
        signIn(res.token, res.user);
      })
      .catch(e =>
        customToast(
          <div className="font-semibold">
            {JSON.stringify(e.response?.data?.message, null, 2) ?? 'Error'}
          </div>,
          { variant: 'destructive' }
        )
      );
  };

  return (
    <main className="container">

      <section className="max-w-2xl ml-auto mr-auto mt-16 sm:mt-12 md:mt-44">
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2 items-center text-2xl">
              <LogInIcon/> Sign In
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">

            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <fieldset disabled={isSubmitting} className="space-y-4">

                <Input
                  type="text"
                  aria-invalid={errors.userNameOrEmail ? 'true' : 'false'}
                  placeholder="Username or Email"
                  {...register('userNameOrEmail', {
                    required: 'Required',
                    minLength: 6
                  })}
                />
                {errors.userNameOrEmail &&
                  <p role="alert" className="text-sm pl-2 text-destructive">{errors.userNameOrEmail?.message}</p>}

                <Input
                  type="password"
                  placeholder="Password"
                  {...register('password', {
                    required: 'Required',
                    minLength: 6
                  })}
                />

                <Button type="submit" className="w-full" disabled={!isValid}>
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Check className="mr-2 h-4 w-4"/>}
                  Submit
                </Button>
              </fieldset>
            </form>


            <div className="relative my-4">
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
              <Link to="/sign-up">
                <UserPlus className="h-4 w-4 mr-2"/> Sign Up
              </Link>
            </Button>

          </CardContent>
        </Card>

      </section>

    </main>
  );
};

export default SignInPage;
