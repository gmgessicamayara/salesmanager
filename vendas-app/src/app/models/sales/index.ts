import { Customer } from "../customers";
import { Product } from "../products";
export interface Sale {
  id?: string;
  customer?: Customer;
  products?: Array<Product>;
  paymentMethod?: string;
  totalPrice?: number;
}
