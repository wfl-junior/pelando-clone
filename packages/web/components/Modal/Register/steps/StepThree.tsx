import { Input } from "@/components/Input";
import React from "react";
import { Step } from ".";

export const StepThree: React.FC = () => (
  <Step heading="Crie uma senha." submitText="cadastrar" field="password">
    <Input
      type="password"
      name="password"
      placeholder="Uma senha para entrar no Pelando Clone"
      autoFocus
    />
  </Step>
);
