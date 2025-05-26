export type CategoryResponse = {
  id: number;
  codigo: string;
  tipo: string;
  descripcion: string;
  imagenUrl: string;
  estado: string;
  categoriaPadreId?: number | null;
};

export type CategoryRequest = {
  codigo: string;
  tipo: string;
  descripcion: string;
  imagenUrl: string;
  estado: string;
  categoriaPadreId?: number | null;
};
