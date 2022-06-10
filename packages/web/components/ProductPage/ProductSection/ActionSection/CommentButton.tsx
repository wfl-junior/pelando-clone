import { CommentEmptyIcon } from "@/components/icons/product-card/CommentEmptyIcon";
import { useProductForProductPage } from "@/hooks/useProductForProductPage";
import React from "react";

export const CommentButton: React.FC = () => {
  const { commentCount } = useProductForProductPage();

  return (
    <button
      title="Comentar"
      className="hover:bg-secondary-background flex items-center gap-1 rounded-full p-1.5 transition-colors"
    >
      <CommentEmptyIcon className="w-4" />
      <span className="text-sm font-bold">{commentCount}</span>
    </button>
  );
};
