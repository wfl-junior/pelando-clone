import { useMeQuery } from "@/hooks/apollo/useMeQuery";
import React from "react";
import { LogoutButton } from "./LogoutButton";
import { RegisterOrLoginTogglerButton } from "./RegisterOrLoginTogglerButton";

export const RegisterOrLogoutButton: React.FC = () => {
  const { data } = useMeQuery();

  if (data?.me.user) {
    return <LogoutButton />;
  }

  return <RegisterOrLoginTogglerButton />;
};
