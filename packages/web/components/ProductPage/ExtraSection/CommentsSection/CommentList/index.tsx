import { CommentsQueryVariables } from "@/@types/api";
import { ChevronLeftIcon } from "@/components/icons/header/nav/ChevronLeft";
import { ChevronRightIcon } from "@/components/icons/header/nav/ChevronRight";
import { ConversationIcon } from "@/components/icons/product-page/ConversationIcon";
import { LikeEmptyIcon } from "@/components/icons/product-page/LikeEmptyIcon";
import { MoreOptionsIcon } from "@/components/icons/product-page/MoreOptionsIcon";
import { ReplyIcon } from "@/components/icons/product-page/ReplyIcon";
import { UserImagePlaceholder } from "@/components/UserImagePlaceholder";
import { useCommentsQuery } from "@/hooks/apollo/queries/useCommentsQuery";
import { useProductForProductPage } from "@/hooks/useProductForProductPage";
import { getReadableDate } from "@/utils/getReadableDate";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
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
  const { id } = useProductForProductPage();
  const [page, setPage] = useState(1);
  const { data, loading, error } = useCommentsQuery({
    variables: getCommentsVariables(id, page),
  });

  if (loading) {
    return <CommentListLoading perPage={perPage} />;
  }

  if (!data || error) {
    return <CommentListError />;
  }

  const { edges: comments, info } = data.comments.comments;

  return (
    <div className="p-4 md:px-8">
      {comments.length ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 font-bold">
            <h3>Todos os comentários</h3>
            <ConversationIcon className="w-4.5 text-[#70e291]" />
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              className="disabled:text-secondary-foreground text-primary flex items-center gap-0.5"
              disabled={!info.hasPreviousPage}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeftIcon className="w-6" />
              anterior
            </button>

            <div className="font-bold">página {page}</div>

            <button
              type="button"
              className="disabled:text-secondary-foreground text-primary flex items-center gap-0.5"
              disabled={!info.hasNextPage}
              onClick={() => setPage(page + 1)}
            >
              próxima
              <ChevronRightIcon className="w-6" />
            </button>
          </div>

          {comments.map(comment => (
            <div key={comment.id} className="flex gap-1">
              <Link href="#">
                <a className="border-image-border flex aspect-square w-10 items-center justify-center self-start overflow-hidden rounded-full border">
                  {comment.user.image ? (
                    <Image
                      src={comment.user.image}
                      width={40}
                      height={40}
                      className="max-w-full object-contain"
                    />
                  ) : (
                    <UserImagePlaceholder className="w-full" />
                  )}
                </a>
              </Link>

              <div className="flex w-full flex-col gap-2">
                <div className="bg-secondary-background flex flex-col gap-1 rounded-xl p-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Link href="#">
                        <a className="font-bold">{comment.user.username}</a>
                      </Link>

                      <time
                        dateTime={new Date(comment.createdAt).toLocaleString()}
                        className="text-secondary-foreground text-xs"
                      >
                        {getReadableDate(comment.createdAt)}
                      </time>
                    </div>

                    {/* TODO: adicionar menu */}
                    <button type="button" className="text-secondary-foreground">
                      <MoreOptionsIcon className="w-4.5" />
                    </button>
                  </div>

                  <pre className="break-words">{comment.body}</pre>
                </div>

                <div className="flex items-center gap-6 self-end px-2 md:self-start">
                  <button
                    type="button"
                    className="flex items-center gap-1 text-sm"
                  >
                    0
                    <LikeEmptyIcon className="w-4.5" />
                  </button>

                  <button
                    type="button"
                    className="flex items-center gap-1 font-bold"
                  >
                    <ReplyIcon className="w-4.5 text-primary" />
                    Responder
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoComments />
      )}
    </div>
  );
};
