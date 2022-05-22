import { SignOutIcon } from "@/components/icons/header/top/SignOutIcon";
import { initializeApollo } from "@/graphql/client";
import { fakeMeQuery } from "@/graphql/queries/fake/fakeMeQuery";
import { useLogoutMutation } from "@/hooks/apollo/useLogoutMutation";
import { useMeQuery } from "@/hooks/apollo/useMeQuery";
import { Menu } from "@headlessui/react";
import classNames from "classnames";
import React from "react";

export const LogoutButton = () => {
  const [logoutMutation] = useLogoutMutation();
  const { data } = useMeQuery();

  return (
    <Menu.Item as="li">
      {({ active }) => (
        <button
          type="button"
          className={classNames(
            "flex w-full cursor-pointer items-center justify-between py-3.5 px-4 font-bold transition-colors",
            active ? "bg-secondary-foreground/10" : "bg-default-background",
          )}
          onClick={() => {
            const apolloClient = initializeApollo();
            // sobescreve me query para deslogar no cache
            apolloClient.writeQuery({
              ...fakeMeQuery,
              data: {
                ...data,
                ...fakeMeQuery.data,
                me: {
                  ...data?.me,
                  ...fakeMeQuery.data.me,
                },
              },
            });

            // logout mutation para limpar o cookie
            logoutMutation();
          }}
        >
          <span>Encerrar sessão</span>

          <SignOutIcon className="w-6" />
        </button>
      )}
    </Menu.Item>
  );
};
