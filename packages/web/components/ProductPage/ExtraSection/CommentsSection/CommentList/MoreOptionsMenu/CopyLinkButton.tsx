import { Comment } from "@/@types/api";
import React from "react";
import { MenuButton } from "./MenuButton";

interface CopyLinkButtonProps {
  comment: Comment;
}

export const CopyLinkButton: React.FC<CopyLinkButtonProps> = ({ comment }) => (
  <MenuButton
    onClick={async () => {
      const { origin, pathname } = window.location;

      await navigator.clipboard.writeText(
        `${origin}${pathname}#comment-${comment.id}`,
      );

      // TODO: adicionar toast
    }}
  >
    Copiar link
  </MenuButton>
);
