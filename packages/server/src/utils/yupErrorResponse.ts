import { ValidationError } from "yup";
import { IResolverBadResponse } from "../@types/app";
import { formatValidationErrors } from "./formatValidationErrors";

export const yupErrorResponse = (
  error: ValidationError,
): IResolverBadResponse => ({
  ok: false,
  errors: formatValidationErrors(error),
});
