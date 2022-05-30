import type { ProductsQueryInput } from "@/@types/api";
import { getVariables } from "@/components/MainPage/ProductsSection";
import { addApolloState, initializeApollo } from "@/graphql/client";
import { getSdk } from "@/graphql/sdk";
import { GetServerSideProps } from "next";
import { authorizationHeaderWithToken } from "./accessToken";
import { applyFakeMeQuery } from "./applyFakeMeQuery";
import { refreshAccessTokenServerSide } from "./refreshAccessTokenServerSide";

export const mainPageGetServerSideProps = (
  variables?: ProductsQueryInput,
): GetServerSideProps => {
  return async ({ req, res }) => {
    const apolloClient = initializeApollo();
    const sdk = getSdk(apolloClient);

    const queries = [sdk.query.stores()];

    try {
      const accessToken = await refreshAccessTokenServerSide(req, res);

      const options = {
        context: {
          headers: {
            authorization: authorizationHeaderWithToken(accessToken),
          },
        },
      };

      // põe em cache estas queries
      await Promise.allSettled([
        ...queries,
        sdk.query.products({ variables: getVariables(variables), ...options }),
        sdk.query.me(options),
      ]);

      return addApolloState(apolloClient, {
        props: { accessToken },
      });
    } catch {
      // põe em cache estas queries
      await Promise.allSettled([
        ...queries,
        sdk.query.products({ variables: getVariables(variables) }),
      ]);

      // por fake me query em cache, para não precisar dar fetch no client, já que não está autenticado, não tem necessidade
      applyFakeMeQuery(apolloClient);

      return addApolloState(apolloClient);
    }
  };
};
