import { Product } from 'app/models/products';

interface TableProductsProps {
  products: Array<Product>;
}

export const ProductsTable: React.FC<TableProductsProps> = ({ products }) => {
  return (
    <table className='table is-hoverable'>
      <thead>
        <tr>
          <th>ID</th>
          <th>SKU</th>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
          <th>Registration date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  );
};

interface ProducttRowProps {
  product: Product;
}

const ProductRow: React.FC<ProducttRowProps> = ({ product }) => {
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.sku}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.description}</td>
      <td>{product.registrationDate}</td>
      <td>
        <button className='button is-success'>Edit</button>

        <button className='button is-danger'>Delete</button>
      </td>
    </tr>
  );
};
