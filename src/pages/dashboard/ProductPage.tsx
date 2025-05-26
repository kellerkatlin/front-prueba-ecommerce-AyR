import { useToast } from "@/hooks/use-toast";
import {
  useCreateProduct,
  useProducts,
  useSearchProduct,
  useToogleProductStatus,
  useUpdateProduct,
} from "@/queries/productQueries";
import { GoDotFill } from "react-icons/go";

import type { ColumnDef } from "@tanstack/react-table";
import type { ProductRequest, ProductResponse } from "@/types/product.type";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { BsCartCheckFill, BsFillCartXFill } from "react-icons/bs";
import ProductDialog from "@/components/ProductDialog";
import ToolBar from "@/components/ToolBar";
import { CrudTable } from "@/components/Table";
import ConfirmAlert from "@/components/ConfirmAlert";
import { FaFilePen } from "react-icons/fa6";

export default function ProductPage() {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [edit, setEdit] = useState<ProductResponse | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ProductResponse>();
  const { mutate: createProduct, isPending: isSaving } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const { mutate: toogleProductStatus, isPending: isDeleting } =
    useToogleProductStatus();
  const { data: searchData } = useSearchProduct(
    { search: query },
    {
      queryKey: ["searchProduct", query],
      enabled: !!query,
    }
  );

  const { data, isLoading, isSuccess } = useProducts();
  const products = query.length > 0 ? searchData ?? [] : data ?? [];
  const loading = query ? !searchData : isLoading;

  useEffect(() => {
    if (isSuccess && data) {
      toast({
        title: "Productos cargados",
        description: `Se han cargado ${data.length} productos.`,
        duration: 2000,
        variant: "success",
      });
    }
  }, [isSuccess, data, toast]);

  const columns: ColumnDef<ProductResponse>[] = [
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
      accessorKey: "unidadVenta",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="pl-0 uppercase"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Unidad de Venta <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex justify-center">
            <span>{item.unidadVenta}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "precioVenta",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="pl-0 uppercase"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Precio Venta
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex justify-center">
            <span className="text-gray-700">
              {item.moneda} {item.precioVenta}
            </span>
          </div>
        );
      },
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
                <span className="text-green-700">Disponible</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-red-100 px-2 rounded-2xl">
                <GoDotFill className="size-3 text-red-500" />
                <span className="text-red-700">No disponible</span>
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
              <FaFilePen className="size-5" strokeWidth={2.4} />
            </button>
            <button
              onClick={() => {
                setItemToDelete(item);
                setDeleteDialogOpen(true);
              }}
            >
              {item.estado === "A" ? (
                <BsFillCartXFill className="size-5 text-red-500" />
              ) : (
                <BsCartCheckFill className="size-5 text-green-500" />
              )}
            </button>
          </div>
        );
      },
    },
  ];

  const onSubmit = (data: ProductRequest) => {
    if (edit) {
      updateProduct(
        { id: edit.id.toString(), data },
        {
          onSuccess: () => {
            toast({
              title: "Producto actualizado",
              description: `El producto ${data.codigo} ha sido actualizado.`,
              duration: 2000,
              variant: "success",
            });
            setDialogOpen(false);
          },
          onError: () => {
            toast({
              title: "Error",
              description: `No se pudo actualizar el producto ${data.codigo}.`,
              duration: 2000,
              variant: "error",
            });
            setDialogOpen(false);
          },
        }
      );
    } else {
      createProduct(data, {
        onSuccess: () => {
          toast({
            title: "Producto creado",
            description: `El producto ${data.codigo} ha sido creado.`,

            duration: 2000,
            variant: "success",
          });
          setDialogOpen(false);
        },
        onError: () => {
          toast({
            title: "Error",
            description: ` No se pudo crear el producto ${data.codigo}.`,
            duration: 2000,
            variant: "error",
          });
          setDialogOpen(false);
        },
      });
    }
  };

  const handleDelete = (id: number) => {
    toogleProductStatus(id.toString(), {
      onSuccess: () => {
        toast({
          title: "Producto eliminado",
          description: `El producto ha sido eliminado.`,

          duration: 2000,
          variant: "success",
        });
        setDeleteDialogOpen(false);
      },
      onError: () => {
        toast({
          title: "Error",
          description: `No se pudo eliminar la carrera.`,
          duration: 2000,
          variant: "error",
        });
        setDeleteDialogOpen(false);
      },
    });
  };

  return (
    <div>
      <ProductDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEdit(null);
        }}
        onSubmit={onSubmit}
        product={edit}
        isSubmitting={isSaving || isUpdating}
      />
      <ToolBar
        title=" Productos"
        name="producto"
        onSearch={setQuery}
        onAdd={() => {
          setDialogOpen(true);
          setEdit(null);
        }}
      />
      <CrudTable
        columns={columns}
        data={products}
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
