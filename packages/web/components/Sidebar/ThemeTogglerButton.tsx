import { useModalContext } from "@/contexts/ModalContext";
import { useThemeContext } from "@/contexts/ThemeContext";
import React from "react";
import { MoonIcon } from "../icons/sidebar/MoonIcon";
import { SunIcon } from "../icons/sidebar/SunIcon";
import { ThemeToggler } from "../ThemeToggler";

export const ThemeTogglerButton: React.FC = () => {
  const { theme } = useThemeContext();
  const { toggleModal } = useModalContext();

  return (
    <button
      className="flex items-center gap-2 font-bold"
      onClick={() => toggleModal(true, <ThemeToggler />)}
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
