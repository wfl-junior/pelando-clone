import type { OperationVariables, QueryHookOptions } from "@apollo/client";
import { authorizationHeaderWithToken } from "./accessToken";

export function addTokenToQueryOptions<D = any, V = OperationVariables>(
  options?: QueryHookOptions<D, V>,
) {
  return {
    ...options,
    context: {
      ...options?.context,
      headers: {
        ...options?.context?.headers,
        authorization: authorizationHeaderWithToken(),
      },
    },
  };
}
