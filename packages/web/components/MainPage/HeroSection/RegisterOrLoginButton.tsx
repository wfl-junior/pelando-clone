import { useModalContext } from "@/contexts/ModalContext";
import React from "react";

interface RegisterOrLoginButtonProps {
  children?: React.ReactNode;
}

export const RegisterOrLoginButton: React.FC<RegisterOrLoginButtonProps> = ({
  children,
}) => {
  const { toggleModal } = useModalContext();

  return (
    <button
      onClick={() => toggleModal(true, "register-login")}
      className="text-primary hover:text-primary-hover underline transition-colors"
    >
      {children}
    </button>
  );
};
