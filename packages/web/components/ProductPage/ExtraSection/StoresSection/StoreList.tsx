import { Skeleton } from "@/components/Skeleton";
import { defaultErrorMessage } from "@/constants";
import { useStoresQuery } from "@/hooks/apollo/queries/useStoresQuery";
import Link from "next/link";
import React from "react";

export const StoreList: React.FC = () => {
  const { data, loading, error } = useStoresQuery();

  if (loading) {
    return (
      <ul className="flex animate-pulse flex-wrap gap-1.5">
        {Array.from({ length: 20 }, (_, i) => i).map(number => (
          <li key={number}>
            <Skeleton
              className="h-[2.875rem] w-20"
              style={{ borderRadius: "0.25rem" }}
            />
          </li>
        ))}
      </ul>
    );
  }

  if (!data || error) {
    return <span className="font-bold">{defaultErrorMessage}</span>;
  }

  return (
    <ul className="flex flex-wrap gap-1.5">
      {data.stores.stores.edges.map(({ id, name }) => (
        <li key={id}>
          <Link href="#">
            <a className="bg-default-background border-default-border hover:text-tertiary-foreground block whitespace-nowrap rounded border px-2 py-2.5 font-bold shadow transition-colors">
              {name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
