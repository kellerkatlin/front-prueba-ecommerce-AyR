import api from "@/lib/axios";
import type { ProductRequest, ProductResponse } from "@/types/product.type";

const API_URL = "/products";

export const getProducts = async () => {
  const res = await api.get(`${API_URL}`);
  return res.data;
};
export const getProduct = async (id: string) => {
  const res = await api.get(`${API_URL}/${id}`);
  return res.data;
};

export const searchProduct = async (params: {
  search: string;
}): Promise<ProductResponse[]> => {
  const res = await api.get<ProductResponse[]>(`${API_URL}/search`, { params });
  return res.data;
};

export const createProduct = async (product: ProductRequest) => {
  const res = await api.post(`${API_URL}`, product);
  return res.data;
};

export const updateProduct = async (id: string, product: ProductRequest) => {
  const res = await api.patch(`${API_URL}/${id}`, product);
  return res.data;
};

export const deleteProduct = async (id: string) => {
  const res = await api.delete(`${API_URL}/${id}`);
  return res.data;
};

export const toogleProductStatus = async (id: string) => {
  const res = await api.patch(`${API_URL}/${id}/toggle-status`);
  return res.data;
};

export const updateProductPriceBatch = async (
  updates: { id: number; nuevoPrecio: number }[]
) => {
  const res = await api.put(`${API_URL}/update-prices`, updates);
  return res.data;
};

export const addStock = async (
  data: { productoId: number; cantidad: number }[]
) => {
  const res = await api.post(`${API_URL}/add-stock`, data);
  return res.data;
};
