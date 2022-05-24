import { SignOutIcon } from "@/components/icons/header/top/SignOutIcon";
import { useLogoutMutation } from "@/hooks/apollo/useLogoutMutation";
import React from "react";

export const LogoutButton: React.FC = () => {
  const [logoutMutation] = useLogoutMutation();

  return (
    <button
      className="flex items-center gap-2 font-bold"
      onClick={async () => {
        try {
          await logoutMutation();
        } catch (error) {
          console.log({ error });
        }
      }}
    >
      <span className="font-arial">Sair</span>

      <SignOutIcon className="w-4" />
    </button>
  );
};
