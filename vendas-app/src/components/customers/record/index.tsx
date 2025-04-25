import { Layout } from "components/layout";
import { CustomerForm } from "./form";
import { useState } from "react";
import { Customer } from "app/models/customers";
import { useCustomerService } from "app/services";
import { useRouter } from "next/router";
import { Alert } from "app/models/common/message";
import { useEffect } from "react";

export const CustomerRegistration: React.FC = () => {
  const [customer, setCustomer] = useState<Customer>({});
  const [messages, setMessages] = useState<Array<Alert>>([]);
  const service = useCustomerService();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      service
        .getCustomer(id)
        .then((retrievedCustomer) => setCustomer(retrievedCustomer));
    }
  }, [id]);

  const handleSubmit = (customer: Customer) => {
    if (customer.id) {
      service.updateCustomer(customer).then((response) => {
        setMessages([
          { type: "success", text: "Customer updated successfully!" },
        ]);
      });
    } else {
      service.saveCustomer(customer).then((savedCustomer) => {
        setCustomer(savedCustomer);
        setMessages([
          { type: "success", text: "Customer saved successfully!" },
        ]);
      });
    }
  };

  return (
    <Layout title="Customers" messages={messages}>
      <CustomerForm customer={customer} onSubmit={handleSubmit}></CustomerForm>
    </Layout>
  );
};

export default CustomerRegistration;
