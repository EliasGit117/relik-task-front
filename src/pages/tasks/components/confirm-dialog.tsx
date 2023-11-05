import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Check, X } from 'lucide-react';

export interface IConfirmDialogData {
  title: string;
  description?: string;
  onSubmit?: () => void,
  afterSuccess?: () => void,
  afterFail?: () => void,
}

interface IConfirmDialogProps {
  data?: IConfirmDialogData,
  setData: (data?: IConfirmDialogData) => void
}

const ConfirmDialog = (p: IConfirmDialogProps) => {
  const { data, setData } = p;

  const onChange = (value: boolean) => {
    if (!value) {
      setData(undefined);
    }
  };

  return (
    <Dialog open={!!data} onOpenChange={onChange}>
      <DialogContent>

        <DialogHeader>
          {data?.title}
        </DialogHeader>
        <DialogDescription>
          {data?.description}
        </DialogDescription>
        <DialogFooter className="gap-2">
          <Button variant="destructive" className="flex gap-1" onClick={() => onChange(false)}>
            <X className="h-4 w-4 mt-0.5"/>
            Cancel
          </Button>
          <Button
            className="flex gap-1"
            onClick={() => {
              if (data?.onSubmit) {
                data.onSubmit();
                onChange(false);
              }
            }}
          >
            <Check className="h-4 w-4 mt-0.5"/>
            Submit
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
