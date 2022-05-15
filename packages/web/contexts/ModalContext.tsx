import React, { createContext, useCallback, useContext, useState } from "react";

type Open = boolean;
type Content = JSX.Element | null;

interface IModalContext {
  open: Open;
  content: Content;
  toggleModal: (_open?: Open, _content?: Content) => void;
}

const ModalContext = createContext({} as IModalContext);

export const useModalContext = () => useContext(ModalContext);

export const ModalContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [open, setOpen] = useState<Open>(false);
  const [content, setContent] = useState<Content>(null);

  const toggleModal: IModalContext["toggleModal"] = useCallback(
    (_open, _content = null) => {
      setOpen(open => (typeof _open === "undefined" ? open : _open));
      setContent(_content);
    },
    [],
  );

  return (
    <ModalContext.Provider value={{ open, content, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};
