import { SignOutIcon } from "@/components/icons/header/top/SignOutIcon";
import { Spinner } from "@/components/Spinner";
import { useLogoutMutation } from "@/hooks/apollo/mutations/useLogoutMutation";
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
              // TODO: adicionar toast
              console.log({ error });
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
