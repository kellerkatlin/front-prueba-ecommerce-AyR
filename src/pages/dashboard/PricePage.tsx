import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  useProducts,
  useSearchProduct,
  useUpdateProductPriceBatch,
} from "@/queries/productQueries";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CrudTable } from "@/components/Table";
import { ArrowUpDown } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import type { ProductResponse } from "@/types/product.type";

export default function PricePage() {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [percentage, setPercentage] = useState(0);
  const { data: currentProduct } = useProducts();
  const { data: currentSearchProduct = [] } = useSearchProduct({
    search: query,
  });
  const { mutate: updateBatch, isPending } = useUpdateProductPriceBatch();

  const products =
    query.length > 0 ? currentSearchProduct : currentProduct ?? [];

  const [selectedMap, setSelectedMap] = useState<
    Record<number, ProductResponse>
  >({});

  const handleSelect = (product: ProductResponse, checked: boolean) => {
    const updated = { ...selectedMap };
    if (checked) {
      updated[product.id] = product;
    } else {
      delete updated[product.id];
    }
    setSelectedMap(updated);
  };

  const selectedIds = Object.keys(selectedMap).map((id) => parseInt(id));

  const columns: ColumnDef<ProductResponse>[] = [
    {
      id: "select",
      header: () => null,
      cell: ({ row }) => {
        const item = row.original;
        const checked = !!selectedMap[item.id];
        return (
          <Checkbox
            checked={checked}
            onCheckedChange={(value) => handleSelect(item, !!value)}
          />
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "codigo",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="pl-0 uppercase"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Código <ArrowUpDown />
        </Button>
      ),
    },
    {
      accessorKey: "descripcion",
      header: "Descripción",
    },
    {
      accessorKey: "precioVenta",
      header: "Precio actual",
      cell: ({ row }) => (
        <span>
          {row.original.moneda} {row.original.precioVenta.toFixed(2)}
        </span>
      ),
    },
    {
      id: "nuevoPrecio",
      header: "Nuevo precio",
      cell: ({ row }) => {
        const item = row.original;
        const isSelected = !!selectedMap[item.id];

        if (!isSelected) return <span className="text-gray-400">—</span>;

        const actual = item.precioVenta;
        const nuevo = actual + actual * (percentage / 100);

        return (
          <span className="text-blue-600 font-semibold">
            {item.moneda} {nuevo.toFixed(2)}
          </span>
        );
      },
    },
  ];

  const handleUpdatePrices = () => {
    const updates = Object.values(selectedMap).map((p) => ({
      id: p.id,
      nuevoPrecio: parseFloat(
        (p.precioVenta + p.precioVenta * (percentage / 100)).toFixed(2)
      ),
    }));

    updateBatch(updates, {
      onSuccess: () => {
        toast({
          title: "Precios actualizados",
          description: `Se actualizaron ${updates.length} productos`,
          variant: "success",
        });
        setSelectedMap({});
      },
      onError: () => {
        toast({
          title: "Error",
          description: "No se pudieron actualizar los precios.",
          variant: "error",
        });
      },
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Modificación Masiva de Precios</h2>

      <div className="flex flex-col md:flex-row md:items-end md:gap-4 gap-4">
        <div className="space-y-1 w-full md:w-1/3">
          <label className="text-sm text-gray-700">Buscar productos</label>
          <Input
            placeholder="Buscar por código, nombre o precio"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-1 w-full md:w-1/3">
          <label className="text-sm text-gray-700">Porcentaje (%)</label>
          <Input
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="w-full md:w-auto">
          <Button
            className="w-full md:w-auto"
            disabled={selectedIds.length === 0 || isPending}
            onClick={handleUpdatePrices}
          >
            Aplicar a seleccionados
          </Button>
        </div>
      </div>

      <CrudTable columns={columns} data={products} isLoading={false} />
    </div>
  );
}
