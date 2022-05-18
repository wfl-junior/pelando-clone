import { ValidationError } from "yup";
import { FieldError } from "../graphql-types/Object/FieldError";

export function formatValidationErrors(error: ValidationError): FieldError[] {
  return error.inner.map(validationError => ({
    path: validationError.path,
    message: validationError.message,
  }));
}
