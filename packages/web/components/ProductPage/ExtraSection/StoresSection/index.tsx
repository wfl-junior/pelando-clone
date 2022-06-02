import React from "react";
import { StoreList } from "./StoreList";

export const StoresSection: React.FC = () => (
  <section
    className="container flex flex-col gap-2 py-4 lg:p-0"
    style={{ gridArea: "stores" }}
  >
    <h2 className="text-2xl font-bold">Lojas em destaque</h2>

    <p className="text-secondary-foreground text-sm">
      As melhores segundo a comunidade
    </p>

    <StoreList />
  </section>
);
