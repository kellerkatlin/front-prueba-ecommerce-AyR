import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { JSX } from "react";
import { useSidebar } from "./ui/sidebar";

interface SidebarItemProps {
  readonly to: string;
  readonly label: string;
  readonly icon: JSX.Element;
}

export function SidebarItem({ to, label, icon }: SidebarItemProps) {
  const location = useLocation();
  const active = location.pathname === to;
  const { isMobile, setOpenMobile } = useSidebar();

  const handleClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };
  return (
    <Link
      to={to}
      onClick={handleClick}
      className={cn(
        "flex items-center  px-5 py-2 gap-2 rounded-2xl text-black text-sm font-normal",
        active ? "bg-background" : " hover:text-primary"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
