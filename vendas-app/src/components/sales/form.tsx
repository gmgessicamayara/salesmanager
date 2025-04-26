import { Sale } from "app/models/sales";
import { useFormik } from "formik";
import { AutoComplete } from "primereact/autocomplete";

interface SalesFormProps {
  onSubmit: (sale: Sale) => void;
  initialValues?: Sale;
}
const formSchema: Sale = {
  customer: {},
  products: [],
  totalPrice: 0,
  paymentMethod: "",
};
export const SalesForm: React.FC<SalesFormProps> = ({ onSubmit }) => {
  const formik = useFormik<Sale>({
    onSubmit,
    initialValues: formSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <AutoComplete />
    </form>
  );
};
