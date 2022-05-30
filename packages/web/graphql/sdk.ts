import {
  MeQueryResponse,
  PaginatedQueryVariables,
  ProductQueryResponse,
  ProductQueryVariables,
  ProductsQueryResponse,
  ProductsQueryVariables,
  StoresQueryResponse,
} from "@/@types/api";
import { ApolloQueryResult, QueryOptions } from "@apollo/client";
import { Client } from "./client";
import { meQuery } from "./queries/meQuery";
import { productQuery } from "./queries/productQuery";
import { productsQuery } from "./queries/productsQuery";
import { storesQuery } from "./queries/storesQuery";

type ClientQuery<Response, Variables = undefined> = (
  options?: Omit<QueryOptions<Variables, Response>, "query">,
) => Promise<ApolloQueryResult<Response>>;

interface Sdk {
  query: {
    stores: ClientQuery<StoresQueryResponse, PaginatedQueryVariables>;
    products: ClientQuery<ProductsQueryResponse, ProductsQueryVariables>;
    me: ClientQuery<MeQueryResponse>;
    product: ClientQuery<ProductQueryResponse, ProductQueryVariables>;
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
      me: options => {
        return client.query({
          ...options,
          query: meQuery,
        });
      },
      product: options => {
        return client.query({
          ...options,
          query: productQuery,
        });
      },
    },
  };
}
