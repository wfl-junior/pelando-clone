import { useModalContext } from "@/contexts/ModalContext";
import { useSidebarContext } from "@/contexts/SidebarContext";
import React from "react";

interface RegisterOrLoginButtonProps {
  children?: React.ReactNode;
}

export const RegisterOrLoginButton: React.FC<RegisterOrLoginButtonProps> = ({
  children,
}) => {
  const { setOpen } = useSidebarContext();
  const { toggleModal } = useModalContext();

  return (
    <button
      className="font-bold"
      onClick={() => {
        setOpen(false);
        toggleModal(true, "register-login");
      }}
    >
      {children}
    </button>
  );
};
