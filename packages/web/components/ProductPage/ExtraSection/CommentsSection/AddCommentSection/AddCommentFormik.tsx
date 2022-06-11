import { Comment, CommentsQueryResponse } from "@/@types/api";
import { useCommentListContext } from "@/contexts/CommentListContext";
import { commentsQuery } from "@/graphql/queries/commentsQuery";
import { useAddCommentMutation } from "@/hooks/apollo/mutations/useAddCommentMutation";
import { useCommentsQuery } from "@/hooks/apollo/queries/useCommentsQuery";
import { useProductForProductPage } from "@/hooks/useProductForProductPage";
import { commentValidationSchema } from "@/yup/commentValidationSchema";
import { Formik } from "formik";
import React, { useCallback } from "react";
import { getCommentsVariables } from "../CommentList";
import { AddCommentForm } from "./AddCommentForm";

const initialValues = {
  body: "",
};

export const AddCommentFormik: React.FC = () => {
  const product = useProductForProductPage();
  const [addComment] = useAddCommentMutation();
  const variables = getCommentsVariables(product.id);
  const { data: firstPageData } = useCommentsQuery({ variables });
  const { setPage } = useCommentListContext();

  const getCommentElement = useCallback((id: Comment["id"]) => {
    return document.querySelector<HTMLDivElement>(`#comment-${id}`);
  }, []);

  const scrollToNewComment = useCallback((id: Comment["id"]) => {
    // espera novo comentário aparecer na tela para dar scroll até ele
    return new Promise<boolean>((resolve, reject) => {
      const el = getCommentElement(id);

      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return resolve(true);
      }

      let timeout: NodeJS.Timeout;

      const observer = new MutationObserver(() => {
        const el = getCommentElement(id);

        if (el) {
          observer.disconnect();
          clearTimeout(timeout);
          el.scrollIntoView({ behavior: "smooth" });
          resolve(true);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      // cancela se demorar muito tempo para aparecer
      timeout = setTimeout(() => {
        observer.disconnect();
        reject(new Error("Não foi possível rolar para o novo comentário"));
      }, 1000);
    });
  }, []);

  return (
    <Formik
      validateOnBlur
      validateOnMount
      validateOnChange
      initialValues={initialValues}
      validationSchema={commentValidationSchema}
      onSubmit={async (values, { resetForm, validateForm }) => {
        try {
          await addComment({
            variables: {
              input: {
                ...values,
                productId: product.id,
              },
            },
            update: (cache, { data }) => {
              if (data?.addComment.comment) {
                // atualizar commentCount do product
                cache.modify({
                  id: cache.identify(product as any),
                  fields: {
                    commentCount: () => product.commentCount + 1,
                  },
                });

                // adicionar novo comentário a ui

                const lastPage = Math.ceil(
                  firstPageData!.comments.comments.info.total /
                    variables.input.perPage!,
                );

                // atualiza page para última, não entra em conflito com o último caso, por causa de state batching
                setPage(lastPage);

                const lastPageData = cache.readQuery<CommentsQueryResponse>({
                  query: commentsQuery,
                  variables: {
                    ...variables,
                    input: {
                      ...variables.input,
                      page: lastPage,
                    },
                  },
                });

                // atualiza dados da query da página 1 para sincronizar com próximos updates
                cache.writeQuery<CommentsQueryResponse>({
                  query: commentsQuery,
                  variables: {
                    ...variables,
                    input: {
                      ...variables.input,
                      page: 1,
                    },
                  },
                  data: {
                    ...firstPageData!,
                    comments: {
                      ...firstPageData!.comments,
                      comments: {
                        ...firstPageData!.comments.comments,
                        info: {
                          ...firstPageData!.comments.comments.info,
                          total:
                            firstPageData!.comments.comments.info.total + 1,
                        },
                      },
                    },
                  },
                });

                // checa se existe cache da última página
                if (lastPageData) {
                  // atualiza última página se existir em cache
                  // checa se página já está cheia
                  if (lastPageData.comments.comments.edges.length < 10) {
                    // se não estiver cheia, inserir novo comentário nesta página
                    cache.writeQuery<CommentsQueryResponse>({
                      query: commentsQuery,
                      variables: {
                        ...variables,
                        input: {
                          ...variables.input,
                          page: lastPage,
                        },
                      },
                      data: {
                        ...lastPageData,
                        comments: {
                          ...lastPageData.comments,
                          comments: {
                            ...lastPageData.comments.comments,
                            info: {
                              ...lastPageData.comments.comments.info,
                              total:
                                lastPageData.comments.comments.info.total + 1,
                            },
                            edges: [
                              ...lastPageData.comments.comments.edges,
                              data.addComment.comment,
                            ],
                          },
                        },
                      },
                    });

                    return scrollToNewComment(data.addComment.comment.id);
                  }

                  // cria outra página e adiciona novo comentário nela se a última já estiver cheia
                  cache.writeQuery<CommentsQueryResponse>({
                    query: commentsQuery,
                    variables: {
                      ...variables,
                      input: {
                        ...variables.input,
                        page: lastPage + 1,
                      },
                    },
                    data: {
                      ...lastPageData,
                      comments: {
                        ...lastPageData.comments,
                        comments: {
                          ...lastPageData.comments.comments,
                          info: {
                            ...lastPageData.comments.comments.info,
                            hasPreviousPage: true,
                            total:
                              lastPageData.comments.comments.info.total + 1,
                          },
                          edges: [data.addComment.comment],
                        },
                      },
                    },
                  });

                  // atualiza cache da página anterior
                  cache.writeQuery<CommentsQueryResponse>({
                    query: commentsQuery,
                    variables: {
                      ...variables,
                      input: {
                        ...variables.input,
                        page: lastPage,
                      },
                    },
                    data: {
                      ...lastPageData,
                      comments: {
                        ...lastPageData.comments,
                        comments: {
                          ...lastPageData.comments.comments,
                          info: {
                            ...lastPageData.comments.comments.info,
                            hasNextPage: true,
                            total:
                              lastPageData.comments.comments.info.total + 1,
                          },
                        },
                      },
                    },
                  });

                  // atualiza page state para nova página
                  setPage(lastPage + 1);
                  return scrollToNewComment(data.addComment.comment.id);
                }

                // caso não tivesse comentários antes
                if (lastPage === 0) {
                  cache.writeQuery<CommentsQueryResponse>({
                    query: commentsQuery,
                    variables: {
                      ...variables,
                      input: {
                        ...variables.input,
                        page: 1,
                      },
                    },
                    data: {
                      ...firstPageData!,
                      comments: {
                        ...firstPageData!.comments,
                        comments: {
                          ...firstPageData!.comments.comments,
                          info: {
                            ...firstPageData!.comments.comments.info,
                            total:
                              firstPageData!.comments.comments.info.total + 1,
                          },
                          edges: [
                            ...firstPageData!.comments.comments.edges,
                            data.addComment.comment,
                          ],
                        },
                      },
                    },
                  });

                  return scrollToNewComment(data.addComment.comment.id);
                }

                // atualiza para última página para dar fetch, porque ainda não está em cache
                setPage(() => {
                  // calcula para ver se novo comentário vai entrar na última página ou se vai ser criada uma nova
                  if (
                    firstPageData!.comments.comments.info.total %
                      variables.input.perPage! ===
                    0
                  ) {
                    return lastPage + 1;
                  }

                  return lastPage;
                });

                return scrollToNewComment(data.addComment.comment.id);
              }
            },
          });

          resetForm();
          validateForm(initialValues);
        } catch (error) {
          // TODO: adicionar toast
          console.log({ error });
        }
      }}
    >
      <AddCommentForm />
    </Formik>
  );
};
