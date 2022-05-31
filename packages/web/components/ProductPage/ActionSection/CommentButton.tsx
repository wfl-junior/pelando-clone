import { CommentIcon } from "@/components/icons/product-card/CommentIcon";
import React from "react";

export const CommentButton: React.FC = () => (
  <button className="flex items-center gap-1">
    <CommentIcon className="w-4" />
    <span className="text-sm font-bold">0</span>
  </button>
);
