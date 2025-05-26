import { useRef, useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

interface ImageFieldProps {
  name: string; // nombre del campo en el form (ej. 'imagenUrl')
  label: string; // etiqueta a mostrar (ej. 'Imagen')
  folder: string; // carpeta en Cloudinary (ej. 'productos', 'categorias')
}

export function ImageField({ name, label, folder }: ImageFieldProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageUrl = watch(name);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(imageUrl ?? null);
  useEffect(() => {
    if (imageUrl) setPreview(imageUrl);
  }, [imageUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(null);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("folder", folder);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setPreview(data.secure_url);
      setValue(name, data.secure_url, { shouldValidate: true });
    } catch (error) {
      console.error("Error al subir imagen:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-1">
      <Label>{label}</Label>

      <div
        className="w-1/2 aspect-square border border-dashed rounded-md flex items-center justify-center overflow-hidden cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <img
            src={preview}
            alt="Imagen subida"
            className="w-full h-full object-cover"
          />
        ) : uploading ? (
          <p className="text-blue-500 text-sm text-center">
            Subiendo imagen...
          </p>
        ) : (
          <p className="text-gray-400 text-center text-sm">
            Haz clic para subir imagen
          </p>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Campo oculto para validar imagen */}
      <input
        type="hidden"
        {...register(name, { required: `${label} requerida` })}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {(errors[name] as any)?.message}
        </p>
      )}
    </div>
  );
}
