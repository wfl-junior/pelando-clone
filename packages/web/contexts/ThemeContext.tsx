import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { isBrowser } from "@/utils/isBrowser";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from "react";

export type Theme = "light" | "dark" | null;

interface IThemeContext {
  theme: Exclude<Theme, null>;
  _theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

const ThemeContext = createContext({} as IThemeContext);

export const useThemeContext = () => useContext(ThemeContext);

function getOSPrefersDark(): boolean {
  return (
    isBrowser() && window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

export const ThemeContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [theme, setTheme] = useLocalStorageState<Theme>("theme", null);

  useEffect(() => {
    // tema null significa preferência do sistema
    // se tema for dark ou null com preferência dark adiciona classe dark
    if (theme === "dark" || (theme === null && getOSPrefersDark())) {
      return document.body.classList.add("dark");
    }

    document.body.classList.remove("dark");
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme: theme || (getOSPrefersDark() ? "dark" : "light"),
        _theme: theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
