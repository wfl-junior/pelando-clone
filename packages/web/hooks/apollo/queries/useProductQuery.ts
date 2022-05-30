import { ProductQueryResponse, ProductQueryVariables } from "@/@types/api";
import { productQuery } from "@/graphql/queries/productQuery";
import { QueryHookOptions, useQuery } from "@apollo/client";

export function useProductQuery(
  options?: QueryHookOptions<ProductQueryResponse, ProductQueryVariables>,
) {
  return useQuery(productQuery, options);
}
