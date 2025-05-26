import {
  addStock,
  createProduct,
  deleteProduct,
  getProducts,
  searchProduct,
  toogleProductStatus,
  updateProduct,
  updateProductPriceBatch,
} from "@/api/productService";
import {
  type ProductRequest,
  type ProductResponse,
} from "@/types/product.type";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery<ProductResponse[]>({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<ProductResponse, Error, ProductRequest>({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useSearchProduct = (
  params: { search: string },
  options?: UseQueryOptions<ProductResponse[]>
) => {
  return useQuery<ProductResponse[]>({
    queryKey: ["product-search", params],
    queryFn: () => searchProduct(params),
    enabled: !!params.search,
    ...options,
  });
};

export const useToogleProductStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<ProductResponse, Error, string>({
    mutationFn: (id) => toogleProductStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Error toggling product status:", error);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ProductResponse,
    Error,
    { id: string; data: ProductRequest }
  >({
    mutationFn: ({ id, data }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Error updating career:", error);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });
};

export const useUpdateProductPriceBatch = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: number; nuevoPrecio: number }[]>({
    mutationFn: (updates) => updateProductPriceBatch(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Error updating product price batch:", error);
    },
  });
};

// productQueries.ts
export const useAddStock = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { productoId: number; cantidad: number }[]>({
    mutationFn: (data) => addStock(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Error adding stock:", error);
    },
  });
};
