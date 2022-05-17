import { ProductsQueryResponse, ProductsQueryVariables } from "@/@types/api";
import { productsQuery } from "@/graphql/queries/productsQuery";
import { QueryHookOptions, useQuery } from "@apollo/client";

export function useProductsQuery(
  options?: QueryHookOptions<ProductsQueryResponse, ProductsQueryVariables>,
) {
  return useQuery<ProductsQueryResponse, ProductsQueryVariables>(
    productsQuery,
    options,
  );
}
