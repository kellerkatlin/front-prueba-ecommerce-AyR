import { useState, type JSX } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { Minus, Plus } from "lucide-react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
interface SidebarGroupProps {
  readonly label: string;
  readonly icon: JSX.Element;
  readonly children: React.ReactNode;
  readonly basePath: string;
}

export function SidebarGroups({
  label,
  icon,
  children,
  basePath,
}: SidebarGroupProps) {
  const location = useLocation();
  const isChildActive = location.pathname.startsWith(basePath);

  const [open, setOpen] = useState(() => isChildActive);
  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="group/collapsible"
    >
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger
            className={cn(
              "flex items-center font-bold w-full justify-between  rounded-2xl   px-3 py-2 gap-2  text-left text-sm ",
              isChildActive
                ? "bg-background    text-black"
                : "text-black hover:text-primary"
            )}
          >
            <div className="flex text-sm text-black font-normal items-center gap-2">
              {icon}
              {label}
            </div>
            {open ? (
              <Minus className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent className="pl-6 pt-1 overflow-hidden transition-all duration-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <SidebarGroupContent>{children}</SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
