import { MainPage } from "@/components/MainPage";
import { getVariables } from "@/components/MainPage/ProductsSection";
import { addApolloState, initializeApollo } from "@/graphql/client";
import { getSdk } from "@/graphql/sdk";
import type { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();
  const sdk = getSdk(apolloClient);

  const [stores, products] = await Promise.all([
    sdk.query.stores(),
    sdk.query.products({ variables: getVariables() }),
  ]);

  return addApolloState(apolloClient, {
    props: { stores, products },
  });
};

const Home: NextPage = () => <MainPage highlight />;

export default Home;
