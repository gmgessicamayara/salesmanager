import * as Yup from "yup";

const msgRequiredField = "Required field";

export const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required(msgRequiredField),
  cpf: Yup.string().trim().required(msgRequiredField).length(14, "Invalid CPF"),
  address: Yup.string().trim().required(msgRequiredField),
  birthday: Yup.string()
    .trim()
    .required(msgRequiredField)
    .length(10, "Invalid birth of date"),
  email: Yup.string().trim().required(msgRequiredField).email("Invalid email"),
  phoneNumber: Yup.string().trim().required(msgRequiredField),
});
