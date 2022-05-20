import { useModalContext } from "@/contexts/ModalContext";
import { useSidebarContext } from "@/contexts/SidebarContext";
import React from "react";
import { SignInIcon } from "../icons/sidebar/SignInIcon";

export const RegisterLoginTogglerButton: React.FC = () => {
  const { setOpen } = useSidebarContext();
  const { toggleModal } = useModalContext();

  return (
    <button
      className="flex items-center gap-2 font-bold"
      onClick={() => {
        setOpen(false);
        toggleModal(true, "register-login");
      }}
    >
      <span className="font-arial">Cadastrar</span>

      <SignInIcon className="w-4" />
    </button>
  );
};
