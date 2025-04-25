import { Customer } from "app/models/customers";
import React from "react";
import { useFormik } from "formik";
import { Input, InputCPF, InputBirthday, InputPhoneNumber } from "components";
import { validationSchema } from "./validationSchema";
import { useRouter } from "next/router";
interface CustomerFormProps {
  customer?: Customer;
  onSubmit;
}

const formSchema = {
  id: "",
  name: "",
  cpf: "",
  address: "",
  birthday: "",
  email: "",
  phoneNumber: "",
  registrationDate: "",
};

export const CustomerForm: React.FC<CustomerFormProps> = ({
  customer,
  onSubmit,
}) => {
  const router = useRouter();
  const formik = useFormik<Customer>({
    initialValues: { ...formSchema, ...customer },
    onSubmit,
    enableReinitialize: true,
    validationSchema: validationSchema,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.values.id && (
        <div className="columns">
          <Input
            label="ID:"
            columnClasses="is-half"
            id="id"
            value={formik.values.id}
            disabled
          />

          <Input
            label="Registration date:"
            columnClasses="is-half"
            id="registrationDate"
            value={formik.values.registrationDate}
            disabled
          />
        </div>
      )}
      <div className="columns">
        <Input
          id="name"
          name="name"
          label="Name: *"
          autoComplete="off"
          columnClasses="is-full"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />
      </div>
      <div className="columns">
        <InputCPF
          id="cpf"
          name="cpf"
          label="CPF: *"
          autoComplete="off"
          columnClasses="is-half"
          onChange={formik.handleChange}
          value={formik.values.cpf}
          error={formik.errors.cpf}
        />

        <InputBirthday
          id="birthday"
          name="birthday"
          label="Date of Birth: *"
          autoComplete="off"
          columnClasses="is-half"
          onChange={formik.handleChange}
          value={formik.values.birthday}
          error={formik.errors.birthday}
        />
      </div>
      <div className="columns">
        <Input
          id="address"
          name="address"
          label="Address: *"
          autoComplete="off"
          columnClasses="is-full"
          onChange={formik.handleChange}
          value={formik.values.address}
          error={formik.errors.address}
        />
      </div>
      <div className="columns">
        <Input
          id="email"
          name="email"
          label="Email:"
          autoComplete="off"
          columnClasses="is-half"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />

        <InputPhoneNumber
          id="phoneNumber"
          name="phoneNumber"
          label="Phone number: *"
          autoComplete="off"
          columnClasses="is-half"
          onChange={formik.handleChange}
          value={formik.values.phoneNumber}
          error={formik.errors.phoneNumber}
        />
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link is-success">
            {formik.values.id ? "Update" : "Save"}
          </button>
        </div>
        <div className="control">
          <button
            onClick={(e) => router.push("/searches/customers")}
            className="button"
            type="button"
          >
            Back
          </button>
        </div>
      </div>
      <div className="control"></div>
    </form>
  );
};
