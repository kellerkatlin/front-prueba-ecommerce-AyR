import { LogOut, Menu } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLogout } from "@/queries/authQueires";
import { useAuthStore } from "@/store/authStore";

export default function Header() {
  const user = useAuthStore((s) => s.user);
  const { mutate: logout, isPending } = useLogout();
  const { toggleSidebar } = useSidebar();
  return (
    <header className="flex items-center justify-between h-16 px-6 border-b bg-white">
      <button onClick={toggleSidebar}>
        <Menu className="w-6 h-6" />
      </button>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className=" flex items-center gap-2 cursor-pointer">
              <img
                src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${user?.username}`}
                alt="avatar"
                className="rounded-full size-10 border-2 border-primary"
              />
              <div>
                <span className="text-sm mr-2 font-semibold">
                  {user?.username}
                </span>
                <p className="text-xs text-muted-foreground">{user?.role}</p>
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log("perfil")}>
              <img
                src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${user?.username}`}
                alt="avatar"
                className="rounded-full size-10 border-2 border-primary"
              />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => logout()}>
              <LogOut className="w-4 h-4 mr-2" />
              {isPending ? "Saliendo..." : "Cerrar sesión"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
