import React, { createContext, useContext, useState } from "react";

interface IRegisterOrLoginContext {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const RegisterOrLoginContext = createContext({} as IRegisterOrLoginContext);

export const useRegisterOrLoginContext = () =>
  useContext(RegisterOrLoginContext);

export const RegisterOrLoginContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [step, setStep] = useState(0);

  return (
    <RegisterOrLoginContext.Provider value={{ step, setStep }}>
      {children}
    </RegisterOrLoginContext.Provider>
  );
};
