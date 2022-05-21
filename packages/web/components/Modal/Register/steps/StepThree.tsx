import { Input } from "@/components/Input";
import React from "react";
import { Step } from ".";
import { PanelProps } from "../../RegisterOrLogin/Panel";

export const StepThree: React.FC<PanelProps> = ({ type }) => (
  <Step
    heading="Crie uma senha."
    submitText={type === "register" ? "cadastrar" : "entrar"}
    field="password"
  >
    <Input
      type="password"
      name="password"
      placeholder={
        type === "register"
          ? "Uma senha para entrar no Pelando Clone"
          : "A mesma senha do cadastro"
      }
      autoFocus
    />
  </Step>
);
