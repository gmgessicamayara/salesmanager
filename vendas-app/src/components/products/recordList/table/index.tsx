import { Product } from 'app/models/products';
import { useState } from 'react';

interface TableProductsProps {
  products: Array<Product>;
  onEdit: (product) => void;
  onDelete: (product) => void;
}

export const ProductsTable: React.FC<TableProductsProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
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
          <ProductRow
            onDelete={onDelete}
            onEdit={onEdit}
            key={product.id}
            product={product}
          />
        ))}
      </tbody>
    </table>
  );
};

interface ProducttRowProps {
  product: Product;
  onEdit: (product) => void;
  onDelete: (product) => void;
}

const ProductRow: React.FC<ProducttRowProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const [removing, setRemoving] = useState<boolean>(false);

  const onDeleteClick = (product: Product) => {
    if (removing) {
      onDelete(product);
      setRemoving(false);
    } else {
      setRemoving(true);
    }
  };

  const cancelDelete = () => setRemoving(false);

  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.sku}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.description}</td>
      <td>{product.registrationDate}</td>
      <td>
        {!removing && (
          <button
            onClick={(e) => onEdit(product)}
            className='button is-small is-success'
          >
            Edit
          </button>
        )}

        <button
          onClick={(e) => onDeleteClick(product)}
          className='button is-small is-danger'
        >
          {removing ? 'Please Confirm' : 'Delete'}
        </button>
        {removing && (
          <button onClick={cancelDelete} className='button is-small'>
            Cancel
          </button>
        )}
      </td>
    </tr>
  );
};
