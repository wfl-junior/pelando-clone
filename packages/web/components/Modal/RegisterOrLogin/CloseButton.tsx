import { useModalContext } from "@/contexts/ModalContext";
import React from "react";

export const CloseButton: React.FC = () => {
  const { toggleModal } = useModalContext();

  return (
    <button
      className="absolute top-2.5 right-3.5 text-3xl font-semibold"
      onClick={() => toggleModal(false)}
    >
      &times;
    </button>
  );
};
