import { ArrowRightIcon } from "@/components/icons/register-or-login-modal/ArrowRightIcon";
import { useModalContext } from "@/contexts/ModalContext";
import React from "react";
import { PanelProps } from ".";
import { AuthButton } from "./AuthButton";

export const EmailButton: React.FC<PanelProps> = ({ type }) => {
  const { toggleModal } = useModalContext();

  return (
    <AuthButton
      className="bg-primary hover:bg-primary-hover border-primary hover:border-primary-hover text-white"
      iconPosition="right"
      Icon={ArrowRightIcon}
      onClick={() => toggleModal(true, type)}
    >
      Continuar com o e-mail
    </AuthButton>
  );
};
