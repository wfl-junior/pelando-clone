import { useModalContext } from "@/contexts/ModalContext";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { useThemeContext } from "@/contexts/ThemeContext";
import React from "react";
import { MoonIcon } from "../icons/sidebar/MoonIcon";
import { SunIcon } from "../icons/sidebar/SunIcon";

export const ThemeTogglerButton: React.FC = () => {
  const { setOpen } = useSidebarContext();
  const { toggleModal } = useModalContext();
  const { theme } = useThemeContext();

  return (
    <button
      className="flex items-center gap-2 font-bold"
      onClick={() => {
        setOpen(false);
        toggleModal(true, "theme-toggler");
      }}
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
