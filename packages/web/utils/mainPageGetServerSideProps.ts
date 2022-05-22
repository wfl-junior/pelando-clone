import { getVariables } from "@/components/MainPage/ProductsSection";
import { addApolloState, initializeApollo } from "@/graphql/client";
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

    const { accessToken } = await refreshAccessToken({
      headers: { cookie: context.req.headers.cookie } as any,
    });

    // põe em cache estas queries
    await Promise.all([
      sdk.query.stores(),
      sdk.query.products({ variables: getVariables(category) }),
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
  };
};
