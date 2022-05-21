import React from "react";
import { BackButton } from "./BackButton";
import { CloseButton } from "./CloseButton";
import { PanelProps } from "./Panel";

interface PanelHeaderProps extends PanelProps {
  isLastStep: boolean;
}

export const PanelHeader: React.FC<PanelHeaderProps> = ({
  type,
  isLastStep,
}) => (
  <div className="border-default-border relative flex items-center justify-center border-b p-4">
    {!isLastStep && <BackButton />}

    <h2 className="font-bold md:text-xl">
      {type === "register" ? "Cadastrar" : "Entrar"}
    </h2>

    <CloseButton />
  </div>
);
