import { SignOutIcon } from "@/components/icons/header/top/SignOutIcon";
import { Spinner } from "@/components/Spinner";
import { useLogoutMutation } from "@/hooks/apollo/mutations/useLogoutMutation";
import React from "react";

export const LogoutButton: React.FC = () => {
  const [logoutMutation, { loading }] = useLogoutMutation();

  return (
    <button
      disabled={loading}
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

      {loading ? (
        <Spinner className="w-4 before:w-3/5" color="secondary-foreground" />
      ) : (
        <SignOutIcon className="w-4" />
      )}
    </button>
  );
};
