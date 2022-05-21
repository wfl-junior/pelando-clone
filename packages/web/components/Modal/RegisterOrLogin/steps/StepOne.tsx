import { Input } from "@/components/Input";
import React from "react";
import { Step } from ".";

export const StepOne: React.FC = () => (
  <Step heading="Qual é o seu e-mail?" field="email">
    <Input
      type="email"
      name="email"
      placeholder="ex.: pelando@clone.com"
      autoFocus
    />
  </Step>
);
