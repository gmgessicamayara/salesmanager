import { Sale } from "app/models/sales";
import { Layout } from "components/layout";

import { SalesForm } from "./form";

export const Sales: React.FC = () => {
  const handleSubmit = (sale: Sale) => {
    console.log("Sale submitted:", sale);
  };
  return (
    <Layout title="Sales">
      <SalesForm onSubmit={handleSubmit} />
    </Layout>
  );
};
