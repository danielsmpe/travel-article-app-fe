// DeleteConfirmation.tsx

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type DeleteConfirmationProps = {
  onConfirm: () => void;
  trigger: React.ReactNode;
};

export function DeleteConfirmation({
  onConfirm,
  trigger,
}: DeleteConfirmationProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus ?</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Tindakan ini tidak dapat dibatalkan.
        </p>
        <DialogFooter>
          <Button variant="outline">Batal</Button>
          <Button variant="destructive" onClick={onConfirm}>
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
