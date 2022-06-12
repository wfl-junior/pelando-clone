import { useCommentItemContext } from "@/contexts/CommentItemContext";
import React from "react";
import { MenuButton } from "./MenuButton";

export const EditCommentButton: React.FC = () => {
  const { setEditing } = useCommentItemContext();

  return <MenuButton onClick={() => setEditing(true)}>Editar</MenuButton>;
};
