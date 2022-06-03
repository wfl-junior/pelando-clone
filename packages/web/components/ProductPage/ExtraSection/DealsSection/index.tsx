import React from "react";
import { SliderContainer } from "./Slider";

export const DealsSection: React.FC = () => (
  <section
    className="border-default-border container overflow-hidden border-t-2 py-6 lg:px-0"
    style={{ gridArea: "deals" }}
  >
    <h2 className="text-xl font-bold md:text-2xl">Promoções Pelando</h2>

    <p className="text-secondary-foreground mb-3 mt-1 text-xs font-bold md:text-sm">
      As mais quentes da comunidade
    </p>

    <SliderContainer />
  </section>
);
