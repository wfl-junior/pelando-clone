import { SearchIcon } from "@/components/icons/SearchIcon";
import { SearchOptionIcon } from "@/components/icons/SearchOptionIcon";
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

  return (
    <Combobox
      as="div"
      value=""
      onChange={value => setQuery(value)}
      className="relative md:flex-grow"
    >
      <Combobox.Input
        type="text"
        className="bg-input-background dark:bg-dark-input-background hidden w-full rounded-full py-1.5 pr-9 pl-4 focus:outline-none md:block"
        placeholder="Procure por promoções ou lojas"
        autoComplete="off"
        value={query}
        onChange={e => setQuery(e.target.value)}
        displayValue={() => query}
      />

      <Combobox.Button className="bg-input-background dark:bg-dark-input-background flex aspect-square w-9 cursor-pointer items-center justify-center rounded-full md:absolute md:inset-y-0 md:right-1">
        <SearchIcon className="w-6" />
      </Combobox.Button>

      {/* TODO: Adicionar parte de recentes e aparecer com input focus */}
      {/* before para border top com overflow */}
      <Combobox.Options className="bg-default-background dark:bg-dark-default-background border-secondary-button before:border-default-foreground absolute top-full z-10 w-full overflow-hidden rounded-xl border py-3 px-2 shadow-md before:absolute before:inset-x-0 before:top-0 before:border-t">
        <div className="before:bg-inactive-background dark:before:bg-dark-inactive-background relative my-1.5 text-center before:absolute before:inset-x-0 before:top-[55%] before:-z-10 before:h-[1px]">
          <span className="text-secondary-foreground bg-default-background dark:bg-dark-default-background z-10 px-6 text-xs font-bold uppercase">
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
