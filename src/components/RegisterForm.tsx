import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  name: z.string().min(3, "Mínimo 3 caracteres"),
  lastName: z.string().min(3, "Mínimo 3 caracteres"),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export default function RegisterForm({
  onSubmit,
}: {
  onSubmit: (data: RegisterSchemaType) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <div className="relative flex items-center">
          <Input
            placeholder="Nombre"
            type="text"
            {...register("name")}
            className=" py-6 placeholder:text-gray-400"
          />
        </div>
        {errors.name && (
          <p className="text-xs text-destructive mt-1">{errors.name.message}</p>
        )}
      </div>
      <div>
        <div className="relative flex items-center">
          <Input
            placeholder="Apellido"
            type="text"
            {...register("lastName")}
            className="py-6 placeholder:text-gray-400"
          />
        </div>
        {errors.lastName && (
          <p className="text-xs text-destructive mt-1">
            {errors.lastName.message}
          </p>
        )}
      </div>
      {/* email */}
      <div>
        <div className="relative flex items-center">
          <Mail className="absolute left-5 text-gray-400  h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Email"
            type="email"
            {...register("email")}
            className="pl-12 py-6 placeholder:text-gray-400"
          />
        </div>
        {errors.email && (
          <p className="text-xs text-destructive mt-1">
            {errors.email.message}
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
        disabled={isSubmitting}
      >
        {isSubmitting ? "Ingresando…" : "Ingresar"}
      </Button>
    </form>
  );
}
