import { Comment } from "@/@types/api";
import { Spinner } from "@/components/Spinner";
import { useDeleteCommentMutation } from "@/hooks/apollo/mutations/useDeleteCommentMutation";
import { useProductForProductPage } from "@/hooks/useProductForProductPage";
import React from "react";
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

  return (
    <MenuButton
      className="flex items-center justify-center gap-1"
      onClick={async e => {
        // para impedir do menu fechar ao clicar
        e.preventDefault();

        try {
          await deleteComment({
            variables: { id: comment.id },
            update: (cache, { data }) => {
              if (data?.deleteComment.ok) {
                // atualiza commentCount do product
                cache.modify({
                  id: cache.identify(product as any),
                  fields: {
                    commentCount: () => Math.max(product.commentCount - 1, 0),
                  },
                });

                // remove comment do cache
                cache.evict({ id: cache.identify(comment as any) });
                cache.gc();

                // TODO: fazer com que isso não quebre a paginação (não dê overlap de comentários por causa do que já está no cache e o que ainda vai dar fetch)
              }
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
