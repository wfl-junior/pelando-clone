import { CommentsQueryResponse } from "@/@types/api";
import { Spinner } from "@/components/Spinner";
import { useCommentItemContext } from "@/contexts/CommentItemContext";
import { useCommentListContext } from "@/contexts/CommentListContext";
import { commentsQuery } from "@/graphql/queries/commentsQuery";
import { useDeleteCommentMutation } from "@/hooks/apollo/mutations/useDeleteCommentMutation";
import { useProductForProductPage } from "@/hooks/useProductForProductPage";
import { authorizationHeaderWithToken } from "@/utils/accessToken";
import React from "react";
import { getCommentsVariables } from "../..";
import { MenuButton } from "./MenuButton";

export const DeleteCommentButton: React.FC = () => {
  const [deleteComment, { loading }] = useDeleteCommentMutation();
  const product = useProductForProductPage();
  const { page: currentPage, setPage } = useCommentListContext();
  const { comment } = useCommentItemContext();

  return (
    <MenuButton
      disabled={loading}
      className="flex items-center justify-center gap-1"
      onClick={async e => {
        // para impedir do menu fechar ao clicar
        e.preventDefault();

        try {
          await deleteComment({
            variables: { id: comment.id },
            context: {
              headers: {
                authorization: authorizationHeaderWithToken(),
              },
            },
            update: (cache, { data }) => {
              if (!data?.deleteComment.ok) {
                return;
              }

              // atualiza commentCount do product
              const newTotal = Math.max(product.commentCount - 1, 0);
              cache.modify({
                id: cache.identify(product as any),
                fields: {
                  commentCount: () => newTotal,
                },
              });

              // atualiza cache da primeira página para manter sincronismo
              const firstPageVariables = getCommentsVariables(product.id);
              const firstPageData = cache.readQuery<CommentsQueryResponse>({
                query: commentsQuery,
                variables: firstPageVariables,
              })!;

              cache.writeQuery<CommentsQueryResponse>({
                query: commentsQuery,
                variables: firstPageVariables,
                data: {
                  ...firstPageData,
                  comments: {
                    ...firstPageData.comments,
                    comments: {
                      ...firstPageData.comments.comments,
                      info: {
                        ...firstPageData.comments.comments.info,
                        total: newTotal,
                      },
                    },
                  },
                },
              });

              // atualiza paginação de comentários

              const currentPageVariables = getCommentsVariables(
                product.id,
                currentPage,
              );

              const currentPageData = cache.readQuery<CommentsQueryResponse>({
                query: commentsQuery,
                variables: currentPageVariables,
              })!;

              const perPage = currentPageVariables.input.perPage!;
              const totalComments =
                currentPageData.comments.comments.info.total;
              const lastPage = Math.ceil(totalComments / perPage);

              if (currentPage !== lastPage) {
                // atualiza cache ou remove páginas depois da página atual se existir em cache
                for (let page = currentPage; page <= lastPage; page++) {
                  const pageVariables = getCommentsVariables(product.id, page);

                  const pageData = cache.readQuery<CommentsQueryResponse>({
                    query: commentsQuery,
                    variables: pageVariables,
                  });

                  // se existir página em cache
                  if (pageData) {
                    // se existir próxima página
                    if (pageData.comments.comments.info.hasNextPage) {
                      const nextPageVariables = getCommentsVariables(
                        product.id,
                        page + 1,
                      );

                      const nextPageData =
                        cache.readQuery<CommentsQueryResponse>({
                          query: commentsQuery,
                          variables: nextPageVariables,
                        });

                      // se próxima página estiver em cache
                      if (nextPageData) {
                        const nextPageComments =
                          nextPageData.comments.comments.edges;
                        const nextPageFirstComment = nextPageComments[0];
                        let hasNextPage = true;

                        if (nextPageComments.length === 1) {
                          // remove próxima página se for ficar vazia
                          cache.evict({
                            fieldName: "comments",
                            args: nextPageVariables,
                          });

                          // ajusta hasNextPage da página atual
                          hasNextPage = false;
                        } else {
                          // caso contrário remove primeiro comment da próxima página
                          cache.writeQuery<CommentsQueryResponse>({
                            query: commentsQuery,
                            variables: nextPageVariables,
                            data: {
                              ...nextPageData,
                              comments: {
                                ...nextPageData.comments,
                                comments: {
                                  ...nextPageData.comments.comments,
                                  info: {
                                    ...nextPageData.comments.comments.info,
                                    total: newTotal,
                                  },
                                  edges: nextPageComments.filter(
                                    ({ id }) => id !== nextPageFirstComment.id,
                                  ),
                                },
                              },
                            },
                          });
                        }

                        // insere primeiro comment da próxima página no final desta página

                        cache.writeQuery<CommentsQueryResponse>({
                          query: commentsQuery,
                          variables: pageVariables,
                          data: {
                            ...pageData,
                            comments: {
                              ...pageData.comments,
                              comments: {
                                ...pageData.comments.comments,
                                info: {
                                  ...pageData.comments.comments.info,
                                  total: newTotal,
                                  hasNextPage,
                                },
                                edges: [
                                  ...pageData.comments.comments.edges,
                                  nextPageFirstComment,
                                ],
                              },
                            },
                          },
                        });
                      } else {
                        // remove página do cache se próxima página não estiver em cache, porque não será possível organizar os comentários dessa página
                        cache.evict({
                          fieldName: "comments",
                          args: pageVariables,
                        });
                      }
                    }
                  }
                }
              }

              // volta 1 página e remove a atual se estiver na última e estiver somente com o comentário que vai ser deletado
              if (
                currentPage > 1 &&
                currentPageData.comments.comments.edges.length === 1
              ) {
                setPage(currentPage - 1);

                // espera trocar de página para remover a atual, assim evitando refetch desnecessário
                new Promise<boolean>(resolve => {
                  let timeout: NodeJS.Timeout;
                  const element = document.querySelector<HTMLDivElement>(
                    `#comment-${comment.id}`,
                  )!.parentElement!;

                  const observer = new MutationObserver(entries => {
                    for (const entry of entries) {
                      if (entry.addedNodes.length) {
                        observer.disconnect();
                        clearTimeout(timeout);
                        return resolve(true);
                      }
                    }
                  });

                  observer.observe(element, {
                    childList: true,
                    subtree: true,
                  });

                  timeout = setTimeout(() => {
                    observer.disconnect();
                    resolve(false);
                  }, 1000);
                }).then(() => {
                  cache.evict({
                    fieldName: "comments",
                    args: currentPageVariables,
                  });

                  cache.gc();
                });

                // atualiza cache da página anterior se existir
                const previousPageVariables = getCommentsVariables(
                  product.id,
                  currentPage - 1,
                );

                const previousPageData = cache.readQuery<CommentsQueryResponse>(
                  {
                    query: commentsQuery,
                    variables: previousPageVariables,
                  },
                );

                if (previousPageData) {
                  cache.writeQuery<CommentsQueryResponse>({
                    query: commentsQuery,
                    variables: previousPageVariables,
                    data: {
                      ...previousPageData,
                      comments: {
                        ...previousPageData.comments,
                        comments: {
                          ...previousPageData.comments.comments,
                          info: {
                            ...previousPageData.comments.comments.info,
                            total: newTotal,
                            hasNextPage: false,
                          },
                        },
                      },
                    },
                  });
                }
              } else {
                // remove comment do cache
                cache.evict({ id: cache.identify(comment as any) });
              }

              // direto do docs do apollo
              // Evicting an object often makes other cached objects unreachable. Because of this, you should call cache.gc after evicting one or more objects from the cache.
              cache.gc();
            },
          });
        } catch (error) {
          // TODO: adicionar toast
          console.log({ error });
        }
      }}
    >
      Deletar
      {loading && (
        <Spinner className="w-5 before:w-3/5" color="secondary-foreground" />
      )}
    </MenuButton>
  );
};
