import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmAlertProps {
  readonly open: boolean;
  readonly title?: string;
  readonly message?: string;
  readonly onCancel: () => void;
  readonly onConfirm: () => void;
  readonly isLoading?: boolean;
}

export default function ConfirmAlert({
  open,
  title = "¿Estás seguro?",
  message = "Esta acción no se puede deshacer.",
  onCancel,
  onConfirm,
  isLoading,
}: ConfirmAlertProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex items-end justify-center gap-4">
            <AlertDialogCancel className="cursor-pointer" onClick={onCancel}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
