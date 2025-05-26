import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  useSearchProduct,
  useAddStock,
  useProducts,
} from "@/queries/productQueries";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CrudTable } from "@/components/Table";
import { ArrowUpDown } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import type { ProductResponse } from "@/types/product.type";

export default function StockPage() {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [stockMap, setStockMap] = useState<Record<number, number>>({});
  const [selectedMap, setSelectedMap] = useState<
    Record<number, ProductResponse>
  >({});
  const { data: currentProductSearch = [] } = useSearchProduct({
    search: query,
  });
  const { mutate: addStock, isPending } = useAddStock();
  const { data: currentProduct } = useProducts();

  const products =
    query.length > 0 ? currentProductSearch : currentProduct ?? [];
  const handleSelect = (product: ProductResponse, checked: boolean) => {
    const updated = { ...selectedMap };
    if (checked) {
      updated[product.id] = product;
    } else {
      delete updated[product.id];
      delete stockMap[product.id];
    }
    setSelectedMap(updated);
  };

  const handleStockChange = (id: number, value: number) => {
    setStockMap((prev) => ({ ...prev, [id]: value }));
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
            onCheckedChange={(val) => handleSelect(item, !!val)}
          />
        );
      },
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
      id: "stockInput",
      header: "Stock a agregar",
      cell: ({ row }) => {
        const item = row.original;
        const selected = !!selectedMap[item.id];
        return selected ? (
          <Input
            type="number"
            className="w-24"
            value={stockMap[item.id] ?? ""}
            onChange={(e) =>
              handleStockChange(item.id, parseInt(e.target.value || "0"))
            }
          />
        ) : (
          <span className="text-gray-400">—</span>
        );
      },
    },
  ];

  const handleSubmitStock = () => {
    const data = selectedIds.map((id) => ({
      productoId: id,
      cantidad: stockMap[id] ?? 0,
    }));

    addStock(data, {
      onSuccess: () => {
        toast({
          title: "Stock agregado",
          description: `Se actualizó el stock de ${data.length} productos`,
          variant: "success",
        });
        setSelectedMap({});
        setStockMap({});
      },
      onError: () => {
        toast({
          title: "Error",
          description: "No se pudo actualizar el stock.",
          variant: "error",
        });
      },
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Agregar Stock a Productos</h2>

      <div className="flex gap-4 items-end">
        <Input
          placeholder="Buscar productos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-80"
        />
        <Button
          disabled={selectedIds.length === 0 || isPending}
          onClick={handleSubmitStock}
        >
          Aplicar stock
        </Button>
      </div>

      <CrudTable columns={columns} data={products} isLoading={false} />
    </div>
  );
}
