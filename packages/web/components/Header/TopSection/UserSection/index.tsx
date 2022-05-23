import { Button } from "@/components/Button";
import { useModalContext } from "@/contexts/ModalContext";
import { useUser } from "@/hooks/useUser";
import React from "react";
import { UserButtons } from "./UserButtons";

export const UserSection: React.FC = () => {
  const { toggleModal } = useModalContext();
  const { isLoggedIn } = useUser();

  return isLoggedIn ? (
    <UserButtons />
  ) : (
    <Button onClick={() => toggleModal(true, "register-login")}>
      Cadastrar
    </Button>
  );
};
