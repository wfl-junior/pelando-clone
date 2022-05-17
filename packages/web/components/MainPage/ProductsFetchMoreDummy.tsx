import { PaginatedQueryVariables, ProductsQueryResponse } from "@/@types/api";
import { ApolloQueryResult, FetchMoreQueryOptions } from "@apollo/client";
import React, { MutableRefObject, useEffect, useRef } from "react";
import { getVariables } from "./ProductsSection";

interface ProductsFetchMoreDummyProps {
  children?: React.ReactNode;
  currentPageRef: MutableRefObject<number>;
  fetchMore(
    fetchMoreOptions: FetchMoreQueryOptions<
      PaginatedQueryVariables,
      ProductsQueryResponse
    > & {
      updateQuery?: (
        previousQueryResult: ProductsQueryResponse,
        options: {
          fetchMoreResult: ProductsQueryResponse;
          variables: PaginatedQueryVariables;
        },
      ) => ProductsQueryResponse;
    },
  ): Promise<ApolloQueryResult<ProductsQueryResponse>>;
}

export const ProductsFetchMoreDummy: React.FC<ProductsFetchMoreDummyProps> = ({
  currentPageRef,
  fetchMore,
  children,
}) => {
  const observerElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = observerElementRef.current!;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // quando der trigger, lembrar de dar unobserve para não triggar denovo
          observer.unobserve(el);
          const nextPage = ++currentPageRef.current;

          fetchMore({
            variables: getVariables(nextPage),
            updateQuery: (previousResult, { fetchMoreResult }) => ({
              ...fetchMoreResult,
              products: {
                ...fetchMoreResult.products,
                products: {
                  ...fetchMoreResult.products.products,
                  info: {
                    ...fetchMoreResult.products.products.info,
                    // manter o from inicial
                    from: previousResult.products.products.info.from,
                  },
                  // merge nas edges
                  edges: [
                    ...previousResult.products.products.edges,
                    ...fetchMoreResult.products.products.edges,
                  ],
                },
              },
            }),
          });
        }
      },
      // quando o product card anterior estiver visível
      { rootMargin: "20%" },
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return <div ref={observerElementRef}>{children}</div>;
};
