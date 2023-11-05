import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { CalendarIcon, Check, Loader2, Plus, RotateCw } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { cn } from '@/lib/utils.ts';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar.tsx';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form.tsx';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import CreateNewTask from '@/data/dtos/create-new-task.ts';
import { TaskApi } from '@/api/requests/task.api.ts';
import { toast } from '@/components/ui/use-toast.ts';
import { AxiosError } from 'axios';

const formSchema: z.ZodType<CreateNewTask> = z.object({
  name: z.string().min(3).max(50),
  description: z.string().max(250).optional().transform(e => e === '' ? undefined : e),
  deadline: z.date().optional().or(z.date(undefined)),
});

interface IProps {
  disabled?: boolean;
  afterSuccess?: () => void;
}

const CreateTask = (p: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      deadline: undefined
    }
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen]);

  const handleChange = (value: boolean) => {
    if (form.formState.isSubmitting)
      return;

    setIsOpen(value);
  }

  const onSubmit = async (form: CreateNewTask) => {
    return TaskApi.create(form)
      .then(r => {
        toast({
          title: 'Success',
          description: 'Task has been successfully created'
        });
        setIsOpen(false);
        p.afterSuccess && p.afterSuccess();
      })
      .catch((e: AxiosError<{ message: string[] }>) => {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: e.response?.data?.message?.toString() ?? 'Bad request'
        });
      })
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleChange}>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-3xl"
        disabled={p.disabled}
        onClick={() => handleChange(!isOpen)}
      >
        <Plus className="h-4 w-4"/>
      </Button>
      <DialogContent className="sm:max-w-[680px]">
        <DialogHeader>
          <DialogTitle>Create new task</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset disabled={form.formState.isSubmitting} className="py-4 space-y-4">

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      Deadline
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                          >
                            {field.value ? (format(field.value, 'PPP')) : (<span>Pick a date</span>)}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="flex w-auto flex-col space-y-2 p-2" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                        <Button
                          variant="outline"
                          disabled={!field.value}
                          onClick={() => form.setValue('deadline', undefined)}
                        >
                          Unset
                        </Button>
                      </PopoverContent>
                    </Popover>
                    <FormMessage/>
                  </FormItem>
                )}
              />

            </fieldset>
          </form>
        </Form>


        <DialogFooter>
          <Button
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            type="submit"
            className="gap-2"
            onClick={() => form.handleSubmit(onSubmit)()}
          >
            {
              form.formState.isSubmitting ?
                <><Loader2 className="h-4 w-4 animate-spin"/> Loading</> :
                <><Check className="h-4 w-4"/> Save changes</>
            }

          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
    ;
};

export default CreateTask;
