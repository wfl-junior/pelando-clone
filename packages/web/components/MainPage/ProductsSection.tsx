import { ProductsQueryVariables } from "@/@types/api";
import { useProductsQuery } from "@/hooks/apollo/useProductsQuery";
import React, { useRef } from "react";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { ProductsFetchMoreDummy } from "./ProductsFetchMoreDummy";

const firstPage = 1;
const productsPerPage = 8;

export const getVariables = (category?: string): ProductsQueryVariables => ({
  input: {
    page: firstPage,
    perPage: productsPerPage,
    where: category ? { category: { slug: category } } : undefined,
  },
});

interface ProductsSectionProps {
  highlight?: boolean;
  category?: string;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  highlight,
  category,
}) => {
  const currentPageRef = useRef(firstPage);
  const { data, loading, fetchMore, variables } = useProductsQuery({
    variables: getVariables(category),
    notifyOnNetworkStatusChange: true,
  });

  // data já vai estar disponível por causa do prefetch no servidor
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
      {products.length ? (
        products.map((product, index, arr) => {
          const isLast = index + 1 === arr.length;

          if (isLast && hasNextPage) {
            return (
              <ProductsFetchMoreDummy
                key={product.id}
                currentPageRef={currentPageRef}
                fetchMore={fetchMore}
                variables={variables!}
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
        })
      ) : (
        <p className="text-center font-bold sm:text-lg lg:text-xl">
          Não encontramos nenhum resultado 😭
        </p>
      )}

      {loading &&
        Array.from({ length: productsPerPage }, (_, i) => i + 1).map(number => (
          <ProductCardSkeleton key={number} />
        ))}
    </section>
  );
};
