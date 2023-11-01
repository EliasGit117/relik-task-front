import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Monitor, Moon, Settings, Sun } from 'lucide-react';
import { Separator } from '@/components/ui/separator'
import { useTheme } from '@/lib/theme-provider.tsx';

const SettingsPopover = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5"/>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="flex flex-col gap-2 mx-4">

        <span>Theme selection:</span>
        <div className="flex border rounded-md p-1 gap-1">
          <Button
            size="xs"
            variant="ghost"
            className="grow gap-2"
            disabled={theme == 'system'}
            onClick={() => setTheme('system')}
          >
            <Monitor className="h-4 w-4"/> System
          </Button>

          <Separator orientation="vertical" className="h-7"/>

          <Button
            size="xs"
            variant="ghost"
            className="grow gap-2"
            disabled={theme == 'light'}
            onClick={() => setTheme('light')}
          >
            <Sun className="h-4 w-4"/> Light
          </Button>

          <Separator orientation="vertical" className="h-7"/>

          <Button
            size="xs"
            variant="ghost"
            className="grow gap-2"
            disabled={theme == 'dark'}
            onClick={() => setTheme('dark')}
          >
            <Moon className="h-4 w-4"/> Dark
          </Button>

        </div>

      </PopoverContent>
    </Popover>
  )
}

export default SettingsPopover;
