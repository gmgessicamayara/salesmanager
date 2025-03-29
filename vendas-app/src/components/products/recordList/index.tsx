import { Layout } from 'components/layout';
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

  if (!result) {
    return <div>Carregando</div>;
  }

  return (
    <Layout titulo='Products'>
      <Link href='/catalogs/products'>
        <button className='button is-link'>New</button>
        <br />
      </Link>
      <br />
      <ProductsTable products={result.data} />
    </Layout>
  );
};
