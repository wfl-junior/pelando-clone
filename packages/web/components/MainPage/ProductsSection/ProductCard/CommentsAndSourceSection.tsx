import { CartIcon } from "@/components/icons/product-card/CartIcon";
import { CommentEmptyIcon } from "@/components/icons/product-card/CommentEmptyIcon";
import { useProductCardContext } from "@/contexts/ProductCardContext";
import Link from "next/link";
import React from "react";

export const CommentsAndSourceSection: React.FC = () => {
  const { product } = useProductCardContext();

  return (
    <div className="flex items-center gap-2 text-sm font-bold md:gap-6">
      <Link href="#">
        <a className="hover:text-tertiary-foreground flex items-center gap-1 p-2 transition-colors">
          <CommentEmptyIcon className="w-4" />
          <span>{product.commentCount}</span>
        </a>
      </Link>

      <a
        href={product.sourceUrl}
        target="_blank"
        className="hover:text-tertiary-foreground flex items-center gap-1 p-2 transition-colors"
      >
        <CartIcon className="w-4" />
        <span>ver na loja</span>
      </a>
    </div>
  );
};
