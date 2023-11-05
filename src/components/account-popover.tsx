import { Button } from '@/components/ui/button'
import { LogOut, UserCircle2 } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store.ts';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from './ui/dropdown-menu';

const AccountPopover = () => {
  const { signOut, user } = useAuthStore();
  const navigate = useNavigate();

  const logout = () => {
    navigate('/', { replace: true });
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <UserCircle2 className="h-5 w-5"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuLabel>
          Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuItem disabled>
          {user?.username}
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          Role: {user?.role}
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem className="flex justify-between" onClick={() => logout()}>
          Log out
          <LogOut className="h-4 w-4"/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountPopover;
