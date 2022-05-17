import { PaginatedQueryVariables, ProductsQueryResponse } from "@/@types/api";
import { productsQuery } from "@/graphql/queries/productsQuery";
import { QueryHookOptions, useQuery } from "@apollo/client";

export function useProductsQuery(
  options?: QueryHookOptions<ProductsQueryResponse, PaginatedQueryVariables>,
) {
  return useQuery<ProductsQueryResponse, PaginatedQueryVariables>(
    productsQuery,
    options,
  );
}
