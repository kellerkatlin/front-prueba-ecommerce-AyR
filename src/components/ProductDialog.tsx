import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCategories } from "@/queries/categoryQueries";
import type { ProductRequest, ProductResponse } from "@/types/product.type";
import { ImageField } from "./ImageUploader";

interface ProductDialogProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly onSubmit?: (data: ProductRequest) => void;
  readonly product?: ProductResponse | null;
  readonly isSubmitting?: boolean;
}

export default function ProductDialog({
  open,
  onOpenChange,
  onSubmit,
  product,
  isSubmitting,
}: ProductDialogProps) {
  const { data: categories = [] } = useCategories();

  const form = useForm<ProductRequest>({
    defaultValues: {
      codigo: "",
      descripcion: "",
      unidadVenta: "",
      contenidoUnidad: "",
      infoAdicional: "",
      fotoUrl: "",
      moneda: "PEN",
      tasaImpuesto: 0,
      precioVenta: 0,
      categoriaId: 0,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (open) {
      reset({
        codigo: product?.codigo ?? "",
        descripcion: product?.descripcion ?? "",
        unidadVenta: product?.unidadVenta ?? "",
        contenidoUnidad: product?.contenidoUnidad ?? "",
        infoAdicional: product?.infoAdicional ?? "",
        fotoUrl: product?.fotoUrl ?? "",
        moneda: product?.moneda ?? "PEN",
        tasaImpuesto: product?.tasaImpuesto ?? 0,
        precioVenta: product?.precioVenta ?? 0,
        categoriaId: product?.categoriaId ?? 0,
      });
    }
  }, [product, open, reset]);

  const handleFormSubmit = (data: ProductRequest) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-white p-16 pb-8">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>
                {product ? "Editar Producto" : "Añadir Producto"}
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <Label>Código</Label>
                <Input
                  {...register("codigo", { required: "Código requerido" })}
                />
                {errors.codigo && (
                  <p className="text-red-500 text-sm">
                    {errors.codigo.message}
                  </p>
                )}
              </div>
              <div className="col-span-6">
                <Label>Descripción</Label>
                <Input
                  {...register("descripcion", {
                    required: "Descripción requerida",
                  })}
                />
                {errors.descripcion && (
                  <p className="text-red-500 text-sm">
                    {errors.descripcion.message}
                  </p>
                )}
              </div>
              <div className="col-span-4">
                <Label>Unidad de venta</Label>
                <Input
                  {...register("unidadVenta", {
                    required: "Campo obligatorio",
                  })}
                />
              </div>
              <div className="col-span-4">
                <Label>Contenido unidad</Label>
                <Input
                  {...register("contenidoUnidad", {
                    required: "Campo obligatorio",
                  })}
                />
              </div>
              <div className="col-span-4">
                <Label>Moneda</Label>
                <Input
                  {...register("moneda", { required: "Campo obligatorio" })}
                />
              </div>
              <div className="col-span-4">
                <Label>Precio venta</Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register("precioVenta", {
                    required: "Campo obligatorio",
                    valueAsNumber: true,
                  })}
                />
              </div>
              <div className="col-span-4">
                <Label>Tasa impuesto (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register("tasaImpuesto", {
                    required: "Campo obligatorio",
                    valueAsNumber: true,
                  })}
                />
              </div>
              <div className="col-span-4">
                <Label>Categoría </Label>
                <Controller
                  control={control}
                  name="categoriaId"
                  render={({ field }) => (
                    <Select
                      value={field.value ? String(field.value) : ""}
                      onValueChange={(val) =>
                        field.onChange(val ? parseInt(val) : null)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría padre" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((cat) => (
                          <SelectItem key={cat.id} value={String(cat.id)}>
                            {cat.descripcion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="col-span-5">
                <ImageField name="fotoUrl" label="Imagen" folder="productos" />
              </div>
              <div className="col-span-7 ">
                <Label>Info adicional</Label>
                <Textarea rows={3} {...register("infoAdicional")} />
              </div>
            </div>

            <DialogFooter>
              <div className="flex gap-4 mt-6">
                <Button className="w-32" type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? product
                      ? "Actualizando..."
                      : "Creando..."
                    : product
                    ? "Actualizar"
                    : "Crear"}
                </Button>
                <Button
                  type="button"
                  className="w-32"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancelar
                </Button>
              </div>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
