import { CommentIcon } from "@/components/icons/product-card/CommentIcon";
import React from "react";

export const CommentButton: React.FC = () => (
  <button
    title="Comentar"
    className="hover:bg-secondary-background flex items-center gap-1 rounded-full p-1.5 transition-colors"
  >
    <CommentIcon className="w-4" />
    <span className="text-sm font-bold">0</span>
  </button>
);