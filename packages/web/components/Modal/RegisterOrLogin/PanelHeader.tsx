import React from "react";
import { BackButton } from "./BackButton";
import { CloseButton } from "./CloseButton";
import { PanelProps } from "./Panel";

export const PanelHeader: React.FC<PanelProps> = ({ type }) => (
  <div className="border-default-border relative flex items-center justify-center border-b p-4">
    <BackButton />

    <h2 className="font-bold md:text-xl">
      {type === "register" ? "Cadastrar" : "Entrar"}
    </h2>

    <CloseButton />
  </div>
);
