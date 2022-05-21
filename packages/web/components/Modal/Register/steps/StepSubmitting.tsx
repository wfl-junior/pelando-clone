import React from "react";

export const StepSubmitting: React.FC = () => (
  <div
    className="flex flex-col items-center justify-center gap-2"
    aria-busy="true"
    aria-live="assertive"
  >
    {/* spinner */}
    <div
      aria-label="spinner"
      className="before:bg-default-background flex aspect-square w-9 animate-spin items-center justify-center rounded-full before:aspect-square before:w-4/5 before:rounded-full"
      style={{
        animationDuration: "0.7s",
        background:
          "linear-gradient(to bottom, rgb(var(--color-primary)) 0%, transparent 85%)",
      }}
    ></div>

    <p className="text-secondary-foreground text-sm">Carregando...</p>
  </div>
);
