import { Layout } from 'components/layout';
import Link from 'next/link';
import { ProductsTable } from './table';

export const ProductList: React.FC = () => {
  return (
    <Layout titulo='Products'>
      <Link href='/catalogs/products'>
        <button className='button is-link'>New</button>
      </Link>
      <br />
      <ProductsTable />
    </Layout>
  );
};
