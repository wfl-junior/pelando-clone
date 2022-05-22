import { Product } from "@/@types/api";
import { EsfriarIcon } from "@/components/icons/product-card/EsfriarIcon";
import { EsquentarIcon } from "@/components/icons/product-card/EsquentarIcon";
import classNames from "classnames";
import React from "react";

interface TemperatureSectionProps {
  temperature: Product["temperature"];
}

export const TemperatureSection: React.FC<TemperatureSectionProps> = ({
  temperature,
}) => {
  return (
    <div className="border-default-border flex items-center gap-1 rounded-full border bg-transparent p-1.5">
      <button
        title="Esfriar"
        className="hover:bg-secondary-background hover:text-blue flex aspect-square w-6 items-center justify-center rounded-full transition-colors"
      >
        <EsfriarIcon className="w-4.5" />
      </button>

      <span
        className={classNames("font-bold", {
          "text-primary": temperature >= 350 && temperature < 1000,
          "text-red": temperature >= 1000,
          "text-blue": temperature < 0,
        })}
      >
        {Math.floor(temperature)}º
      </span>

      <button
        title="Esquentar"
        className="hover:bg-secondary-background hover:text-primary flex aspect-square w-6 items-center justify-center rounded-full transition-colors"
      >
        <EsquentarIcon className="w-5" />
      </button>
    </div>
  );
};
