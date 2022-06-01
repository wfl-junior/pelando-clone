import { useModalContext } from "@/contexts/ModalContext";
import { useUser } from "@/hooks/useUser";
import React from "react";

interface FollowButtonProps {}

export const FollowButton: React.FC<FollowButtonProps> = () => {
  const { isLoggedIn } = useUser();
  const { toggleModal } = useModalContext();

  return (
    <button
      type="button"
      className="border-default-border min-w-[135px] rounded-full border py-2 text-sm font-bold"
      onClick={() => {
        if (!isLoggedIn) {
          return toggleModal(true, "register-login");
        }
      }}
    >
      Seguir
    </button>
  );
};
