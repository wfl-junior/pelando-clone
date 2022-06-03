import { Theme, useThemeContext } from "@/contexts/ThemeContext";
import { RadioGroup } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment } from "react";
import { CheckIcon } from "../icons/CheckIcon";

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
  const { setTheme, _theme } = useThemeContext();

  return (
    <RadioGroup
      as="div"
      value={_theme}
      onChange={setTheme}
      className="bg-default-background flex w-[calc(100%-36px)] max-w-md items-center justify-center rounded-lg py-1"
    >
      <RadioGroup.Label className="sr-only">Alterar tema</RadioGroup.Label>

      <ul className="divide-default-border flex w-full flex-col divide-y">
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
                      ? "bg-default-foreground border-default-foreground"
                      : "bg-default-background border-secondary-foreground",
                  )}
                >
                  {checked && (
                    <CheckIcon className="text-default-background w-full" />
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
