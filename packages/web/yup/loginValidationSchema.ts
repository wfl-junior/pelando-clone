import * as yup from "yup";

export const loginValidationSchemas = [
  yup.object({
    email: yup
      .string()
      .email()
      .test(function (email) {
        const { username } = this.parent;

        // se estiver faltando username, email é obrigatório
        if (!username && !email) {
          return this.createError({
            message: "${label} inválido. Confira o endereço.",
          });
        }

        return true;
      })
      .label("E-mail"),
    username: yup
      .string()
      .test(function (username) {
        const { email } = this.parent;

        // se estiver faltando email, username é obrigatório
        if (!email && (!username || !/^[a-zA-Z-_]+$/i.test(username))) {
          return this.createError({
            message: "${label} inválido.",
          });
        }

        return true;
      })
      .label("Nome de usuário"),
  }),
  yup.object({
    password: yup.string().required("${label} é obrigatória.").label("Senha"),
  }),
];
