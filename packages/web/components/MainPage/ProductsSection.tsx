import type { ProductsQueryInput, ProductsQueryVariables } from "@/@types/api";
import { defaultErrorMessage } from "@/constants";
import { useProductsQuery } from "@/hooks/apollo/queries/useProductsQuery";
import React from "react";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { ProductsFetchMoreDummy } from "./ProductsFetchMoreDummy";

const firstPage = 1;
const productsPerPage = 8;

export const getVariables = (
  variables?: ProductsQueryInput,
): ProductsQueryVariables => ({
  input: {
    ...variables,
    page: firstPage,
    perPage: productsPerPage,
  },
});

interface ProductsSectionProps {
  productsQueryVariables?: ProductsQueryInput;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  productsQueryVariables,
}) => {
  const { data, loading, fetchMore, variables, error } = useProductsQuery({
    variables: getVariables(productsQueryVariables),
    notifyOnNetworkStatusChange: true,
  });

  const {
    edges: products,
    info: { hasNextPage },
  } = data?.products.products || { info: {} };

  return (
    <section className="flex flex-col gap-1">
      {products && products.length
        ? products.map((product, index, arr) => {
            const isLast = index + 1 === arr.length;

            if (isLast && hasNextPage) {
              return (
                <ProductsFetchMoreDummy
                  key={product.id}
                  currentProductsLength={products.length}
                  productsPerPage={productsPerPage}
                  fetchMore={fetchMore}
                  variables={variables!}
                >
                  <ProductCard product={product} />
                </ProductsFetchMoreDummy>
              );
            }

            return <ProductCard key={product.id} product={product} />;
          })
        : !loading && (
            <p className="text-center font-bold sm:text-lg lg:text-xl">
              {error
                ? defaultErrorMessage
                : "Não encontramos nenhum resultado. 😭"}
            </p>
          )}

      {loading &&
        Array.from({ length: productsPerPage }, (_, i) => i + 1).map(number => (
          <ProductCardSkeleton key={number} />
        ))}
    </section>
  );
};
