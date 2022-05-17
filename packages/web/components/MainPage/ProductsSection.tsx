import { PaginatedQueryVariables } from "@/@types/api";
import { useProductsQuery } from "@/hooks/apollo/useProductsQuery";
import React, { useRef } from "react";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { ProductsFetchMoreDummy } from "./ProductsFetchMoreDummy";

const firstPage = 1;
const perPage = 8;

export const getVariables = (page = firstPage): PaginatedQueryVariables => ({
  input: {
    page,
    perPage: 8,
  },
});

interface ProductsSectionProps {
  highlight?: boolean;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  highlight,
}) => {
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
    <section className="flex flex-col gap-1">
      {products.map((product, index, arr) => {
        const isLast = index + 1 === arr.length;

        if (isLast && hasNextPage) {
          return (
            <ProductsFetchMoreDummy
              key={product.id}
              currentPageRef={currentPageRef}
              fetchMore={fetchMore}
            >
              <ProductCard product={product} highlight={highlight} />
            </ProductsFetchMoreDummy>
          );
        }

        return (
          <ProductCard
            key={product.id}
            product={product}
            highlight={highlight}
          />
        );
      })}

      {loading &&
        Array.from({ length: perPage }, (_, i) => i + 1).map(number => (
          <ProductCardSkeleton key={number} />
        ))}
    </section>
  );
};
