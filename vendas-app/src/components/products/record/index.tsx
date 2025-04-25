import { useState, useEffect } from "react";
import { Layout, Input, InputMoney } from "components";
import { useProductService } from "app/services";
import { Product } from "app/models/products";
import { convertToBigDecimal, formatToBRL } from "app/util/formatCurrency";
import { Alert } from "app/models/common/message";
import Link from "next/link";
import * as yup from "yup";
import { useRouter } from "next/router";

const msgRequiredField = "Required field";

const validations = yup.object().shape({
  sku: yup.string().trim().required(msgRequiredField),
  name: yup.string().trim().required(msgRequiredField),
  description: yup.string().trim().required(msgRequiredField),
  price: yup
    .number()
    .required(msgRequiredField)
    .moreThan(0, "The value must be greater than 0,00 (zero)"),
});

interface FormErrors {
  sku?: string;
  name?: string;
  description?: string;
  price?: string;
}
export const ProductRegistration: React.FC = () => {
  const service = useProductService();
  const [sku, setSku] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [registrationDate, setRegistrationDate] = useState<string>("");
  const [messages, setMessages] = useState<Array<Alert>>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();
  const { id: queryId } = router.query;

  useEffect(() => {
    if (queryId) {
      service.getProduct(queryId).then((retrievedProduct) => {
        setId(retrievedProduct.id!);
        setSku(retrievedProduct.sku!);
        setName(retrievedProduct.name!);
        setDescription(retrievedProduct.description!);
        setRegistrationDate(retrievedProduct.registrationDate || "");
        setPrice(formatToBRL(`${retrievedProduct.price}`));
      });
    }
  }, [queryId]);

  const submit = () => {
    const product: Product = {
      id,
      sku,
      price: convertToBigDecimal(price),
      name,
      description,
    };

    validations
      .validate(product)
      .then((productValidated) => {
        setErrors({});
        if (id) {
          service.updateProduct(product).then((productResponse) => {
            setMessages([
              {
                type: "success",
                text: "Product updated successfully.",
              },
            ]);
          });
        } else {
          service.saveProduct(product).then((productResponse: Product) => {
            setId(productResponse.id ?? "");
            setRegistrationDate(productResponse.registrationDate ?? "");
            setMessages([
              {
                type: "success",
                text: "Product registered successfully.",
              },
            ]);
          });
        }
      })
      .catch((error) => {
        const field = error.path;
        const message = error.message;

        setErrors({
          [field]: message,
        });
      });
  };

  return (
    <Layout title="Products" messages={messages}>
      {id && (
        <div className="columns">
          <Input
            label="ID:"
            columnClasses="is-half"
            id="id"
            value={id}
            disabled
          />

          <Input
            label="Registration date:"
            columnClasses="is-half"
            id="registrationDate"
            value={registrationDate}
            disabled
          />
        </div>
      )}

      <div className="columns">
        <Input
          label="SKU: *"
          columnClasses="is-half"
          onChange={(e) => setSku(e.target.value)}
          id="inputSku"
          value={sku}
          placeholder="Enter the product SKU"
          error={errors.sku}
        />

        <InputMoney
          label="Price: *"
          columnClasses="is-half"
          onChange={(e) => setPrice(e.target.value)}
          id="inputPrice"
          value={price}
          maxLength={16}
          placeholder="Enter the product price"
          error={errors.price}
        />
      </div>

      <div className="columns">
        <Input
          label="Name: *"
          columnClasses="is-full"
          onChange={(e) => setName(e.target.value)}
          id="inputName"
          key={`input-name-${id}`}
          value={name}
          placeholder="Enter the product name"
          error={errors.name}
        />
      </div>

      <div className="columns">
        <div className="field column is-full">
          <label className="label" htmlFor="inputDescription">
            Description
          </label>
          <div className="control">
            <textarea
              className="textarea"
              id="inputDescription"
              key={`input-description-${id}`}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Enter the detailed product description"
            />
            {errors.description && (
              <p className="help is-danger">{errors.description}</p>
            )}
          </div>
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button onClick={submit} className="button is-link is-success">
            {id ? "Update" : "Save"}
          </button>
        </div>
        <div className="control">
          <Link href="/searches/products">
            <button className="button">Back</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
