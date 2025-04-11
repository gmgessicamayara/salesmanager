import { Layout, Loader } from 'components';
import Link from 'next/link';
import { ProductsTable } from './table';
import { Product } from 'app/models/products';
import useSWR from 'swr';
import { httpClient } from 'app/http';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';

export const ProductList: React.FC = () => {
  const { data: result, error } = useSWR<AxiosResponse<Product[]>>(
    '/api/products',
    (url) => httpClient.get(url)
  );

  const router = useRouter();
  const editProduct = (product: Product) => {
    const url = `/catalogs/products?id=${product.id}`;
    router.push(url);
  };

  const deleteProduct = (product: Product) => {
    console.log(product);
  };

  return (
    <Layout titulo='Products'>
      <Link href='/catalogs/products'>
        <button className='button is-link'>New</button>
        <br />
      </Link>
      <br /> <br />
      <Loader show={!result} />
      <ProductsTable
        onDelete={deleteProduct}
        onEdit={editProduct}
        products={result?.data || []}
      />
    </Layout>
  );
};
