import { useCommentItemContext } from "@/contexts/CommentItemContext";
import { Toast } from "@/utils/Toast";
import React from "react";
import { MenuButton } from "./MenuButton";

export const CopyLinkButton: React.FC = () => {
  const {
    comment: { id },
  } = useCommentItemContext();

  return (
    <MenuButton
      onClick={async () => {
        const { origin, pathname } = window.location;

        try {
          await navigator.clipboard.writeText(
            `${origin}${pathname}#comment-${id}`,
          );

          new Toast({ message: "Copiado", type: "success" }).fire();
        } catch {
          new Toast({
            message: "Não foi possível copiar",
            type: "error",
          }).fire();
        }
      }}
    >
      Copiar link
    </MenuButton>
  );
};
