import type { CategoryResponse } from "./category.type";

export type ProductResponse = {
  id: number;
  codigo: string;
  descripcion: string;
  unidadVenta: string;
  categoriaId: number;
  contenidoUnidad: string;
  infoAdicional: string;
  fotoUrl: string;
  moneda: string;
  tasaImpuesto: number;
  precioVenta: number;
  estado: string;
  categoria: CategoryResponse;
};

export type ProductRequest = {
  codigo: string;
  descripcion: string;
  unidadVenta: string;
  categoriaId: number;
  contenidoUnidad: string;
  infoAdicional: string;
  fotoUrl: string;
  moneda: string;
  tasaImpuesto: number;
  precioVenta: number;
  estado: string;
};
