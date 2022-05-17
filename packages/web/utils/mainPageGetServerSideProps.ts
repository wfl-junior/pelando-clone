import { getVariables } from "@/components/MainPage/ProductsSection";
import { addApolloState, initializeApollo } from "@/graphql/client";
import { getSdk } from "@/graphql/sdk";
import { GetServerSideProps } from "next";

export const mainPageGetServerSideProps = (
  category?: string,
): GetServerSideProps => {
  return async () => {
    const apolloClient = initializeApollo();
    const sdk = getSdk(apolloClient);

    const [stores, products] = await Promise.all([
      sdk.query.stores(),
      sdk.query.products({ variables: getVariables(category) }),
    ]);

    return addApolloState(apolloClient, {
      props: { stores, products },
    });
  };
};
