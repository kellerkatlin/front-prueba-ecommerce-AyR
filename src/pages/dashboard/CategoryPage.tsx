import { useToast } from "@/hooks/use-toast";
import {
  useCategories,
  useCreateCategory,
  useSearchCategory,
  useToogleCategoryStatus,
  useUpdateCategory,
} from "@/queries/categoryQueries";
import { GoDotFill } from "react-icons/go";

import type { ColumnDef } from "@tanstack/react-table";
import type { CategoryRequest, CategoryResponse } from "@/types/category.type";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import CategoryDialog from "@/components/CategoryDialog";
import ToolBar from "@/components/ToolBar";
import { CrudTable } from "@/components/Table";
import ConfirmAlert from "@/components/ConfirmAlert";
import { FaFilePen } from "react-icons/fa6";

export default function CategoryPage() {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [edit, setEdit] = useState<CategoryResponse | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<CategoryResponse>();
  const { mutate: createCategory, isPending: isSaving } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
  const { mutate: toogleCategoryStatus, isPending: isDeleting } =
    useToogleCategoryStatus();
  const { data: searchData } = useSearchCategory(
    { search: query },
    {
      queryKey: ["searchCategory", query],
      enabled: !!query,
    }
  );

  const { data, isLoading, isSuccess } = useCategories();
  const categories = query.length > 0 ? searchData ?? [] : data ?? [];
  const loading = query ? !searchData : isLoading;

  useEffect(() => {
    if (isSuccess && data) {
      toast({
        title: "Categorías cargadas",
        description: `Se han cargado ${data.length} categorías.`,
        duration: 2000,
        variant: "success",
      });
    }
  }, [isSuccess, data, toast]);

  const columns: ColumnDef<CategoryResponse>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex justify-center w-13">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center w-13">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(v) => row.toggleSelected(!!v)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "codigo",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="pl-0 uppercase"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Código
          <ArrowUpDown />
        </Button>
      ),
    },
    {
      accessorKey: "descripcion",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="pl-0 uppercase"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descripción <ArrowUpDown />
        </Button>
      ),
    },
    {
      accessorKey: "tipo",
      header: "Tipo",
    },
    {
      accessorKey: "estado",
      enableSorting: false,
      header: () => <div className="text-center uppercase">Estado</div>,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex justify-start">
            {item.estado === "A" ? (
              <div className="flex items-center gap-1 bg-green-100 px-2 rounded-2xl">
                <GoDotFill className="size-3 text-green-500" />
                <span className="text-green-700">Activa</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-red-100 px-2 rounded-2xl">
                <GoDotFill className="size-3 text-red-500" />
                <span className="text-red-700">Inactiva</span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      id: "acciones",
      header: "Acciones",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex gap-2.5">
            <button
              className="text-green-500 hover:text-green-400"
              onClick={() => {
                setEdit(item);
                setDialogOpen(true);
              }}
            >
              <FaFilePen className="size-5" />
            </button>
            <button
              onClick={() => {
                setItemToDelete(item);
                setDeleteDialogOpen(true);
              }}
            >
              {item.estado === "A" ? (
                <BsFillEyeSlashFill className="size-5 text-red-500" />
              ) : (
                <BsFillEyeFill className="size-5 text-green-500" />
              )}
            </button>
          </div>
        );
      },
    },
  ];

  const onSubmit = (data: CategoryRequest) => {
    if (edit) {
      updateCategory(
        { id: edit.id.toString(), data },
        {
          onSuccess: () => {
            toast({
              title: "Categoría actualizada",
              description: `La categoría ${data.codigo} ha sido actualizada.`,
              duration: 2000,
              variant: "success",
            });
            setDialogOpen(false);
          },
          onError: () => {
            toast({
              title: "Error",
              description: `No se pudo actualizar la categoría ${data.codigo}.`,
              duration: 2000,
              variant: "error",
            });
            setDialogOpen(false);
          },
        }
      );
    } else {
      createCategory(data, {
        onSuccess: () => {
          toast({
            title: "Categoría creada",
            description: `La categoría ${data.codigo} ha sido creada.`,
            duration: 2000,
            variant: "success",
          });
          setDialogOpen(false);
        },
        onError: () => {
          toast({
            title: "Error",
            description: `No se pudo crear la categoría ${data.codigo}.`,
            duration: 2000,
            variant: "error",
          });
          setDialogOpen(false);
        },
      });
    }
  };

  const handleDelete = (id: number) => {
    toogleCategoryStatus(id.toString(), {
      onSuccess: () => {
        toast({
          title: "Categoría actualizada",
          description: `El estado de la categoría ha sido modificado.`,
          duration: 2000,
          variant: "success",
        });
        setDeleteDialogOpen(false);
      },
      onError: () => {
        toast({
          title: "Error",
          description: `No se pudo cambiar el estado de la categoría.`,
          duration: 2000,
          variant: "error",
        });
        setDeleteDialogOpen(false);
      },
    });
  };

  return (
    <div>
      <CategoryDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEdit(null);
        }}
        onSubmit={onSubmit}
        category={edit}
        isSubmitting={isSaving || isUpdating}
      />
      <ToolBar
        title="Categorías"
        name="categoría"
        onSearch={setQuery}
        onAdd={() => {
          setDialogOpen(true);
          setEdit(null);
        }}
      />
      <CrudTable
        columns={columns}
        data={categories}
        isLoading={loading}
        getRowClass={(item) => (item.estado !== "A" ? "bg-red-50" : "")}
      />
      <ConfirmAlert
        open={deleteDialogOpen}
        title="¿Estás seguro?"
        message="Esta acción no se puede deshacer."
        onCancel={() => setDeleteDialogOpen(false)}
        onConfirm={() => {
          if (itemToDelete) {
            handleDelete(itemToDelete.id);
          }
        }}
        isLoading={isDeleting}
      />
    </div>
  );
}
