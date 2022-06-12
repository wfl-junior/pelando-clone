import { Comment, CommentsQueryResponse } from "@/@types/api";
import { Spinner } from "@/components/Spinner";
import { useCommentListContext } from "@/contexts/CommentListContext";
import { commentsQuery } from "@/graphql/queries/commentsQuery";
import { useDeleteCommentMutation } from "@/hooks/apollo/mutations/useDeleteCommentMutation";
import { useProductForProductPage } from "@/hooks/useProductForProductPage";
import { authorizationHeaderWithToken } from "@/utils/accessToken";
import React from "react";
import { getCommentsVariables } from "..";
import { MenuButton } from "./MenuButton";

interface DeleteCommentButtonProps {
  children?: React.ReactNode;
  comment: Comment;
}

export const DeleteCommentButton: React.FC<DeleteCommentButtonProps> = ({
  comment,
}) => {
  const [deleteComment, { loading }] = useDeleteCommentMutation();
  const product = useProductForProductPage();
  const {
    page: currentPage,
    setPage,
    queryResult: { refetch },
  } = useCommentListContext();

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
                // TODO: melhorar esta parte, fazer evict somente das páginas necessárias
                // remove páginas depois da página atual do cache
                for (let page = lastPage; page > currentPage; page--) {
                  cache.evict({
                    fieldName: "comments",
                    args: getCommentsVariables(product.id, page),
                  });
                }

                // faz refetch na página atual para atualizar a lista
                refetch();
              }

              // volta 1 página e remove a atual se estiver na última e estiver somente com o comentário que vai ser deletado
              if (
                currentPage > 1 &&
                currentPageData.comments.comments.edges.length === 1
              ) {
                setPage(currentPage - 1);

                // timeout para acontecer depois de setPage
                setTimeout(() => {
                  cache.evict({
                    fieldName: "comments",
                    args: currentPageVariables,
                  });

                  cache.gc();
                }, 100);

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
