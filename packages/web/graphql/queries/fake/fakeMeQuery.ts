import { MeQueryResponse } from "@/@types/api";
import { DataProxy, OperationVariables } from "@apollo/client";
import { meQuery } from "../meQuery";

export const fakeMeQuery: DataProxy.WriteQueryOptions<
  MeQueryResponse,
  OperationVariables
> = {
  query: meQuery,
  data: {
    me: {
      ok: false,
      errors: [
        {
          path: null,
          message: "Not Authenticated",
        },
      ],
      user: null,
    },
  },
};
