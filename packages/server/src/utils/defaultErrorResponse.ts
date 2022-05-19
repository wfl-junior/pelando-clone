import { IResolverBadResponse } from "../@types/app";

export const defaultErrorResponse = (): IResolverBadResponse => ({
  ok: false,
  errors: [
    {
      message: "Something Went Wrong",
    },
  ],
});
