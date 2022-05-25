import { CaretDownIcon } from "@/components/icons/header/top/CaretDownIcon";
import { UserImagePlaceholder } from "@/components/UserImagePlaceholder";
import { useUser } from "@/hooks/useUser";
import { Menu } from "@headlessui/react";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LogoutButton } from "./LogoutButton";

interface MenuLink {
  label: string;
  route: string;
}

const menuLinks: MenuLink[] = [
  {
    label: "Perfil",
    route: "#",
  },
  {
    label: "Promoções que sigo",
    route: "#",
  },
  {
    label: "Configurações",
    route: "#",
  },
];

export const MenuButton: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button type="button" className="flex items-center gap-0.5">
        <div className="w-9">
          {user.image ? (
            <div className="border-default-border bg-inactive-background/50 flex aspect-square w-full items-center justify-center overflow-hidden rounded-full border">
              <Image
                src={user.image}
                className="w-full object-cover"
                width={36}
                height={36}
              />
            </div>
          ) : (
            <UserImagePlaceholder className="w-full" />
          )}
        </div>

        <CaretDownIcon className="w-6" />
      </Menu.Button>

      <Menu.Items className="bg-default-background shadow-user-menu absolute right-0 top-full z-20 w-[250px] translate-y-4 transform overflow-hidden rounded-lg">
        <div className="pt-4.5 flex flex-col items-center justify-center gap-1 px-2 pb-2">
          <div className="w-14">
            {user.image ? (
              <div className="border-default-border bg-inactive-background/50 flex aspect-square w-full items-center justify-center overflow-hidden rounded-full border">
                <Image
                  src={user.image}
                  alt="Imagem do usuário"
                  className="w-full object-cover"
                  width={56}
                  height={56}
                />
              </div>
            ) : (
              <UserImagePlaceholder className="w-full" />
            )}
          </div>

          <span className="font-bold">{user.username}</span>
        </div>

        <ul className="divide-default-border flex flex-col divide-y">
          {menuLinks.map(({ label, route }) => (
            <Menu.Item key={label + route} as="li">
              {({ active }) => (
                <Link href={route}>
                  <a
                    className={classNames(
                      "block cursor-pointer py-3.5 px-4 font-bold transition-colors",
                      active
                        ? "bg-secondary-foreground/10"
                        : "bg-default-background",
                    )}
                  >
                    {label}
                  </a>
                </Link>
              )}
            </Menu.Item>
          ))}

          <LogoutButton />
        </ul>
      </Menu.Items>
    </Menu>
  );
};
