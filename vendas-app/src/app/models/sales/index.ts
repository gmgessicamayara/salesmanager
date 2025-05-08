import { Customer } from "../customers";
import { Product } from "../products";
export interface Sale {
  id?: string;
  customer?: Customer;
  itens?: Array<SaleItem>;
  paymentMethod?: string;
  totalPrice?: number;
}

export interface SaleItem {
  product: Product;
  quantity: number;
}
