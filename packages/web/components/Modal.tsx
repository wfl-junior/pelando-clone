import { useModalContext } from "@/contexts/ModalContext";
import React from "react";

export const Modal: React.FC = () => {
  const { open, content, toggleModal } = useModalContext();

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
      onClick={e => {
        // para fechar se clicar na overlay
        if (e.target === e.currentTarget) {
          toggleModal(false);
        }
      }}
    >
      {content}
    </div>
  );
};
