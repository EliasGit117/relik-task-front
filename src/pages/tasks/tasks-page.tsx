import { useEffect, useState } from 'react';
import { User } from '@/data/dtos/user.ts';
import { Button } from '@/components/ui/button.tsx';
import { Eye, Loader2, RotateCw, Trash } from 'lucide-react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import Task from '@/data/dtos/task.ts';
import { TaskApi } from '@/api/requests/task.api.ts';
import CreateTask from '@/pages/tasks/components/create-task.tsx';
import { NavLink } from 'react-router-dom';
import ConfirmDialog, { IConfirmDialogData } from '@/pages/tasks/components/confirm-dialog.tsx';
import { toast } from '@/components/ui/use-toast.ts';
import { AxiosError } from 'axios';


const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | undefined>();
  const [confirmDialogData, setConfirmDialogData] = useState<IConfirmDialogData>();

  const loadTasks = () => {
    setIsLoading(true);
    TaskApi.getAll()
      .then(res => setTasks(res))
      .catch((e: AxiosError<{ message: string[] }>) => {
        toast({
          variant: 'destructive',
          title: 'Error: ' + e.code,
          description: e.response?.data?.message?.toString() ?? 'Bad request'
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const shortify = (text: string, length: number) => text.substring(0, length) + '...';



  const setTaskForDeletion = (task: Task) => {
    setConfirmDialogData({
      title: 'Are you sure?',
      description: 'You are going to delete this task',
      onSubmit: () => {
        TaskApi.delete(task._id)
          .then(() => {
            toast({
              title: 'Deleted'
            });
            loadTasks();
          })
          .catch((e: AxiosError<{ message: string[] }>) => toast({
            variant: 'destructive',
            description: e.response?.data?.message?.toString() ?? 'Bad request'
          }));
      }
    })
  }

  return (
    <main className="flex flex-col grow container gap-8">
      <div className="flex justify-between items-center">
        <p>Tasks</p>

        <div className="gap-2 flex">
          <CreateTask afterSuccess={() => loadTasks()}/>
          <Button variant="ghost" size="icon" className="rounded-3xl" onClick={loadTasks} disabled={isLoading}>
            <RotateCw className="h-4 w-4"/>
          </Button>
        </div>
      </div>

      <div className="border rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          {
            isLoading ?
              <TableCaption className="m-4">
                <Loader2 className="h-8 w-8 animate-spin"/>
              </TableCaption>
              :
              <TableBody>
                {
                  tasks.length > 0 ?
                    tasks.map((task, i) => <TableRow key={i}>
                      <TableCell>{task.name}</TableCell>
                      <TableCell>
                        {task.description ? shortify(task.description, 8) : '-'}
                      </TableCell>
                      <TableCell>{task.created ? new Date(task.created).toDateString() : '-'}</TableCell>
                      <TableCell>{task.deadline ? new Date(task.deadline).toDateString() : '-'}</TableCell>
                      <TableCell className="gap-2 flex justify-end">
                        <Button variant="ghost" size="icon" className="rounded-3xl" asChild>
                          <NavLink to={`/task/${task._id}`}>
                            <Eye className="h-4 w-4"/>
                          </NavLink>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-3xl"
                          onClick={() => setTaskForDeletion(task)}
                        >
                          <Trash className="h-4 w-4"/>
                        </Button>
                      </TableCell>
                    </TableRow>)
                    :
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No results
                      </TableCell>
                    </TableRow>
                }
              </TableBody>
          }
        </Table>
      </div>


      <ConfirmDialog
        data={confirmDialogData}
        setData={(data) => setConfirmDialogData(data)}
      />
    </main>
  );
};

export default TasksPage;
