import * as yup from "yup";

export const registerValidationSchema = yup.object({
  password: yup.string().required().min(8),
  email: yup.string().required().email(),
  username: yup
    .string()
    .required()
    .matches(
      /^[a-z-_áàâãéèêíïóôõöúçñ]+$/i,
      "${label} must be only alpha, - and _ characters",
    )
    .label("username"),
});
