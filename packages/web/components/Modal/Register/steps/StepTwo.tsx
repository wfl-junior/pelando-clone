import { Input } from "@/components/Input";
import React from "react";
import { Step } from ".";

export const StepTwo: React.FC = () => (
  <Step heading="Escolha um nome de usuário." field="username">
    <Input
      type="text"
      name="username"
      placeholder="ex.: pelando-clone"
      autoFocus
    />
  </Step>
);
