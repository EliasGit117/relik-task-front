import { Button } from '@/components/ui/button.tsx';
import { CalendarIcon, ChevronRight, Loader2, RotateCw, Save, Undo } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CreateNewTask from '@/data/dtos/create-new-task.ts';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { cn } from '@/lib/utils.ts';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar.tsx';
import Task from '@/data/dtos/task.ts';
import { TaskApi } from '@/api/requests/task.api.ts';
import { useParams } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast.ts';
import { AxiosError } from 'axios';

const formSchema: z.ZodType<CreateNewTask> = z.object({
  name: z.string().min(3).max(50),
  description: z.string().max(250).optional().transform(e => e === '' ? undefined : e),
  deadline: z.optional(z.date()),
});

const TasksDetailsPage = () => {
  const [task, setTask] = useState<Task | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: undefined,
      deadline: undefined
    }
  });

  const loadTask = () => {
    if (id) {
      setIsLoading(true);
      TaskApi.getById(id)
        .then(result => {
          setTask(result);
        })
        .catch((e: AxiosError<{ message: string[] }>) => {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: e.response?.data?.message?.toString() ?? 'Bad request'
          });
        })
        .finally(() => setIsLoading(false));
    }
  };

  const onSubmit = (form: CreateNewTask) => {
    if (id) {
      return TaskApi.replace(id, form)
        .then(result => {
          setTask(result);
          toast({
            title: 'Success'
          })
        })
        .catch((e: AxiosError<{ message: string[] }>) => {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: e.response?.data?.message?.toString() ?? 'Bad request'
          });
        });
    }
  }

  useEffect(() => {
    loadTask();
  }, []);

  useEffect(() => {
    if (task) {
      form.reset({
        name: task.name,
        description: task.description,
        deadline: task.deadline ? new Date(task.deadline) : undefined
      })
    }
  }, [task]);

  return (
    <main className="flex flex-col grow container gap-8">
      <div className="flex justify-between items-center">
        <div className="mb-4 flex items-center gap-1 text-muted-foreground">
          Task
          <ChevronRight className="h-4 w-4 mt-1"/>
          <div className="text-foreground">
            Details
          </div>
        </div>

        <div className="gap-2 flex">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-3xl"
            disabled={!form.formState.isDirty || !form.formState.isValid || form.formState.isSubmitting}
            onClick={() => form.handleSubmit(onSubmit)()}
          >
            <Save className="h-4 w-4"/>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-3xl"
            disabled={isLoading || !form.formState.isDirty || form.formState.isSubmitting}
            onClick={() => form.reset()}
          >
            <Undo className="h-4 w-4"/>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-3xl"
            disabled={form.formState.isSubmitting || isLoading}
            onClick={() => loadTask()}
          >
            <RotateCw className="h-4 w-4"/>
          </Button>
        </div>
      </div>


      {
        isLoading ?
          <div className="flex justify-center flex-grow">
            <Loader2 className="h-8 w-8 animate-spin"/>
          </div>
          :
          <>
            {
              !task ?
                <section className="flex justify-center">Not found</section> :
                <section>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <fieldset disabled={form.formState.isSubmitting} className="py-4 space-y-8">

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
                                    onClick={() => form.setValue('deadline', undefined) }
                                  >
                                    Unset
                                  </Button>
                                </PopoverContent>
                              </Popover>
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
                                <Textarea placeholder="Description" className="min-h-[300px]" {...field} />
                              </FormControl>
                              <FormMessage/>
                            </FormItem>
                          )}
                        />

                      </fieldset>
                    </form>
                  </Form>
                </section>
            }

          </>
      }

    </main>
  )
};

export default TasksDetailsPage;
