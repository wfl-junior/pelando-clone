import { ProductsQueryResponse, ProductsQueryVariables } from "@/@types/api";
import { AngleDownIcon } from "@/components/icons/header/top/AngleDownIcon";
import { defaultErrorMessage } from "@/constants";
import { useProductsQuery } from "@/hooks/apollo/queries/useProductsQuery";
import { Toast } from "@/utils/Toast";
import { ApolloError, QueryHookOptions } from "@apollo/client";
import React, { Fragment } from "react";

interface LoadMoreButtonProps {
  options: QueryHookOptions<ProductsQueryResponse, ProductsQueryVariables>;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ options }) => {
  // usando products enquanto não tem notifications
  const { data, loading, fetchMore } = useProductsQuery({
    ...options,
    notifyOnNetworkStatusChange: true,
  });

  if (!data?.products.products.info.hasNextPage) {
    return null;
  }

  return (
    <button
      disabled={loading}
      className="border-default-border mt-auto flex min-h-[40px] w-full items-center justify-center border-t font-bold"
      onClick={async () => {
        // Math.ceil em caso de products length estar quebrado, o que não deve acontecer, mas nextPage deve ser Int e se estiver quebrado pode causar erros de keys duplicadas
        const nextPage = Math.ceil(
          data.products.products.edges.length /
            options.variables!.input!.perPage! +
            1,
        );

        try {
          await fetchMore({
            ...options,
            variables: {
              ...options.variables,
              input: {
                ...options.variables?.input,
                page: nextPage,
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
        } catch (error) {
          // se for ApolloError, o onError global resolve
          if (!(error instanceof ApolloError)) {
            new Toast({ message: defaultErrorMessage, type: "error" }).fire();
          }
        }
      }}
    >
      {loading ? (
        "carregando..."
      ) : (
        <Fragment>
          <span>carregar mais</span>
          <AngleDownIcon className="w-6" />
        </Fragment>
      )}
    </button>
  );
};
