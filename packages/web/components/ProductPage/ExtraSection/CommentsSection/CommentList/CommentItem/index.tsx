import { LikeEmptyIcon } from "@/components/icons/product-page/LikeEmptyIcon";
import { ReplyIcon } from "@/components/icons/product-page/ReplyIcon";
import { UserImagePlaceholder } from "@/components/UserImagePlaceholder";
import { useCommentItemContext } from "@/contexts/CommentItemContext";
import { getReadableDate } from "@/utils/getReadableDate";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { EditCommentForm } from "./EditCommentForm";
import { MoreOptionsMenu } from "./MoreOptionsMenu";

export const CommentItem: React.FC = () => {
  const { comment, editing } = useCommentItemContext();

  return (
    <div
      // para habilitar scrolling para cá
      id={`comment-${comment.id}`}
      className="flex gap-1"
    >
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

      {editing ? (
        <EditCommentForm />
      ) : (
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

                {comment.edited && (
                  <span className="text-secondary-foreground before:bg-secondary-foreground relative ml-4 text-xs before:absolute before:-left-2 before:top-1/2 before:aspect-square before:w-0.5 before:-translate-y-1/2 before:rounded-full">
                    editado
                  </span>
                )}
              </div>

              <MoreOptionsMenu />
            </div>

            <pre className="break-words">{comment.body}</pre>
          </div>

          <div className="flex items-center gap-6 self-end px-2 md:self-start">
            <button type="button" className="flex items-center gap-1 text-sm">
              0
              <LikeEmptyIcon className="w-4.5" />
            </button>

            <button type="button" className="flex items-center gap-1 font-bold">
              <ReplyIcon className="w-4.5 text-primary" />
              Responder
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
