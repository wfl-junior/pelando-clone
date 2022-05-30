import React from "react";
import { MainPageHeroImage } from "../MainPageHeroImage";
import { HeadingSection } from "./HeadingSection";
import { StoresSection } from "./StoresSection";

export const HeroSection: React.FC = () => (
  <section className="bg-default-background border-default-border grid-template-areas-hero grid grid-cols-[auto_1fr] gap-x-2 gap-y-2 rounded-sm border p-2 shadow-md lg:gap-x-8 lg:gap-y-4 lg:rounded-lg lg:p-4">
    <div className="w-28 lg:my-auto lg:w-72" style={{ gridArea: "image" }}>
      <MainPageHeroImage className="w-full" />
    </div>

    <div className="flex flex-col p-2 lg:p-0" style={{ gridArea: "heading" }}>
      <HeadingSection />
    </div>

    <div
      className="flex flex-col gap-1 overflow-x-hidden"
      style={{ gridArea: "stores" }}
    >
      <StoresSection />
    </div>
  </section>
);
