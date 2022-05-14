import { Theme, useThemeContext } from "@/contexts/ThemeContext";
import { useThemeTogglerContext } from "@/contexts/ThemeTogglerContext";
import { RadioGroup } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment } from "react";
import { CheckIcon } from "./icons/CheckIcon";

interface Option {
  label: string;
  value: Theme;
}

const options: Option[] = [
  {
    label: "Tema automático (sistema)",
    value: null,
  },
  {
    label: "Tema escuro",
    value: "dark",
  },
  {
    label: "Tema claro",
    value: "light",
  },
];

// TODO: transferir para Modal component
export const ThemeToggler: React.FC = () => {
  const { open, setOpen } = useThemeTogglerContext();
  const { setTheme, _theme } = useThemeContext();

  if (!open) {
    return null;
  }

  return (
    <RadioGroup
      as="div"
      value={_theme}
      onChange={setTheme}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // para fechar se clicar na overlay
        if (e.target === e.currentTarget) {
          setOpen(false);
        }
      }}
    >
      <RadioGroup.Label className="sr-only">Alterar tema</RadioGroup.Label>

      <ul className="bg-default-background dark:bg-dark-default-background divide-default-border dark:divide-dark-default-border flex w-[calc(100%-36px)] max-w-md flex-col divide-y rounded-lg py-1">
        {options.map(({ label, value }) => (
          <RadioGroup.Option
            as="li"
            value={value}
            key={value}
            className="flex cursor-pointer items-center justify-between py-3 px-4 text-sm md:text-base"
          >
            {({ checked }) => (
              <Fragment>
                <span className={classNames({ "font-bold": checked })}>
                  {label}
                </span>

                <div
                  className={classNames(
                    "flex aspect-square w-5 items-center justify-center rounded-full border-2",
                    checked
                      ? "bg-default-foreground dark:bg-dark-default-foreground border-default-foreground dark:border-dark-default-foreground"
                      : "bg-default-background dark:bg-dark-default-background border-secondary-foreground dark:border-dark-secondary-foreground",
                  )}
                >
                  {checked && (
                    <CheckIcon className="text-default-background dark:text-dark-default-background w-4" />
                  )}
                </div>
              </Fragment>
            )}
          </RadioGroup.Option>
        ))}
      </ul>
    </RadioGroup>
  );
};
