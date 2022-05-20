import { useModalContext } from "@/contexts/ModalContext";
import React, { useEffect } from "react";

export const Modal: React.FC = () => {
  const { open, content, toggleModal } = useModalContext();

  // para fechar com keydown esc
  useEffect(() => {
    if (open) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key.toLowerCase() === "escape") {
          toggleModal(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [open]);

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
