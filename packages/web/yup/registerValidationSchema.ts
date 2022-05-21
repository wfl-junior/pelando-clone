import * as yup from "yup";

export const registerValidationSchemas = [
  yup.object({
    email: yup
      .string()
      .required("${label} é obrigatório.")
      .email("${label} inválido. Confira o endereço.")
      .label("E-mail"),
  }),
  yup.object({
    username: yup
      .string()
      .required("${label} é obrigatório.")
      .matches(
        /^[a-zA-Z-_]+$/i,
        "${label} inválido. Somente caracteres alpha, - e _",
      )
      .label("Nome de usuário"),
  }),
  yup.object({
    password: yup
      .string()
      .required("${label} é obrigatória.")
      .min(8, "${label} deve conter no mínimo ${min} caracteres")
      .label("Senha"),
  }),
];
