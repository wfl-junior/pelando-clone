import { getVariables } from "@/components/MainPage/ProductsSection";
import { addApolloState, initializeApollo } from "@/graphql/client";
import { fakeMeQuery } from "@/graphql/queries/fake/fakeMeQuery";
import { getSdk } from "@/graphql/sdk";
import { GetServerSideProps } from "next";
import { authorizationHeaderWithToken } from "./accessToken";
import { refreshAccessToken } from "./refreshAccessToken";

export const mainPageGetServerSideProps = (
  category?: string,
): GetServerSideProps => {
  return async context => {
    const apolloClient = initializeApollo();
    const sdk = getSdk(apolloClient);

    const queries = [
      sdk.query.stores(),
      sdk.query.products({ variables: getVariables(category) }),
    ] as const;

    try {
      const { cookie } = context.req.headers;

      if (!cookie) {
        throw new Error(
          "no need to fetch for access token if there is no cookie",
        );
      }

      const { accessToken } = await refreshAccessToken({
        headers: { cookie },
      });

      if (!accessToken) {
        throw new Error(
          "no need to fetch me query if there is no access token",
        );
      }

      // põe em cache estas queries
      await Promise.allSettled([
        ...queries,
        sdk.query.me({
          context: {
            headers: {
              authorization: authorizationHeaderWithToken(accessToken),
            },
          },
        }),
      ]);

      return addApolloState(apolloClient, {
        props: { accessToken },
      });
    } catch {
      // põe em cache estas queries
      await Promise.allSettled(queries);

      // por fake me query em cache, para não precisar dar fetch no client, já que não está autenticado, não tem necessidade
      apolloClient.writeQuery(fakeMeQuery);

      return addApolloState(apolloClient);
    }
  };
};
