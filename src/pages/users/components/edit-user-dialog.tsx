import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import React, { FC, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { User } from '@/data/dtos/user.ts';
import { Check, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input.tsx';
import { useForm } from 'react-hook-form';
import { Role } from '@/data/enums/role.ts';
import { Label } from '@/components/ui/label.tsx';

interface IUserForm {
  username: string;
  email: string;
  role: Role;
}

const EditUserDialog: FC<{ user?: User, setUser: (user?: User) => void }> = (p) => {
  const { user, setUser } = p;
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState,
    reset
  } = useForm<IUserForm>();

  useEffect(() => {
    reset(user)
  }, [user]);

  return (
    <Dialog
      open={!!user}
      onOpenChange={(value) => {
        if (!value && !isLoading) {
          setUser(undefined);
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit account</DialogTitle>
        </DialogHeader>

        {
          user && <fieldset disabled={isLoading} className="grid gap-2 py-4">

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right grid-cols-1">
                Username:
              </Label>
              <Input
                id="username"
                type="text"
                className="col-span-3"
                {...register('username', {
                  required: 'Required'
                })}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right grid-cols-1">
                Email:
              </Label>
              <Input
                id="email"
                type="email"
                className="col-span-3"
                {...register('email', {
                  required: 'Required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right grid-cols-1">
                Role:
              </Label>

              <Input
                id="role"
                className="col-span-3"
                placeholder={`'admin' or 'user'`}
                {...register('role', {
                  required: 'Required',
                  validate: v => ['admin', 'user'].includes(v) || `Only 'user' or 'admin' are supported`
                })}
              />
            </div>

          </fieldset>
        }

        <DialogFooter>
          <Button
            disabled={!formState.isValid || !formState.isDirty || isLoading}
            type="submit"
            className="gap-2"
            onClick={() => setIsLoading(pv => !pv)}
          >
            {
              isLoading ?
                <><Loader2 className="h-4 w-4 animate-spin"/> Loading</> :
                <><Check className="h-4 w-4"/> Save changes</>
            }

          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}

export default EditUserDialog;
