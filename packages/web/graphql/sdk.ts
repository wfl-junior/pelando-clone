import {
  PaginatedQueryVariables,
  ProductsQueryResponse,
  StoresQueryResponse,
} from "@/@types/api";
import { QueryOptions } from "@apollo/client";
import { Client } from "./client";
import { productsQuery } from "./queries/productsQuery";
import { storesQuery } from "./queries/storesQuery";

export function getSdk(client: Client) {
  return {
    query: {
      stores: (
        options?: Omit<
          QueryOptions<PaginatedQueryVariables, StoresQueryResponse>,
          "query"
        >,
      ) => {
        return client.query<StoresQueryResponse, PaginatedQueryVariables>({
          ...options,
          query: storesQuery,
        });
      },
      products: (
        options?: Omit<
          QueryOptions<PaginatedQueryVariables, ProductsQueryResponse>,
          "query"
        >,
      ) => {
        return client.query<ProductsQueryResponse, PaginatedQueryVariables>({
          ...options,
          query: productsQuery,
        });
      },
    },
  };
}
