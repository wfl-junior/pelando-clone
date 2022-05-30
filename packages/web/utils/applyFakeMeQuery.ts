import { MeQueryResponse } from "@/@types/api";
import { Client } from "@/graphql/client";
import { fakeMeQuery } from "@/graphql/queries/fake/fakeMeQuery";
import { meQuery } from "@/graphql/queries/meQuery";
import { ApolloCache, NormalizedCacheObject } from "@apollo/client";

export function applyFakeMeQuery(
  clientOrCache: Client | ApolloCache<NormalizedCacheObject>,
) {
  const data = clientOrCache.readQuery<MeQueryResponse>({ query: meQuery });

  clientOrCache.writeQuery({
    ...fakeMeQuery,
    data: {
      ...data,
      ...fakeMeQuery.data,
      me: {
        ...data?.me,
        ...fakeMeQuery.data.me,
      },
    },
  });
}
