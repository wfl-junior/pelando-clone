import { MeQueryResponse } from "@/@types/api";
import { meQuery } from "@/graphql/queries/meQuery";
import { authorizationHeaderWithToken } from "@/utils/accessToken";
import { QueryHookOptions, useQuery } from "@apollo/client";

export function useMeQuery(options?: QueryHookOptions<MeQueryResponse>) {
  return useQuery(meQuery, {
    ...options,
    context: {
      ...options?.context,
      headers: {
        ...options?.context?.headers,
        authorization: authorizationHeaderWithToken(),
      },
    },
  });
}
