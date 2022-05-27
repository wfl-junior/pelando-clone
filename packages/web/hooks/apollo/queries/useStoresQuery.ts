import { PaginatedQueryVariables, StoresQueryResponse } from "@/@types/api";
import { storesQuery } from "@/graphql/queries/storesQuery";
import { QueryHookOptions, useQuery } from "@apollo/client";

export function useStoresQuery(
  options?: QueryHookOptions<StoresQueryResponse, PaginatedQueryVariables>,
) {
  return useQuery(storesQuery, options);
}
