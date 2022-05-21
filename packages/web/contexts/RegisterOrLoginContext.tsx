import { SetStateCallback, useStateCallback } from "@/hooks/useStateCallback";
import React, { createContext, useContext, useRef } from "react";

interface IRegisterOrLoginContext {
  registerTabButtonRef: React.RefObject<HTMLButtonElement>;
  loginTabButtonRef: React.RefObject<HTMLButtonElement>;
  step: number;
  setStep: SetStateCallback<number>;
}

const RegisterOrLoginContext = createContext({} as IRegisterOrLoginContext);

export const useRegisterOrLoginContext = () =>
  useContext(RegisterOrLoginContext);

export const RegisterOrLoginContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const registerTabButtonRef = useRef<HTMLButtonElement>(null);
  const loginTabButtonRef = useRef<HTMLButtonElement>(null);
  const [step, setStep] = useStateCallback(0);

  return (
    <RegisterOrLoginContext.Provider
      value={{
        registerTabButtonRef,
        loginTabButtonRef,
        step,
        setStep,
      }}
    >
      {children}
    </RegisterOrLoginContext.Provider>
  );
};
