import { httpClient } from "app/http";
import { Product } from "app/models/products";
import { Axios, AxiosResponse } from "axios";
const resourceURL: string = "/api/products";

export const useProductService = () => {
  const saveProduct = async (product: Product): Promise<Product> => {
    const response: AxiosResponse<Product> = await httpClient.post<Product>(
      resourceURL,
      product
    );
    return response.data;
  };

  const updateProduct = async (product: Product): Promise<void> => {
    const url: string = `${resourceURL}/${product.id}`;
    await httpClient.put<Product>(url, product);
  };

  const getProduct = async (id): Promise<Product> => {
    const url: string = `${resourceURL}/${id}`;
    const response: AxiosResponse<Product> = await httpClient.get(url);
    return response.data;
  };

  const deleteProduct = async (id): Promise<void> => {
    const url: string = `${resourceURL}/${id}`;
    await httpClient.delete(url);
  };

  const listProducts = async (): Promise<Product[]> => {
    const response: AxiosResponse<Product[]> = await httpClient.get(
      resourceURL
    );
    return response.data;
  };

  return {
    saveProduct,
    updateProduct,
    getProduct,
    listProducts,
    deleteProduct,
  };
};
