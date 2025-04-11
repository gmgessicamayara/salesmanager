import { httpClient } from 'app/http';
import { Product } from 'app/models/products';
import { Axios, AxiosResponse } from 'axios';
const resourceURL: string = '/api/products';

export const useProductService = () => {
  const save = async (product: Product): Promise<Product> => {
    const response: AxiosResponse<Product> = await httpClient.post<Product>(
      resourceURL,
      product
    );
    return response.data;
  };

  const update = async (product: Product): Promise<void> => {
    const url: string = `${resourceURL}/${product.id}`;
    await httpClient.put<Product>(url, product);
  };

  const getProduct = async (id): Promise<Product> => {
    const url: string = `${resourceURL}/${id}`;
    const response: AxiosResponse<Product> = await httpClient.get(url);
    return response.data;
  };

  return {
    save,
    update,
    getProduct,
  };
};
