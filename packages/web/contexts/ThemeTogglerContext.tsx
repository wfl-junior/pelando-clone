import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface IThemeTogglerContext {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ThemeTogglerContext = createContext({} as IThemeTogglerContext);

export const useThemeTogglerContext = () => useContext(ThemeTogglerContext);

export const ThemeTogglerContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <ThemeTogglerContext.Provider value={{ open, setOpen }}>
      {children}
    </ThemeTogglerContext.Provider>
  );
};
