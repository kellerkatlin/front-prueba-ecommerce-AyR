import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, User } from "lucide-react";
import type { UserRequest } from "@/types/auth.type";

export const loginSchema = z.object({
  username: z.string().min(1, "Campo requerido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});
interface LoginShemaType {
  readonly onSubmit: (data: UserRequest) => void;
  readonly isPending?: boolean;
}

export default function LoginForm({ onSubmit, isPending }: LoginShemaType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRequest>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* email */}
      <div>
        <div className="relative flex items-center">
          <User className="absolute left-5 text-gray-400  h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Username"
            {...register("username")}
            className="pl-12 py-6 placeholder:text-gray-400"
          />
        </div>
        {errors.username && (
          <p className="text-xs text-destructive mt-1">
            {errors.username.message}
          </p>
        )}
      </div>

      {/* password */}
      <div>
        <div className="relative flex items-center">
          <Lock className="absolute left-5 text-gray-400  h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Password"
            type="password"
            {...register("password")}
            className="pl-12 py-6 placeholder:text-gray-400"
          />
        </div>
        {errors.password && (
          <p className="text-xs text-destructive mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* botón */}
      <Button
        type="submit"
        className="w-full py-6 bg-primary"
        disabled={isPending}
      >
        {isPending ? "Ingresando…" : "Ingresar"}
      </Button>
    </form>
  );
}
