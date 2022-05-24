import { ProductsQueryResponse, ProductsQueryVariables } from "@/@types/api";
import { initializeApollo } from "@/graphql/client";
import { productsUserVotesQuery } from "@/graphql/queries/productsUserVotesQuery";
import { authorizationHeaderWithToken } from "./accessToken";

export async function updateProductsVotesForUser() {
  const client = initializeApollo();

  const cache = client.cache.extract();

  const ids: string[] = [];

  for (const key in cache) {
    if (key.startsWith("Product:")) {
      const id = key.replace(/Product:/i, "");
      ids.push(id);
    }
  }

  await client.query<ProductsQueryResponse, ProductsQueryVariables>({
    query: productsUserVotesQuery,
    fetchPolicy: "network-only",
    variables: {
      input: {
        perPage: ids.length,
        where: { ids },
      },
    },
    context: {
      headers: {
        authorization: authorizationHeaderWithToken(),
      },
    },
  });
}
