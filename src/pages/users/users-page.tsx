import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Edit, Loader2, RotateCw } from 'lucide-react';
import { UserApi } from '@/api/requests/user.api.ts';
import { User } from '@/data/dtos/user.ts';
import EditUserDialog from '@/pages/users/components/edit-user-dialog.tsx';

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | undefined>();

  const loadUsers = () => {
    setIsLoading(true);
    UserApi.getAll()
      .then(users => setUsers(users))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <main className="flex flex-col grow container gap-8">
      <div className="flex justify-between items-center">
        <p>Users</p>

        <Button variant="ghost" size="icon" className="rounded-3xl" onClick={loadUsers} disabled={isLoading}>
          <RotateCw className="h-4 w-4"/>
        </Button>
      </div>

      <div className="border rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead/>
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
                  users.map((user, i) => <TableRow key={i}>
                    <TableCell>{user._id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="rounded-3xl" onClick={() => setUserToEdit(user)} disabled>
                        <Edit className="h-4 w-4"/>
                      </Button>
                    </TableCell>
                  </TableRow>)
                }
              </TableBody>
          }
        </Table>
      </div>

      <EditUserDialog user={userToEdit} setUser={setUserToEdit}/>
    </main>
  );
}

export default UsersPage;
