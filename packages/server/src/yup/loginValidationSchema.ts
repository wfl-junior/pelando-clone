import * as yup from "yup";

export const loginValidationSchema = yup.object({
  password: yup.string().required(),
  email: yup
    .string()
    .nullable()
    .email()
    .test(function (email) {
      const { username } = this.parent;

      // se estiver faltando email e username, é obrigatório pelo menos um dos 2
      if (!email && !username) {
        return this.createError({
          message: "You must input an email or a username",
        });
      }

      // se estiver faltando username, email é obrigatório
      if (!username) {
        return email != null;
      }

      return true;
    }),
  username: yup
    .string()
    .nullable()
    .test(function (username) {
      const { email } = this.parent;

      // se estiver faltando email e username, é obrigatório pelo menos um dos 2
      if (!email && !username) {
        return this.createError({
          message: "You must input a username or an email",
        });
      }

      // se estiver faltando email, username é obrigatório
      if (!email) {
        return username != null;
      }

      return true;
    }),
});
