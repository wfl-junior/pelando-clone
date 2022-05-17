import { PaginatedQueryVariables } from "@/@types/api";
import { MainPage } from "@/components/MainPage";
import { ProductCard } from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";
import { addApolloState, initializeApollo } from "@/graphql/client";
import { getSdk } from "@/graphql/sdk";
import { useProductsQuery } from "@/hooks/apollo/useProductsQuery";
import type { GetServerSideProps, NextPage } from "next";

const perPage = 8;

const getVariables = (page = 1): PaginatedQueryVariables => ({
  input: {
    page,
    perPage,
  },
});

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

const Home: NextPage = () => {
  const { data, loading } = useProductsQuery({ variables: getVariables() });

  return (
    <MainPage>
      <div className="flex flex-col gap-1">
        {/* data já vai estar disponível, pois está no cache, porque foi feito prefetch no servidor */}
        {data!.products.products.edges.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}

        {loading &&
          Array.from({ length: perPage }, (_, i) => i + 1).map(number => (
            <ProductCardSkeleton key={number} />
          ))}
      </div>
    </MainPage>
  );
};

export default Home;
