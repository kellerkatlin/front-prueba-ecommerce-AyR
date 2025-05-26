import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  const handleLogin = async (data: any) => {
    console.log("Login data:", data);
  };
  return (
    <>
      <h1 className="text-2xl font-bold mb-1 ">Registro</h1>
      <p className="mb-6 text-sm">Registra tu cuenta</p>

      <RegisterForm onSubmit={handleLogin} />
    </>
  );
}
