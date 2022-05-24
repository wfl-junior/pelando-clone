import { SignOutIcon } from "@/components/icons/header/top/SignOutIcon";
import { useLogoutMutation } from "@/hooks/apollo/useLogoutMutation";
import { Menu } from "@headlessui/react";
import classNames from "classnames";
import React from "react";

export const LogoutButton = () => {
  const [logoutMutation] = useLogoutMutation();

  return (
    <Menu.Item as="li">
      {({ active }) => (
        <button
          type="button"
          className={classNames(
            "flex w-full cursor-pointer items-center justify-between py-3.5 px-4 transition-colors",
            active ? "bg-secondary-foreground/10" : "bg-default-background",
          )}
          onClick={async () => {
            try {
              await logoutMutation();
            } catch (error) {
              console.log({ error });
            }
          }}
        >
          <span>Encerrar sessão</span>

          <SignOutIcon className="w-5" />
        </button>
      )}
    </Menu.Item>
  );
};
