import { useUser } from "@/hooks/useUser";
import React from "react";
import { LogoutButton } from "./LogoutButton";
import { RegisterOrLoginTogglerButton } from "./RegisterOrLoginTogglerButton";

export const RegisterOrLogoutButton: React.FC = () => {
  const { isLoggedIn } = useUser();

  if (isLoggedIn) {
    return <LogoutButton />;
  }

  return <RegisterOrLoginTogglerButton />;
};
