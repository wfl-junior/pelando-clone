import {
  PaginatedData,
  PaginatedQueryVariables,
  Product,
  ProductsQueryResponse,
  Store,
  StoresQueryResponse,
} from "@/@types/api";
import { MainPage } from "@/components/MainPage";
import { ProductCard } from "@/components/ProductCard";
import { apolloClient } from "@/graphql/client";
import { productsQuery } from "@/graphql/queries/productsQuery";
import { storesQuery } from "@/graphql/queries/storesQuery";
import type { GetServerSideProps, NextPage } from "next";

interface HomeProps {
  stores: PaginatedData<Store>;
  products: PaginatedData<Product>;
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const [stores, products] = await Promise.all([
    apolloClient.query<StoresQueryResponse, PaginatedQueryVariables>({
      query: storesQuery,
    }),
    apolloClient.query<ProductsQueryResponse, PaginatedQueryVariables>({
      query: productsQuery,
      variables: { input: { perPage: 8 } },
    }),
  ]);

  return {
    props: {
      stores: stores.data.stores.stores,
      products: products.data.products.products,
    },
  };
};

const Home: NextPage<HomeProps> = ({ stores, products }) => (
  <MainPage stores={stores.edges}>
    <div className="flex flex-col gap-1">
      {products.edges.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </MainPage>
);

export default Home;
