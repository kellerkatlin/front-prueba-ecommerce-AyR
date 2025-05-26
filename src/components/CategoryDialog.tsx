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
import type { CategoryRequest, CategoryResponse } from "@/types/category.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useCategories } from "@/queries/categoryQueries";
import { ImageField } from "./ImageUploader";

interface CategoryDialogProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly onSubmit?: (data: CategoryRequest) => void;
  readonly category?: CategoryResponse | null;
  readonly isSubmitting?: boolean;
}

export default function CategoryDialog({
  open,
  onOpenChange,
  onSubmit,
  category,
  isSubmitting,
}: CategoryDialogProps) {
  const { data: subcategoriesOptions = [] } = useCategories();
  const subcategories = subcategoriesOptions.filter(
    (cat) => cat.id !== category?.id && cat.categoriaPadreId === null
  );

  const form = useForm<CategoryRequest>({
    defaultValues: {
      codigo: "",
      tipo: "",
      descripcion: "",
      imagenUrl: "",
      estado: "A",
      categoriaPadreId: null,
    },
  });

  const {
    register,
    reset,
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (open) {
      if (category) {
        reset({
          codigo: category.codigo,
          tipo: category.tipo,
          descripcion: category.descripcion,
          imagenUrl: category.imagenUrl,
          estado: category.estado,
          categoriaPadreId: category.categoriaPadreId ?? null,
        });
      } else {
        reset({
          codigo: "",
          tipo: "",
          descripcion: "",
          imagenUrl: "",
          estado: "A",
          categoriaPadreId: null,
        } as CategoryRequest);
      }
    }
  }, [category, open, reset]);

  const handleFormSubmit = (data: CategoryRequest) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl bg-white p-10 pb-6">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-4"
          >
            <DialogHeader>
              <DialogTitle>
                {category ? "Editar Categoría" : "Añadir Categoría"}
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
                <Label>Tipo</Label>
                <Input {...register("tipo", { required: "Tipo requerido" })} />
                {errors.tipo && (
                  <p className="text-red-500 text-sm">{errors.tipo.message}</p>
                )}
              </div>
              <div className="col-span-12">
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
              <div className="col-span-6">
                <ImageField
                  name="imagenUrl"
                  label="Imagen"
                  folder="categorias"
                />
              </div>

              <div className="col-span-6">
                <Label>Categoría</Label>
                <Controller
                  control={control}
                  name="categoriaPadreId"
                  render={({ field }) => (
                    <Select
                      value={field.value ? String(field.value) : ""}
                      onValueChange={(val) =>
                        field.onChange(val ? parseInt(val) : null)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una sub categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {subcategories?.map((cat) => (
                          <SelectItem key={cat.id} value={String(cat.id)}>
                            {cat.descripcion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <div className="flex gap-4 mt-6">
                <Button className="w-32" type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? category
                      ? "Actualizando..."
                      : "Creando..."
                    : category
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
