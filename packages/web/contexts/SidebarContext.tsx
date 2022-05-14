import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";

interface ISidebarContext {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  appBarRef: React.RefObject<HTMLDivElement>;
}

const SidebarContext = createContext({} as ISidebarContext);

export const useSidebarContext = () => useContext(SidebarContext);

export const SidebarContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const appBarRef = useRef<HTMLDivElement>(null);

  return (
    <SidebarContext.Provider value={{ open, setOpen, appBarRef }}>
      {children}
    </SidebarContext.Provider>
  );
};
