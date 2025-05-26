import api from "@/lib/axios";
import type { CategoryRequest, CategoryResponse } from "@/types/category.type";

const API_URL = "/categories";

export const getCategories = async () => {
  const res = await api.get(`${API_URL}`);
  return res.data;
};
export const getCategory = async (id: string) => {
  const res = await api.get(`${API_URL}/${id}`);
  return res.data;
};

export const searchCategory = async (params: {
  search: string;
}): Promise<CategoryResponse[]> => {
  const res = await api.get<CategoryResponse[]>(`${API_URL}/search`, {
    params,
  });
  return res.data;
};

export const createCategory = async (product: CategoryRequest) => {
  const res = await api.post(`${API_URL}`, product);
  return res.data;
};

export const updateCategory = async (id: string, product: CategoryRequest) => {
  const res = await api.patch(`${API_URL}/${id}`, product);
  return res.data;
};

export const deleteCategory = async (id: string) => {
  const res = await api.delete(`${API_URL}/${id}`);
  return res.data;
};

export const toogleCategoryStatus = async (id: string) => {
  const res = await api.patch(`${API_URL}/${id}/toggle-status`);
  return res.data;
};
