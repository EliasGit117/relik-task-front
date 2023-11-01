import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { UserCircle2 } from 'lucide-react';

const AccountPopover = () => {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <UserCircle2 className="h-5 w-5"/>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="flex flex-col gap-2 w-44 ">
        <h1>Some name</h1>
      </PopoverContent>
    </Popover>
  )
}

export default AccountPopover;
