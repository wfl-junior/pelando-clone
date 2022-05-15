import { ResolverResponse } from "../graphql-types/Object/ResolverResponse";

export const defaultErrorResponse = (): ResolverResponse => ({
  ok: false,
  errors: [
    {
      message: "Something Went Wrong",
    },
  ],
});
