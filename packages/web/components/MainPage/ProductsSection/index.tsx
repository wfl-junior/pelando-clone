import type { ProductsQueryInput, ProductsQueryVariables } from "@/@types/api";
import { AdSkeleton } from "@/components/AdSkeleton";
import { defaultErrorMessage } from "@/constants";
import { useProductsQuery } from "@/hooks/apollo/queries/useProductsQuery";
import React, { Fragment } from "react";
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
    <div className="flex gap-6">
      <div className="flex flex-1 flex-col gap-1">
        {products && products.length
          ? products.map((product, index) => {
              const isLast = index + 1 === products.length;

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

              return (
                <Fragment key={product.id}>
                  {!isLast && index !== 0 && index % productsPerPage === 0 && (
                    <AdSkeleton className="my-2 h-[150px] w-full sm:my-4 md:my-6 md:h-24" />
                  )}
                  <ProductCard product={product} />
                </Fragment>
              );
            })
          : !loading && (
              <p className="text-center font-bold sm:text-lg lg:text-xl">
                {error
                  ? defaultErrorMessage
                  : "Não encontramos nenhum resultado. 😭"}
              </p>
            )}

        {loading &&
          Array.from({ length: productsPerPage }, (_, i) => i + 1).map(
            number => <ProductCardSkeleton key={number} />,
          )}
      </div>

      <AdSkeleton className="sticky top-36 hidden h-[600px] w-1/5 max-w-[300px] md:block" />
    </div>
  );
};
