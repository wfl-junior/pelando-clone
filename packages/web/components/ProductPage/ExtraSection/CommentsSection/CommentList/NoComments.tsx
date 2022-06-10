import { WriteContentIcon } from "@/components/icons/product-page/WriteContentIcon";
import React from "react";

export const NoComments: React.FC = () => (
  <div className="mt-16 flex flex-col items-center justify-center gap-2 p-4">
    <WriteContentIcon className="mb-4 w-9 text-[#41b5d3]" />
    <h3 className="text-center text-xl font-bold">Nenhum comentário aqui</h3>
    <p className="text-center">
      Comente primeiro e contribua com a comunidade.
    </p>
  </div>
);
