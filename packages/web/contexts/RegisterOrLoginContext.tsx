import { SetStateCallback, useStateCallback } from "@/hooks/useStateCallback";
import React, { createContext, useContext } from "react";

interface IRegisterOrLoginContext {
  step: number;
  setStep: SetStateCallback<number>;
}

const RegisterOrLoginContext = createContext({} as IRegisterOrLoginContext);

export const useRegisterOrLoginContext = () =>
  useContext(RegisterOrLoginContext);

export const RegisterOrLoginContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [step, setStep] = useStateCallback(0);

  return (
    <RegisterOrLoginContext.Provider value={{ step, setStep }}>
      {children}
    </RegisterOrLoginContext.Provider>
  );
};
