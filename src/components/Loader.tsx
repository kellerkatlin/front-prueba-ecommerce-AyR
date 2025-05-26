import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface PageLoaderProps {
  readonly message?: string;
  readonly className?: string;
}

export default function Loader({ message, className }: PageLoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center h-screen w-full bg-background text-foreground",
        className
      )}
    >
      <Loader2 className="animate-spin w-10 h-10 text-primary mb-4" />
      <p className="text-sm text-muted-foreground">
        {message ?? "Cargando..."}
      </p>
    </div>
  );
}
