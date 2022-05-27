import { MeQueryResponse } from "@/@types/api";
import { meQuery } from "@/graphql/queries/meQuery";
import { addTokenToQueryOptions } from "@/utils/addTokenToQueryOptions";
import { QueryHookOptions, useQuery } from "@apollo/client";

export function useMeQuery(options?: QueryHookOptions<MeQueryResponse>) {
  return useQuery(meQuery, addTokenToQueryOptions(options));
}
