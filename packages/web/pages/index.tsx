import {
  PaginatedData,
  PaginatedQueryVariables,
  Store,
  StoresQueryResponse,
} from "@/@types/api";
import { MainPage } from "@/components/MainPage";
import { apolloClient } from "@/graphql/client";
import { storesQuery } from "@/graphql/queries/storesQuery";
import type { GetServerSideProps, NextPage } from "next";

interface HomeProps {
  stores: PaginatedData<Store>;
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const { data } = await apolloClient.query<
    StoresQueryResponse,
    PaginatedQueryVariables
  >({
    query: storesQuery,
    variables: { input: { perPage: 19 } },
  });

  return {
    props: {
      stores: data.stores.stores,
    },
  };
};

const Home: NextPage<HomeProps> = ({ stores }) => (
  <MainPage stores={stores.edges}>
    <h1 className="text-2xl font-bold">Pelando</h1>
  </MainPage>
);

export default Home;
