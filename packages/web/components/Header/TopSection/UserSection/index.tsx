import { Button } from "@/components/Button";
import { useModalContext } from "@/contexts/ModalContext";
import { useMeQuery } from "@/hooks/apollo/useMeQuery";
import React from "react";
import { UserButtons } from "./UserButtons";

export const UserSection: React.FC = () => {
  const { toggleModal } = useModalContext();
  const { data } = useMeQuery();

  return data?.me.user ? (
    <UserButtons />
  ) : (
    <Button onClick={() => toggleModal(true, "register-login")}>
      Cadastrar
    </Button>
  );
};
