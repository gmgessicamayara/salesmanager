import { Product } from "app/models/products";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

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
  const actionTemplate = (rowData: Product) => {
    return (
      <div className="buttons is-right">
        <Button
          label="Edit"
          className="button is-small is-success"
          onClick={(e) => onEdit(rowData)}
        />

        <Button
          label="Delete"
          className="button is-small is-danger"
          onClick={(e) => {
            confirmPopup({
              target: e.currentTarget,
              icon: "pi pi-exclamation-triangle",
              message: "Are you sure you want to delete this product?",
              acceptLabel: "Yes",
              rejectLabel: "No",
              className: "p-confirm-popup-sm",
              accept: () => {
                onDelete(rowData);
              },
            });
          }}
        />
        <ConfirmPopup />
      </div>
    );
  };

  return (
    <DataTable value={products} paginator rows={5} stripedRows>
      <Column field="id" header="ID" sortable></Column>
      <Column field="sku" header="SKU" sortable></Column>
      <Column field="name" header="Name" sortable></Column>
      <Column field="price" header="Price" sortable></Column>
      <Column field="actions" header="Actions" body={actionTemplate}></Column>
    </DataTable>
  );
};
