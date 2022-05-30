import { ProductsQueryResponse, ProductsQueryVariables } from "@/@types/api";
import { authorizationHeaderWithToken } from "@/utils/accessToken";
import { ApolloQueryResult, FetchMoreQueryOptions } from "@apollo/client";
import React, { useEffect, useRef } from "react";

interface ProductsFetchMoreDummyProps {
  children?: React.ReactNode;
  currentProductsLength: number;
  productsPerPage: number;
  variables: ProductsQueryVariables;
  fetchMore(
    fetchMoreOptions: FetchMoreQueryOptions<
      ProductsQueryVariables,
      ProductsQueryResponse
    > & {
      updateQuery?: (
        previousQueryResult: ProductsQueryResponse,
        options: {
          fetchMoreResult: ProductsQueryResponse;
          variables: ProductsQueryVariables;
        },
      ) => ProductsQueryResponse;
    },
  ): Promise<ApolloQueryResult<ProductsQueryResponse>>;
}

export const ProductsFetchMoreDummy: React.FC<ProductsFetchMoreDummyProps> = ({
  currentProductsLength,
  productsPerPage,
  fetchMore,
  variables,
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
          // Math.ceil em caso de products length estar quebrado, o que não deve acontecer, mas nextPage deve ser Int e se estiver quebrado pode causar erros de keys duplicadas
          const nextPage = Math.ceil(
            currentProductsLength / productsPerPage + 1,
          );

          fetchMore({
            variables: {
              ...variables,
              input: {
                ...variables.input,
                page: nextPage,
              },
            },
            context: {
              headers: {
                authorization: authorizationHeaderWithToken(),
              },
            },
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
