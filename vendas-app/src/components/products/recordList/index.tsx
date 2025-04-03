import { Layout, Loader } from 'components';
import Link from 'next/link';
import { ProductsTable } from './table';
import { Product } from 'app/models/products';
import useSWR from 'swr';
import { httpClient } from 'app/http';
import { AxiosResponse } from 'axios';

export const ProductList: React.FC = () => {
  const { data: result, error } = useSWR<AxiosResponse<Product[]>>(
    '/api/products',
    (url) => httpClient.get(url)
  );

  return (
    <Layout titulo='Products'>
      <Link href='/catalogs/products'>
        <button className='button is-link'>New</button>
        <br />
      </Link>
      <br />
      <Loader show={!result} />
      <ProductsTable products={result?.data || []} />
    </Layout>
  );
};
