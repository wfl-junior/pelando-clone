import { useModalContext } from "@/contexts/ModalContext";
import React from "react";

export const CloseButton: React.FC = () => {
  const { toggleModal } = useModalContext();

  return (
    <button
      className="absolute top-1/2 right-4 -translate-y-1/2 transform text-3xl font-semibold"
      onClick={() => toggleModal(false)}
    >
      &times;
    </button>
  );
};
