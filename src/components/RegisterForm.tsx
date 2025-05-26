import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3, "Mínimo 3 caracteres"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
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
            {...register("username")}
            className=" py-6 placeholder:text-gray-400"
          />
        </div>
        {errors.username && (
          <p className="text-xs text-destructive mt-1">
            {errors.username.message}
          </p>
        )}
      </div>
      <div>
        <div className="relative flex items-center">
          <Input
            placeholder="Apellido"
            type="text"
            {...register("password")}
            className="py-6 placeholder:text-gray-400"
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
