import { Product } from "@/@types/api";
import { CartIcon } from "@/components/icons/product-card/CartIcon";
import { CommentIcon } from "@/components/icons/product-card/CommentIcon";
import Link from "next/link";
import React from "react";

interface CommentsAndSourceSectionProps {
  sourceUrl: Product["sourceUrl"];
}

export const CommentsAndSourceSection: React.FC<
  CommentsAndSourceSectionProps
> = ({ sourceUrl }) => (
  <div className="flex items-center gap-2 text-sm font-bold md:gap-6">
    <Link href="#">
      <a className="hover:text-tertiary-foreground flex items-center gap-1 p-2 transition-colors">
        <CommentIcon className="w-4" />
        {/* TODO: adicionar commentCount */}
        <span>0</span>
      </a>
    </Link>

    <a
      href={sourceUrl}
      target="_blank"
      className="hover:text-tertiary-foreground flex items-center gap-1 p-2 transition-colors"
    >
      <CartIcon className="w-4" />
      <span>ver na loja</span>
    </a>
  </div>
);
