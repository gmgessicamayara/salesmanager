import { Layout, Loader } from "components";
import Link from "next/link";
import { ProductsTable } from "./table";
import { Product } from "app/models/products";
import useSWR from "swr";
import { httpClient } from "app/http";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useProductService } from "app/services";
import { useEffect, useState } from "react";
import { Alert } from "app/models/common/message";

export const ProductList: React.FC = () => {
  const router = useRouter();
  const service = useProductService();
  const [messages, setMessages] = useState<Array<Alert>>([]);

  const { data: result, error } = useSWR<AxiosResponse<Product[]>>(
    "/api/products",
    (url) => httpClient.get(url)
  );

  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    setProductList(result?.data || []);
  }, [result]);

  const editProduct = (product: Product) => {
    const url = `/catalogs/products?id=${product.id}`;
    router.push(url);
  };

  const deleteProduct = (product: Product) => {
    service.deleteProduct(product.id).then((response) => {
      setMessages([{ type: "success", text: "Product deleted successfully." }]);
    });
    const modifiedList: Product[] = productList?.filter(
      (p) => p.id !== product.id
    );
    setProductList(modifiedList);
  };

  return (
    <Layout title="Products" messages={messages}>
      <Link href="/catalogs/products">
        <button className="button is-link is-success">New</button>
        <br />
      </Link>
      <br /> <br />
      <Loader show={!result} />
      <ProductsTable
        onDelete={deleteProduct}
        onEdit={editProduct}
        products={productList}
      />
    </Layout>
  );
};
