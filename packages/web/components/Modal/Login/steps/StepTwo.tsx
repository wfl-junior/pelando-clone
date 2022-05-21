import { Input } from "@/components/Input";
import React from "react";
import { Step } from ".";

export const StepTwo: React.FC = () => (
  <Step heading="Qual é a sua senha?" submitText="entrar" field="password">
    <Input
      type="password"
      name="password"
      placeholder="A mesma senha do cadastro"
      autoFocus
    />
  </Step>
);
