import {
  PaginatedQueryVariables,
  ProductsQueryResponse,
  StoresQueryResponse,
} from "@/@types/api";
import { ApolloQueryResult, QueryOptions } from "@apollo/client";
import { Client } from "./client";
import { productsQuery } from "./queries/productsQuery";
import { storesQuery } from "./queries/storesQuery";

type ClientQuery<R, V> = (
  options?: Omit<QueryOptions<V, R>, "query">,
) => Promise<ApolloQueryResult<R>>;

interface Sdk {
  query: {
    stores: ClientQuery<StoresQueryResponse, PaginatedQueryVariables>;
    products: ClientQuery<ProductsQueryResponse, PaginatedQueryVariables>;
  };
}

export function getSdk(client: Client): Sdk {
  return {
    query: {
      stores: options => {
        return client.query({
          ...options,
          query: storesQuery,
        });
      },
      products: options => {
        return client.query({
          ...options,
          query: productsQuery,
        });
      },
    },
  };
}
