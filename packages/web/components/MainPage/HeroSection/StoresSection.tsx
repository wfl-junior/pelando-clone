import { Skeleton } from "@/components/Skeleton";
import { defaultErrorMessage } from "@/constants";
import { useStoresQuery } from "@/hooks/apollo/queries/useStoresQuery";
import Link from "next/link";
import React, { Fragment } from "react";

export const StoresSection: React.FC = () => {
  const { data, loading, error } = useStoresQuery();

  if (loading) {
    return (
      <div className="flex animate-pulse flex-col gap-6">
        <Skeleton className="h-2.5 w-1/3" />

        <ul className="flex gap-1.5 overflow-x-auto lg:flex-wrap">
          {Array.from({ length: 28 }, (_, i) => i + 1).map(number => (
            <li key={number}>
              <Skeleton
                className="h-9 w-16"
                style={{ borderRadius: "0.25rem" }}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (error) {
    return <h3 className="font-bold">{defaultErrorMessage}</h3>;
  }

  return (
    <Fragment>
      <h3 className="font-bold">Compre no site de suas lojas favoritas:</h3>

      <ul className="flex gap-1.5 overflow-x-auto lg:flex-wrap">
        {data?.stores.stores.edges.map(({ id, name }) => (
          <li key={id}>
            <Link href="#">
              <a className="bg-default-background border-default-border hover:text-tertiary-foreground block whitespace-nowrap rounded border py-1.5 px-2 font-bold shadow transition-colors">
                {name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};
