import { useProductForProductPage } from "@/hooks/useProductForProductPage";
import React from "react";
import { AlertButton } from "./AlertButton";

const notAllowed = [
  "por",
  "para",
  "partir",
  "sem",
  "sob",
  "sobre",
  "trás",
  "cima",
  "embaixo",
  "contra",
  "até",
  "desde",
  "ante",
  "após",
  "entre",
  "perante",
  "per",
  "com",
];

export const AlertsSection: React.FC = () => {
  const { title } = useProductForProductPage();

  const suggestions = Array.from(
    new Set(title.match(/[a-z0-9áàâãéèêíïóôõöúçñ]+/gi)),
  ).filter(
    suggestion =>
      suggestion.length > 2 &&
      !suggestion.match(/^[0-9]+$/) &&
      !notAllowed.includes(suggestion.toLowerCase()),
  );

  return (
    <section className="container lg:px-0" style={{ gridArea: "alerts" }}>
      <div className="bg-default-background border-default-border flex flex-col rounded-md border p-3 shadow md:px-8">
        <h2 className="font-bold md:text-xl">Crie um alerta de desejo</h2>

        <p className="text-secondary-foreground text-xs md:text-sm">
          E avisamos quando houver promoção
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {suggestions.map(suggestion => (
            <AlertButton key={suggestion} title={suggestion} />
          ))}

          <AlertButton title="Personalizar Alerta" />
        </div>
      </div>
    </section>
  );
};
