import { httpClient } from "app/http";
import { Customer } from "app/models/customers";
import { AxiosResponse } from "axios";
import { Page } from "app/models/common/page";
const resourceURL: string = "/api/customers";

export const useCustomerService = () => {
  const saveCustomer = async (customer: Customer): Promise<Customer> => {
    const response: AxiosResponse<Customer> = await httpClient.post<Customer>(
      resourceURL,
      customer
    );
    return response.data;
  };

  const updateCustomer = async (customer: Customer): Promise<void> => {
    const url: string = `${resourceURL}/${customer.id}`;
    await httpClient.put<Customer>(url, customer);
  };

  const getCustomer = async (id): Promise<Customer> => {
    const url: string = `${resourceURL}/${id}`;
    const response: AxiosResponse<Customer> = await httpClient.get(url);
    return response.data;
  };

  const deleteCustomer = async (id): Promise<void> => {
    const url: string = `${resourceURL}/${id}`;
    await httpClient.delete(url);
  };

  const find = async (
    name: string = "",
    cpf: string = "",
    page: number = 0,
    size: number = 5
  ): Promise<Page<Customer>> => {
    const url: string = `${resourceURL}?name=${name}&cpf=${cpf}&page=${page}&size=${size}`;
    const response: AxiosResponse<Page<Customer>> = await httpClient.get(url);
    return response.data;
  };

  return {
    saveCustomer,
    updateCustomer,
    getCustomer,
    find,
    deleteCustomer,
  };
};
