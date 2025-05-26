import type { JSX } from "react";
import {
  Sidebar as ShadSidebar,
  SidebarContent,
} from "@/components/ui/sidebar";
import { SidebarItem } from "./SidebarItem";
import { SidebarGroups } from "./SidebarGroup";
import { AiOutlineProduct } from "react-icons/ai";
import { useAuthStore } from "@/store/authStore";
import { CirclePercent } from "lucide-react";
import { MdAddShoppingCart } from "react-icons/md";
import { CiGift } from "react-icons/ci";
type SidebarItemType = {
  label: string;
  to?: string;
  icon: JSX.Element;
  children?: SidebarItemType[];
};

const sidebarItems: SidebarItemType[] = [
  {
    label: "Productos",
    icon: <CiGift className="size-5" />,
    to: "/dashboard/products",
  },
  {
    label: "Categorías",
    icon: <AiOutlineProduct className="size-5" />,
    to: "/dashboard/categories",
  },
  {
    label: "Precios",
    icon: <CirclePercent className="size-5" />,
    to: "/dashboard/prices",
  },
  {
    label: "Stock",
    icon: <MdAddShoppingCart className="size-5" />,
    to: "/dashboard/stock",
  },
];

export default function Sidebar() {
  const user = useAuthStore((s) => s.user);
  return (
    <ShadSidebar collapsible="offcanvas" className="bg-white">
      <div className="  flex items-center justify-center p-4">
        <img src="asdas" alt="logo kellekatlin" className="w-44" />
      </div>
      <div className=" mt-5 flex items-center  gap-4 px-4">
        <img
          src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${user?.username}`}
          alt="avatar"
          className="rounded-full w-16 h-16 border-2 border-primary"
        />
        <div className="flex bg-white flex-col items-center justify-center">
          <span className="uppercase text-xl font-semibold text-black">
            {user?.username}
          </span>{" "}
          <p className="text-xs text-black/60">{user?.role}</p>
        </div>
      </div>
      <SidebarContent className="p-4 space-y-3 mt-10   shadow-lg">
        {sidebarItems.map((item) =>
          item.children ? (
            <SidebarGroups
              key={item.label}
              label={item.label}
              icon={item.icon}
              basePath={item.to!}
            >
              {item.children.map((child) => (
                <SidebarItem
                  key={child.label}
                  to={child.to!}
                  label={child.label}
                  icon={child.icon}
                />
              ))}
            </SidebarGroups>
          ) : (
            <SidebarItem
              key={item.label}
              to={item.to!}
              label={item.label}
              icon={item.icon}
            />
          )
        )}
      </SidebarContent>
    </ShadSidebar>
  );
}
