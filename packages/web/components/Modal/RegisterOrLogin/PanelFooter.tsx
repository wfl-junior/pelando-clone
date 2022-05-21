import { useModalContext } from "@/contexts/ModalContext";
import React from "react";
import { PanelProps } from "./Panel";

interface PanelFooterProps extends PanelProps {
  onClick?: () => any | Promise<any>;
}

export const PanelFooter: React.FC<PanelFooterProps> = ({ type, onClick }) => {
  const { toggleModal } = useModalContext();

  return (
    <div className="border-default-border flex items-center justify-center border-t p-4">
      <p className="text-sm">
        {type === "register" ? "Já tem uma conta?" : "Não tem uma conta?"}
        &nbsp;
        <button
          className="font-bold underline"
          onClick={() => {
            if (onClick) {
              return onClick();
            }

            toggleModal(true, "register-login", {
              initialTab: type === "register" ? 1 : 0,
            });
          }}
        >
          {type === "register" ? "Entrar" : "Cadastrar"}
        </button>
      </p>
    </div>
  );
};
