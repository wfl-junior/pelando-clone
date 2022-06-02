import { WriteContentIcon } from "@/components/icons/product-page/WriteContentIcon";
import React from "react";

export const CommentList: React.FC = () => (
  <div className="flex flex-col items-center justify-center gap-2 px-4 pt-16 pb-4 md:px-8">
    <WriteContentIcon className="mb-4 w-9 text-[#41b5d3]" />
    <h3 className="text-xl font-bold">Nenhum comentário aqui</h3>
    <p>Comente primeiro e contribua com a comunidade.</p>
  </div>
);
