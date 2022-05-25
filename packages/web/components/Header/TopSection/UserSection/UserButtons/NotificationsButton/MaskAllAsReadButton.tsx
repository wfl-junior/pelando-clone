import React from "react";

export const MaskAllAsReadButton: React.FC = () => (
  <div className="border-default-border flex items-center border-b border-t px-4 md:border-t-0">
    <button
      type="button"
      className="ml-auto justify-self-end py-2 text-xs font-bold md:text-sm"
    >
      marcar tudo como lido
    </button>
  </div>
);
