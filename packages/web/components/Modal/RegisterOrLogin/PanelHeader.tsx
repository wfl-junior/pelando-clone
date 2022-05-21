import React from "react";
import { CloseButton } from "./CloseButton";
import { PanelProps } from "./Panel";

interface PanelHeaderProps extends PanelProps {
  children?: React.ReactNode;
}

export const PanelHeader: React.FC<PanelHeaderProps> = ({ type, children }) => (
  <div className="border-default-border relative flex items-center justify-center border-b p-4">
    {children}

    <h2 className="font-bold md:text-xl">
      {type === "register" ? "Cadastrar" : "Entrar"}
    </h2>

    <CloseButton />
  </div>
);
