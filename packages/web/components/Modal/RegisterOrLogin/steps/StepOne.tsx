import { Input } from "@/components/Input";
import React from "react";
import { Step } from ".";
import { PanelProps } from "../Panel";

export const StepOne: React.FC<PanelProps> = () => (
  <Step heading="Qual é o seu e-mail?">
    <Input
      type="email"
      name="email"
      placeholder="ex.: pelando@clone.com"
      autoFocus
    />
  </Step>
);
