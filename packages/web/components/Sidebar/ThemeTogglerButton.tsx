import { useThemeContext } from "@/contexts/ThemeContext";
import { useThemeTogglerContext } from "@/contexts/ThemeTogglerContext";
import React from "react";
import { MoonIcon } from "../icons/sidebar/MoonIcon";
import { SunIcon } from "../icons/sidebar/SunIcon";

export const ThemeTogglerButton: React.FC = () => {
  const { theme } = useThemeContext();
  const { setOpen } = useThemeTogglerContext();

  return (
    <button
      className="flex items-center gap-2 font-bold"
      onClick={() => setOpen(true)}
    >
      {theme === "dark" ? (
        <SunIcon className="w-4" />
      ) : (
        <MoonIcon className="w-4" />
      )}

      <span className="font-arial">
        {theme === "dark" ? "Tema claro" : "Tema escuro"}
      </span>
    </button>
  );
};
