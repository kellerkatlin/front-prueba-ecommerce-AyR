import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { FaFileCirclePlus } from "react-icons/fa6";

interface ToolBarProps {
  readonly title: string;
  readonly name?: string;
  readonly onSearch?: (value: string) => void;
  readonly onAdd?: () => void;
}
export default function ToolBar({ title, onAdd, onSearch }: ToolBarProps) {
  return (
    <div className="space-y-4 pb-6">
      <h1 className="text-xl uppercase font-semibold">{title}</h1>

      <div className="flex  justify-between items-center gap-4">
        <div className="relative flex items-center  w-full">
          <Search className="absolute left-2.5 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por código, nombre o correo"
            className="pl-8 bg-white"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            className="flex justify-center items-center"
            onClick={() => onAdd && onAdd()}
          >
            <FaFileCirclePlus />
          </Button>
        </div>
      </div>
    </div>
  );
}
