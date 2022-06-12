import { MoreOptionsIcon } from "@/components/icons/product-page/MoreOptionsIcon";
import { useCommentItemContext } from "@/contexts/CommentItemContext";
import { useIsBreakpoint } from "@/hooks/useIsBreakpoint";
import { useUser } from "@/hooks/useUser";
import { Menu } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment } from "react";
import { CopyLinkButton } from "./CopyLinkButton";
import { DeleteCommentButton } from "./DeleteCommentButton";
import { EditCommentButton } from "./EditCommentButton";
import { MenuButton } from "./MenuButton";

export const MoreOptionsMenu: React.FC = () => {
  const isMediumBreakpoint = useIsBreakpoint("md");
  const { user } = useUser();
  const { comment } = useCommentItemContext();

  return (
    <Menu as="div" className="relative flex justify-center">
      {({ open }) => (
        <Fragment>
          <Menu.Button type="button" className="text-secondary-foreground">
            <MoreOptionsIcon className="w-4.5" />
          </Menu.Button>

          <div
            className={classNames("z-40", {
              "fixed inset-0 flex items-center justify-center bg-black/75":
                !isMediumBreakpoint && open,
            })}
          >
            <Menu.Items
              className={classNames(
                "divide-default-border bg-default-background shadow-product-page-action-menu z-40 flex w-64 flex-col divide-y overflow-hidden rounded-lg",
                {
                  "absolute right-0 top-full translate-y-4": isMediumBreakpoint,
                },
              )}
            >
              <CopyLinkButton />

              {user && user.id === comment.user.id ? (
                <Fragment>
                  <EditCommentButton />
                  <DeleteCommentButton />
                </Fragment>
              ) : (
                <MenuButton>SPAM ou comentário ofensivo</MenuButton>
              )}

              <MenuButton fontBold={false}>Cancelar</MenuButton>
            </Menu.Items>
          </div>
        </Fragment>
      )}
    </Menu>
  );
};
