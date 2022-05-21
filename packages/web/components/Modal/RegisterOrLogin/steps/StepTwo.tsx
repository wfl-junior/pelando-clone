import { Input } from "@/components/Input";
import React from "react";
import { Step } from ".";
import { PanelProps } from "../Panel";

export const StepTwo: React.FC<PanelProps> = () => (
  <Step heading="Escolha um nome de usuário.">
    <Input
      type="text"
      name="username"
      placeholder="ex.: pelando-clone"
      autoFocus
    />
  </Step>
);
