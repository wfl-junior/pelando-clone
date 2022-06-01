import { PlusIcon } from "@/components/icons/product-page/PlusIcon";
import { useModalContext } from "@/contexts/ModalContext";
import { useUser } from "@/hooks/useUser";
import React from "react";

interface AlertButtonProps
  extends Omit<
    React.ComponentPropsWithoutRef<"button">,
    "title" | "className"
  > {
  title: string;
}

export const AlertButton: React.FC<AlertButtonProps> = ({
  title,
  onClick,
  ...props
}) => {
  const { isLoggedIn } = useUser();
  const { toggleModal } = useModalContext();

  return (
    <button
      type="button"
      className="bg-inactive-background flex items-center gap-1 whitespace-nowrap rounded-l-[1.125rem] rounded-r-lg p-2 text-xs font-bold"
      onClick={e => {
        if (!isLoggedIn) {
          return toggleModal(true, "register-login");
        }

        onClick?.(e);
      }}
      {...props}
    >
      <PlusIcon className="w-4" />
      <span>{title}</span>
    </button>
  );
};
