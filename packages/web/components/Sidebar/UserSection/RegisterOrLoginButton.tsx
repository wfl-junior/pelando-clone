import { useModalContext } from "@/contexts/ModalContext";
import { useSidebarContext } from "@/contexts/SidebarContext";
import React from "react";

interface RegisterOrLoginButtonProps {
  children?: React.ReactNode;
  type: "register" | "login";
}

export const RegisterOrLoginButton: React.FC<RegisterOrLoginButtonProps> = ({
  children,
  type,
}) => {
  const { setOpen } = useSidebarContext();
  const { toggleModal } = useModalContext();

  return (
    <button
      className="hover:text-tertiary-foreground font-bold transition-colors"
      onClick={() => {
        setOpen(false);
        toggleModal(true, "register-login", {
          initialTab: type === "register" ? 0 : 1,
        });
      }}
    >
      {children}
    </button>
  );
};
