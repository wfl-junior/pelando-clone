import { Spinner } from "@/components/Spinner";
import React from "react";

export const Submitting: React.FC = () => (
  <div
    className="my-auto flex flex-col items-center justify-center gap-2"
    aria-busy="true"
    aria-live="assertive"
  >
    <Spinner className="w-9 before:w-4/5" />

    <p className="text-secondary-foreground text-sm">Carregando...</p>
  </div>
);
