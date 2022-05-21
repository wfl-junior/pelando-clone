import { Input } from "@/components/Input";
import React from "react";
import { Step } from ".";
import { PanelProps } from "../Panel";

export const StepThree: React.FC<PanelProps> = ({ type }) => (
  <Step
    heading="Crie uma senha."
    submitText={type === "register" ? "cadastrar" : "entrar"}
  >
    <Input
      type="password"
      name="password"
      placeholder="Uma senha para entrar no Pelando Clone"
      autoFocus
    />
  </Step>
);
