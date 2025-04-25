import { Layout } from "components/layout";
import { Input, InputCPF } from "components";
import { useFormik } from "formik";
import { DataTable, DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Customer } from "app/models/customers";
import { useState } from "react";
import { Page } from "app/models/common/page";
import { useCustomerService } from "app/services";
import { Button } from "primereact/button";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";
import { useRouter } from "next/router";

interface searchCustomerProps {
  name?: string;
  cpf?: string;
}

export const CustomerList: React.FC = () => {
  const service = useCustomerService();
  const [loading, setLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState<Page<Customer>>({
    content: [],
    first: 0,
    number: 0,
    size: 5,
    totalElements: 0,
  });
  const router = useRouter();

  const handlePage = (event: DataTablePageEvent | null) => {
    setLoading(true);
    const page = event?.page ?? 0;
    const size = event?.rows ?? customers.size;
    service
      .find(filter.name, filter.cpf, page, size)
      .then((result) => {
        setCustomers({ ...result, first: event?.first ?? 0 });
      })
      .finally(() => setLoading(false));
  };

  const handleSubmit = (filter: searchCustomerProps) => {
    handlePage(null);
  };

  const deleteCustomer = (customer: Customer) => {
    service.deleteCustomer(customer.id).then((result) => {
      handlePage(null);
    });
  };

  const {
    handleSubmit: formikSubmit,
    values: filter,
    handleChange,
  } = useFormik<searchCustomerProps>({
    onSubmit: handleSubmit,
    initialValues: {
      name: "",
      cpf: "",
    },
  });

  const actionTemplate = (rowData: Customer) => {
    const router = useRouter();
    const url = `/catalogs/customers/?id=${rowData.id}`;
    return (
      <div className="buttons is-right">
        <Button
          label="Edit"
          className="button is-small is-success"
          onClick={(e) => router.push(url)}
        />

        <Button
          label="Delete"
          className="button is-small is-danger"
          onClick={(e) => {
            confirmPopup({
              target: e.currentTarget,
              icon: "pi pi-exclamation-triangle",
              message: "Are you sure you want to delete this customer?",
              acceptLabel: "Yes",
              rejectLabel: "No",
              className: "p-confirm-popup-sm",
              accept: () => {
                deleteCustomer(rowData);
              },
            });
          }}
        />
        <ConfirmPopup />
      </div>
    );
  };
  return (
    <Layout title="Customers">
      <form onSubmit={formikSubmit}>
        <div className="columns">
          <Input
            id="name"
            name="name"
            label="Name: "
            value={filter.name}
            columnClasses="is-half"
            autoComplete="off"
            onChange={handleChange}
          />
          <InputCPF
            id="cpf"
            name="cpf"
            label="CPF: "
            value={filter.cpf}
            columnClasses="is-half"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-link is-warning">
              Search
            </button>
          </div>
          <div className="control">
            <button
              type="button"
              className="button  is-link is-success"
              onClick={(e) => router.push("/catalogs/customers")}
            >
              New
            </button>
          </div>
        </div>
      </form>
      <br />
      <div className="columns">
        <div className="column is-fullwidth">
          <DataTable
            value={customers.content}
            totalRecords={customers.totalElements}
            lazy
            paginator
            rows={customers.size}
            onPage={handlePage}
            first={customers.first}
            loading={loading}
            emptyMessage="No customers found"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          >
            <Column field="id" header="ID" sortable />
            <Column field="name" header="Name" sortable />
            <Column field="cpf" header="CPF" sortable />
            <Column field="email" header="Email" sortable />
            <Column field="phoneNumber" header="Phone" sortable />
            <Column body={actionTemplate} header="Actions" />
          </DataTable>
        </div>
      </div>
    </Layout>
  );
};
