import { useUser } from "@/hooks/useUser";
import React, { Fragment } from "react";
import { RegisterOrLoginButton } from "./RegisterOrLoginButton";

export const HeadingSection: React.FC = () => {
  const { isLoggedIn } = useUser();

  return (
    <Fragment>
      <h2 className="text-xl font-bold">O que é o Pelando?</h2>

      <p>
        Uma plataforma para encontrar promoções e tirar dúvidas.
        {!isLoggedIn && (
          <Fragment>
            &nbsp;
            <RegisterOrLoginButton>Faça parte!</RegisterOrLoginButton>
          </Fragment>
        )}
      </p>
    </Fragment>
  );
};
