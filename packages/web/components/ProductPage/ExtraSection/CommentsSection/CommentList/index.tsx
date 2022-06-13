import { CommentsQueryVariables } from "@/@types/api";
import { ChevronLeftIcon } from "@/components/icons/header/nav/ChevronLeft";
import { ChevronRightIcon } from "@/components/icons/header/nav/ChevronRight";
import { ConversationIcon } from "@/components/icons/product-page/ConversationIcon";
import { CommentItemContextProvider } from "@/contexts/CommentItemContext";
import { useCommentListContext } from "@/contexts/CommentListContext";
import { useCommentsQuery } from "@/hooks/apollo/queries/useCommentsQuery";
import { useProductForProductPage } from "@/hooks/useProductForProductPage";
import React from "react";
import { CommentItem } from "./CommentItem";
import { CommentListError } from "./CommentListError";
import { CommentListLoading } from "./CommentListLoading";
import { NoComments } from "./NoComments";

const perPage = 10;

export function getCommentsVariables(
  productId: string,
  page = 1,
): CommentsQueryVariables {
  return {
    input: {
      page,
      perPage,
      where: { productId },
      orderBy: { createdAt: "ASC" },
    },
  };
}

export const CommentList: React.FC = () => {
  const { page, setPage } = useCommentListContext();
  const { id } = useProductForProductPage();
  const { data, loading, error } = useCommentsQuery({
    variables: getCommentsVariables(id, page),
    notifyOnNetworkStatusChange: true,
  });

  if (loading) {
    return <CommentListLoading perPage={perPage} />;
  }

  if (!data || error) {
    return <CommentListError />;
  }

  const { edges: comments, info } = data.comments.comments;

  return (
    <div className="py-4">
      {info.total ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 px-4 font-bold md:px-8">
            <h3>Todos os comentários</h3>
            <ConversationIcon className="w-4.5 text-[#70e291]" />
          </div>

          <div className="flex items-center gap-6 px-4 md:px-8">
            <button
              type="button"
              className="disabled:text-secondary-foreground text-primary hover:enabled:text-primary-hover flex items-center gap-0.5"
              disabled={!info.hasPreviousPage}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeftIcon className="w-6" />
              anterior
            </button>

            <div className="font-bold">página {page}</div>

            <button
              type="button"
              className="disabled:text-secondary-foreground text-primary hover:enabled:text-primary-hover flex items-center gap-0.5"
              disabled={!info.hasNextPage}
              onClick={() => setPage(page + 1)}
            >
              próxima
              <ChevronRightIcon className="w-6" />
            </button>
          </div>

          <div className="flex flex-col">
            {comments.map(comment => (
              <CommentItemContextProvider key={comment.id} comment={comment}>
                <CommentItem />
              </CommentItemContextProvider>
            ))}
          </div>
        </div>
      ) : (
        <NoComments />
      )}
    </div>
  );
};
