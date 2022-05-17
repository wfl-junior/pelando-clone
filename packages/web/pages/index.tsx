import { PaginatedQueryVariables } from "@/@types/api";
import { MainPage } from "@/components/MainPage";
import { ProductCard } from "@/components/MainPage/ProductCard";
import { ProductCardSkeleton } from "@/components/MainPage/ProductCardSkeleton";
import { ProductsFetchMoreDummy } from "@/components/MainPage/ProductsFetchMoreDummy";
import { addApolloState, initializeApollo } from "@/graphql/client";
import { getSdk } from "@/graphql/sdk";
import { useProductsQuery } from "@/hooks/apollo/useProductsQuery";
import type { GetServerSideProps, NextPage } from "next";
import { useRef } from "react";

const firstPage = 1;
const perPage = 8;

export const getVariables = (page = firstPage): PaginatedQueryVariables => ({
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
  const currentPageRef = useRef(firstPage);
  const { data, loading, fetchMore } = useProductsQuery({
    variables: getVariables(),
    notifyOnNetworkStatusChange: true,
  });

  // data já vai estar disponível, pois está no cache, porque foi feito prefetch no servidor
  const {
    products: {
      products: {
        edges: products,
        info: { hasNextPage },
      },
    },
  } = data!;

  return (
    <MainPage>
      <div className="flex flex-col gap-1">
        {products.map((product, index, arr) => {
          const isLast = index + 1 === arr.length;

          if (isLast && hasNextPage) {
            return (
              <ProductsFetchMoreDummy
                key={product.id}
                currentPageRef={currentPageRef}
                fetchMore={fetchMore}
              >
                <ProductCard product={product} highlight />
              </ProductsFetchMoreDummy>
            );
          }

          return <ProductCard key={product.id} product={product} highlight />;
        })}

        {loading &&
          Array.from({ length: perPage }, (_, i) => i + 1).map(number => (
            <ProductCardSkeleton key={number} />
          ))}
      </div>
    </MainPage>
  );
};

export default Home;
