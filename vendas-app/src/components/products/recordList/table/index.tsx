export const ProductsTable: React.FC = () => {
  return (
    <table className='table'>
      <thead>
        <th>ID</th>
        <th>SKU</th>
        <th>Name</th>
        <th>Price</th>
        <th>Description</th>
        <th>Actions</th>
      </thead>
      <tbody>
        <tr>
          <td>ID</td>
          <td>SKU</td>
          <td>Name</td>
          <td>Price</td>
          <td>Description</td>
          <td>Delete</td>
        </tr>
      </tbody>
    </table>
  );
};
