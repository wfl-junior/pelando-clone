import React from "react";
import { NavigationSection } from "./NavigationSection";
import { TopSection } from "./TopSection";

export const Header: React.FC = () => (
  <header className="bg-default-background sticky top-0 z-30 flex flex-col gap-2 pt-3 shadow-lg">
    <div className="container flex flex-col gap-2">
      <TopSection />
      <NavigationSection />
    </div>
  </header>
);
