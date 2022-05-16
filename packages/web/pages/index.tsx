import {
  PaginatedQueryVariables,
  ProductsQueryResponse,
  StoresQueryResponse,
} from "@/@types/api";
import { MainPage } from "@/components/MainPage";
import { ProductCard } from "@/components/ProductCard";
import { addApolloState, initializeApollo } from "@/graphql/client";
import { productsQuery } from "@/graphql/queries/productsQuery";
import { storesQuery } from "@/graphql/queries/storesQuery";
import { useQuery } from "@apollo/client";
import type { GetServerSideProps, NextPage } from "next";

function getVariables(page = 1): PaginatedQueryVariables {
  return {
    input: {
      page,
      perPage: 8,
    },
  };
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();

  const [stores, products] = await Promise.all([
    apolloClient.query<StoresQueryResponse, PaginatedQueryVariables>({
      query: storesQuery,
    }),
    apolloClient.query<ProductsQueryResponse, PaginatedQueryVariables>({
      query: productsQuery,
      variables: getVariables(),
    }),
  ]);

  return addApolloState(apolloClient, {
    props: {
      stores: stores,
      products: products,
    },
  });
};

const Home: NextPage = () => {
  const { data } = useQuery<ProductsQueryResponse, PaginatedQueryVariables>(
    productsQuery,
    { variables: getVariables() },
  );

  return (
    <MainPage>
      <div className="flex flex-col gap-1">
        {data!.products.products.edges.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </MainPage>
  );
};

export default Home;
