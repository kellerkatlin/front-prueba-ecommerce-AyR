import { useNavigate } from "react-router-dom";
import { useLogin } from "@/queries/authQueires";
import type { UserRequest } from "@/types/auth.type";
import LoginForm from "@/components/LoginForm";
export default function LoginPage() {
  const navigate = useNavigate();
  const { mutate: login, isPending, isError } = useLogin();

  const handleLogin = async (data: UserRequest) => {
    login(data, {
      onSuccess: () => {
        navigate("/dashboard");
      },
      onError: () => {
        console.error("Error logging in:");
      },
    });
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-1 ">¡Hola!</h1>
      <p className="mb-6 text-sm">Inicia sesión en tu cuenta</p>

      <LoginForm onSubmit={handleLogin} isPending={isPending} />

      {isError && (
        <p className="text-sm text-destructive mt-4">Error al iniciar sesión</p>
      )}
    </>
  );
}
