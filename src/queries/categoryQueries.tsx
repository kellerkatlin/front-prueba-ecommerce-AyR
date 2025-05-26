import {
  createCategory,
  getCategories,
  searchCategory,
  toogleCategoryStatus,
  updateCategory,
} from "@/api/categoryService";
import {
  type CategoryRequest,
  type CategoryResponse,
} from "@/types/category.type";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";

export const useCategories = () => {
  return useQuery<CategoryResponse[]>({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<CategoryResponse, Error, CategoryRequest>({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useSearchCategory = (
  params: { search: string },
  options?: UseQueryOptions<CategoryResponse[]>
) => {
  return useQuery<CategoryResponse[]>({
    queryKey: ["category-search", params],
    queryFn: () => searchCategory(params),
    enabled: !!params.search,
    ...options,
  });
};

export const useToogleCategoryStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<CategoryResponse, Error, string>({
    mutationFn: (id) => toogleCategoryStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.error("Error toggling category status:", error);
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CategoryResponse,
    Error,
    { id: string; data: CategoryRequest }
  >({
    mutationFn: ({ id, data }) => updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.error("Error updating category:", error);
    },
  });
};
