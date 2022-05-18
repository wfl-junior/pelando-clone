import { ValidationError } from "yup";
import { formatValidationErrors } from "./formatValidationErrors";

export const yupErrorResponse = (error: ValidationError) => ({
  ok: false,
  errors: formatValidationErrors(error),
});
