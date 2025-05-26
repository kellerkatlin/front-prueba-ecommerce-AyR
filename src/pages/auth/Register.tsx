import RegisterForm from "@/components/RegisterForm";
import { useRegister } from "@/queries/authQueires";
import type { UserRequest } from "@/types/auth.type";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { mutate: register } = useRegister();

  const handleLogin = async (data: UserRequest) => {
    register(data, {
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
      <h1 className="text-2xl font-bold mb-1 ">Registro</h1>
      <p className="mb-6 text-sm">Registra tu cuenta</p>

      <RegisterForm onSubmit={handleLogin} />
    </>
  );
}
