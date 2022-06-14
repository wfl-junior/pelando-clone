import { Toast } from "@/alerts/Toast";
import { SignOutIcon } from "@/components/icons/header/top/SignOutIcon";
import { Spinner } from "@/components/Spinner";
import { defaultErrorMessage } from "@/constants";
import { useLogoutMutation } from "@/hooks/apollo/mutations/useLogoutMutation";
import { ApolloError } from "@apollo/client";
import { Menu } from "@headlessui/react";
import classNames from "classnames";

export const LogoutButton = () => {
  const [logoutMutation, { loading }] = useLogoutMutation();

  return (
    <Menu.Item as="li">
      {({ active }) => (
        <button
          disabled={loading}
          type="button"
          className={classNames(
            "flex w-full cursor-pointer items-center justify-between py-3.5 px-4 transition-colors",
            active ? "bg-secondary-foreground/10" : "bg-default-background",
          )}
          onClick={async e => {
            // para impedir do menu fechar ao clicar
            e.preventDefault();

            try {
              await logoutMutation();
            } catch (error) {
              // se for ApolloError, o onError global resolve
              if (!(error instanceof ApolloError)) {
                new Toast({
                  message: defaultErrorMessage,
                  type: "error",
                }).fire();
              }
            }
          }}
        >
          <span>Encerrar sessão</span>

          {loading ? (
            <Spinner
              className="w-5 before:w-3/5"
              color="secondary-foreground"
            />
          ) : (
            <SignOutIcon className="w-5" />
          )}
        </button>
      )}
    </Menu.Item>
  );
};
