import type { MutationHookOptions, OperationVariables } from "@apollo/client";
import { authorizationHeaderWithToken } from "./accessToken";

export function addTokenToMutationOptions<D = any, V = OperationVariables>(
  options?: MutationHookOptions<D, V>,
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
