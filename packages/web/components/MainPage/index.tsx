import { useStoresQuery } from "@/hooks/apollo/useStoresQuery";
import { useIsBreakpoint } from "@/hooks/useIsBreakpoint";
import Link from "next/link";
import React, { Fragment } from "react";
import { BasicLink } from "../BasicLink";
import { MainPageHeroImage } from "./MainPageHeroImage";

interface MainPageProps {
  children?: React.ReactNode;
}

export const MainPage: React.FC<MainPageProps> = ({ children }) => {
  const { data } = useStoresQuery();
  const isLargeBreakpoint = useIsBreakpoint("lg");

  return (
    <Fragment>
      <section
        className="bg-default-background border-default-border mb-6 grid grid-cols-[auto_1fr] gap-x-2 gap-y-2 rounded-sm border p-2 shadow-md lg:mb-8 lg:gap-x-8 lg:gap-y-4 lg:rounded-lg lg:p-4"
        style={{
          gridTemplateAreas: isLargeBreakpoint
            ? `"image heading" "image stores"`
            : `"image heading" "stores stores"`,
        }}
      >
        <div className="w-28 lg:my-auto lg:w-72" style={{ gridArea: "image" }}>
          <MainPageHeroImage className="w-full" />
        </div>

        <div
          className="flex flex-col p-2 lg:p-0"
          style={{ gridArea: "heading" }}
        >
          <h2 className="text-xl font-bold">O que é o Pelando?</h2>

          <p>
            Uma plataforma para encontrar promoções e tirar dúvidas.{" "}
            <BasicLink href="#">Faça parte!</BasicLink>
          </p>
        </div>

        <div
          className="flex flex-col gap-1 overflow-x-hidden"
          style={{ gridArea: "stores" }}
        >
          <h3 className="font-bold">Compre no site de suas lojas favoritas:</h3>

          <ul className="flex gap-1.5 overflow-x-auto lg:flex-wrap">
            {data!.stores.stores.edges.map(({ id, name }) => (
              <li key={id}>
                <Link href="#">
                  <a className="bg-default-background border-default-border hover:text-tertiary-foreground block whitespace-nowrap rounded border py-1.5 px-2 font-bold shadow transition-colors">
                    {name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {children}
    </Fragment>
  );
};
