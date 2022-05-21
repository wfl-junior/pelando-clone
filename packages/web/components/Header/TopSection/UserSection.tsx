import { Button } from "@/components/Button";
import { useModalContext } from "@/contexts/ModalContext";
import { useMeQuery } from "@/hooks/apollo/useMeQuery";
import React from "react";

export const UserSection: React.FC = () => {
  const { toggleModal } = useModalContext();
  const { data } = useMeQuery();

  return data?.me.user ? (
    <div>logged in</div>
  ) : (
    <Button onClick={() => toggleModal(true, "register-login")}>
      Cadastrar
    </Button>
  );
};
