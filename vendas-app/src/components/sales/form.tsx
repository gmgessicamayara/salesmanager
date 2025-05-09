import { Sale, SaleItem } from "app/models/sales";
import { useFormik } from "formik";
import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { useState } from "react";
import { Page } from "app/models/common/page";
import { Customer } from "app/models/customers";
import { Product } from "app/models/products";
import { useCustomerService, useProductService } from "app/services";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";

const formatterToBRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

interface SalesFormProps {
  onSubmit: (sale: Sale) => void;
  initialValues?: Sale;
}
const formSchema: Sale = {
  customer: {},
  itens: [],
  totalPrice: 0,
  paymentMethod: "",
};

export const SalesForm: React.FC<SalesFormProps> = ({ onSubmit }) => {
  const paymentMethods: String[] = ["Money", "Credit Card", "Debit Card"];
  const customerService = useCustomerService();
  const productService = useProductService();
  const [productList, setProductList] = useState<Product[]>([]);
  const [productListFiltered, setProductListFiltered] = useState<Product[]>([]);

  const [productID, setProductID] = useState<string>("");
  const [product, setProduct] = useState<Product>();
  const [message, setMessage] = useState<string>("");
  const [productQuantity, setProductQuantity] = useState<number>(0);
  const [listCustomers, setListCustomers] = useState<Page<Customer>>({
    content: [],
    first: 0,
    size: 0,
    number: 0,
    totalElements: 0,
  });

  const formik = useFormik<Sale>({
    onSubmit,
    initialValues: formSchema,
  });

  const handleCustomerComplete = async (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase();
    customerService
      .find(query, "", 0, 20)
      .then((customers) => setListCustomers(customers));
  };

  const handleCustomerChange = (event: AutoCompleteChangeEvent) => {
    const selectedCustomer = event.value;
    formik.setFieldValue("customer", selectedCustomer);
  };

  const handleProductIDChange = (event) => {
    if (productID) {
      productService
        .getProduct(productID)
        .then((productFound) => setProduct(productFound))
        .catch((error) => {
          setMessage("Product not found!");
          setProduct({});
          setProductID("");
        });
    }
  };

  const handleProductComplete = async (event: AutoCompleteCompleteEvent) => {
    if (!productList.length) {
      const matchingProducts = await productService.listProducts();
      setProductList(matchingProducts);
    }
    const matchingProducts = productList.filter((product: Product) =>
      product.name?.toLowerCase().includes(event.query.toLowerCase())
    );

    setProductListFiltered(matchingProducts);
  };

  const handleAddProduct = () => {
    const addedItems = formik.values.itens;

    const productHasAlreadyBeenAdded = addedItems?.some((si: SaleItem) => {
      return si.product.id === product?.id;
    });

    if (productHasAlreadyBeenAdded) {
      addedItems?.forEach((si: SaleItem) => {
        if (si.product.id === product?.id) {
          si.quantity = si.quantity + productQuantity;
        }
      });
    } else {
      addedItems?.push({
        product: product ?? ({} as Product),
        quantity: productQuantity ?? 0,
      });
    }

    setProduct({});
    setProductID("");
    setProductQuantity(0);
    const total = totalPrice();
    formik.setFieldValue("totalPrice", total);
  };

  const totalPrice = () => {
    const total: number[] = (formik.values.itens ?? []).map(
      (si) => si.quantity * (si.product.price ?? 0)
    );
    if (total.length) {
      return total.reduce((acc = 0, curr) => acc + curr);
    } else {
      return 0;
    }
  };

  const disableAddProductButton = () => {
    return !product || !productQuantity;
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="customer">Customer: *</label>
          <AutoComplete
            id="customer"
            name="customer"
            value={formik.values.customer}
            field="name"
            onChange={handleCustomerChange}
            completeMethod={handleCustomerComplete}
            suggestions={listCustomers.content}
          />
        </div>

        <br />
        <div className="grid">
          <div className="col-2">
            <span className="p-float-label">
              <InputText
                id="productID"
                value={productID}
                onChange={(e) => setProductID(e.target.value)}
                onBlur={handleProductIDChange}
              />
              <label htmlFor="productID">Product code: *</label>
            </span>
          </div>
          <div className="col-6">
            <div className="p-filed">
              <AutoComplete
                suggestions={productListFiltered}
                id="product"
                completeMethod={handleProductComplete}
                onChange={(e) => setProduct(e.value)}
                value={product}
                field="name"
              />
            </div>
          </div>
          <div className="col-2">
            <div className="p-filed">
              <span className="p-float-label">
                <InputText
                  id="productQTD"
                  value={
                    productQuantity !== undefined ? String(productQuantity) : ""
                  }
                  onChange={(e) => setProductQuantity(parseInt(e.target.value))}
                />
                <label htmlFor="productQTD">Quantity: *</label>
              </span>
            </div>
          </div>
          <div className="col-2">
            <div className="p-filed">
              <Button
                label="Add"
                type="button"
                onClick={handleAddProduct}
                disabled={disableAddProductButton()}
              />
            </div>
          </div>
          <div className="column is-fullwidth">
            <DataTable value={formik.values.itens} dataKey="product.id">
              <Column field="product.id" header="ID" />
              <Column field="product.sku" header="SKU" />
              <Column field="product.name" header="Product" />
              <Column field="product.price" header="Unit Price" />
              <Column field="quantity" header="QTD" />
              <Column
                field="total"
                header="Total"
                body={(si: SaleItem) => {
                  const total = (si.product.price ?? 0) * si.quantity;
                  return <div>{formatterToBRL.format(total)}</div>;
                }}
              />
            </DataTable>
          </div>
        </div>
        <div className="grid">
          <div className="col-5">
            <div className="p-field">
              <label htmlFor="paymentMethod">Payment Method: *</label>
              <Dropdown
                id="paymentMethod"
                options={paymentMethods}
                value={formik.values.paymentMethod}
                onChange={(e) => formik.setFieldValue("paymentMethod", e.value)}
                placeholder="Select a payment method"
              />
            </div>
          </div>

          <div className="col-3">
            <div className="p-field">
              <label htmlFor="itens">Itens</label>
              <InputText
                disabled
                value={
                  formik.values.itens?.length
                    ? formik.values.itens.length.toString()
                    : "0"
                }
                id="items"
              />
            </div>
          </div>

          <div className="col-4">
            <div className="p-field">
              <label htmlFor="total">Total</label>
              <InputText
                disabled
                value={
                  formik.values.totalPrice !== undefined
                    ? String(formatterToBRL.format(formik.values.totalPrice))
                    : ""
                }
                id="total"
              />
            </div>
          </div>
        </div>
        <br />
        <Button type="submit" label="Done" />
      </div>
      <Dialog
        position="top"
        header="Warning"
        onHide={() => setMessage("")}
        visible={!!message}
        modal={true}
      >
        {" "}
        {message}
      </Dialog>
    </form>
  );
};
