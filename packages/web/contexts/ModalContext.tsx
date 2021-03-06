import { Login } from "@/components/Modal/Login";
import { Register } from "@/components/Modal/Register";
import { RegisterOrLogin } from "@/components/Modal/RegisterOrLogin";
import { ThemeToggler } from "@/components/Modal/ThemeToggler";
import React, { createContext, useCallback, useContext, useState } from "react";
import { RegisterOrLoginContextProvider } from "./RegisterOrLoginContext";

type Open = boolean;
type Content = JSX.Element | null;

interface IModalContext {
  open: Open;
  content: Content;
  toggleModal: (
    open?: Open,
    type?: "theme-toggler" | "register-login" | "register" | "login",
    props?: Record<string, any>,
  ) => void;
}

const ModalContext = createContext({} as IModalContext);

export const useModalContext = () => useContext(ModalContext);

export const ModalContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [open, setOpen] = useState<Open>(false);
  const [content, setContent] = useState<Content>(null);

  const toggleModal: IModalContext["toggleModal"] = useCallback(
    (_open, type, props = {}) => {
      setOpen(open => (typeof _open === "undefined" ? open : _open));

      switch (type) {
        case "theme-toggler": {
          setContent(<ThemeToggler />);
          break;
        }
        case "register-login": {
          setContent(<RegisterOrLogin {...props} />);
          break;
        }
        case "register": {
          setContent(
            <RegisterOrLoginContextProvider>
              <Register />
            </RegisterOrLoginContextProvider>,
          );
          break;
        }
        case "login": {
          setContent(
            <RegisterOrLoginContextProvider>
              <Login />
            </RegisterOrLoginContextProvider>,
          );
          break;
        }
      }
    },
    [],
  );

  return (
    <ModalContext.Provider value={{ open, content, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};
