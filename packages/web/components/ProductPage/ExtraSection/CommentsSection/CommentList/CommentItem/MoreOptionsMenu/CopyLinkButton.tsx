import { useCommentItemContext } from "@/contexts/CommentItemContext";
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

        await navigator.clipboard.writeText(
          `${origin}${pathname}#comment-${id}`,
        );

        // TODO: adicionar toast
      }}
    >
      Copiar link
    </MenuButton>
  );
};
