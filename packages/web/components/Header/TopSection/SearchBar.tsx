import { ArrowLeftIcon } from "@/components/icons/header/top/ArrowLeftIcon";
import { SearchIcon } from "@/components/icons/header/top/SearchIcon";
import { SearchOptionIcon } from "@/components/icons/header/top/SearchOptionIcon";
import { Combobox } from "@headlessui/react";
import classNames from "classnames";
import React, { useState } from "react";

// TODO: mover para busca de api
const mostSearchedTerms = [
  "Galaxy Watch",
  "notebook",
  "iphone",
  "bug",
  "Smartphone",
  "monitor",
  "placa de vídeo",
  "tv",
];

// TODO: implementar redirect para página de pesquisa quando criar

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <Combobox
      as="div"
      value=""
      onChange={value => setQuery(value)}
      className={classNames("md:relative md:flex-grow", {
        "bg-default-background dark:bg-dark-default-background absolute inset-x-0 z-40":
          open,
      })}
    >
      <div className="flex items-center gap-2 md:contents">
        {open && (
          <button
            className="aspect-square w-6 rounded-full md:hidden"
            onClick={() => setOpen(false)}
          >
            <ArrowLeftIcon className="w-6" />
          </button>
        )}

        {/* before para border bottom com overflow */}
        <div
          className={classNames(
            "before:border-default-foreground bg-input-background dark:bg-dark-input-background relative w-full overflow-hidden rounded-full before:absolute before:inset-x-0 before:bottom-0 before:z-10 focus-within:before:border-b md:block md:animate-none",
            open ? "animate-grow-search-bar" : "hidden",
          )}
        >
          {/* TODO: adicionar animação para <md */}
          <Combobox.Input
            type="text"
            className="text-default-foreground dark:text-dark-default-foreground w-full rounded-full bg-inherit py-1.5 pr-9 pl-4 focus:outline-none"
            placeholder="Procure por promoções ou lojas"
            autoComplete="off"
            value={query}
            onChange={e => setQuery(e.target.value)}
            displayValue={() => query}
          />
        </div>

        <Combobox.Button
          className={classNames(
            "bg-input-background dark:bg-dark-input-background flex aspect-square w-9 cursor-pointer items-center justify-center rounded-full md:absolute md:inset-y-0 md:right-1",
            { "absolute inset-y-0 right-1": open },
          )}
          onClick={() => setOpen(true)}
        >
          <SearchIcon className="w-6" />
        </Combobox.Button>
      </div>

      {/* TODO: Adicionar parte de recentes e aparecer com input focus */}
      <Combobox.Options className="md:bg-default-background md:dark:bg-dark-default-background bg-default-background/95 dark:bg-dark-default-background/95 md:border-secondary-button fixed inset-0 top-12 z-50 overflow-hidden rounded-xl py-3 px-2 md:absolute md:inset-auto md:top-full md:w-full md:border md:shadow-md">
        <div className="before:bg-inactive-background dark:before:bg-dark-inactive-background relative my-1.5 text-center before:absolute before:inset-x-0 before:top-[55%] before:-z-10 before:h-[1px]">
          <span className="text-secondary-foreground bg-default-background dark:bg-dark-default-background z-10 px-6 text-[10px] font-bold uppercase md:text-xs">
            Mais Buscados
          </span>
        </div>

        {mostSearchedTerms.map(term => (
          <Combobox.Option
            key={term}
            value={term}
            className={({ active }) =>
              classNames(
                "flex cursor-pointer items-center gap-2 rounded-xl bg-inherit py-1.5",
                active
                  ? "bg-secondary-foreground/10 dark:bg-dark-secondary-foreground/10"
                  : "bg-inherit",
              )
            }
          >
            <SearchOptionIcon className="w-6" />
            <span>{term}</span>
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
};
