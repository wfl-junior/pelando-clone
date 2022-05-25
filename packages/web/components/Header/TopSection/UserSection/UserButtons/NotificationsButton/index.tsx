import { ProductsQueryResponse, ProductsQueryVariables } from "@/@types/api";
import { ArrowLeftIcon } from "@/components/icons/header/top/ArrowLeftIcon";
import { BellIcon } from "@/components/icons/header/top/BellIcon";
import { useIsBreakpoint } from "@/hooks/useIsBreakpoint";
import { QueryHookOptions } from "@apollo/client";
import { Menu } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment } from "react";
import { LoadMoreButton } from "./LoadMoreButton";
import { MaskAllAsReadButton } from "./MaskAllAsReadButton";
import { NotificationList } from "./NotificationList";
import { TopArrow } from "./TopArrow";

const options: QueryHookOptions<ProductsQueryResponse, ProductsQueryVariables> =
  {
    variables: {
      input: {
        perPage: 10,
        orderBy: {
          temperature: "DESC",
        },
      },
    },
  };

export const NotificationsButton: React.FC = () => {
  const isMediumBreakpoint = useIsBreakpoint("md");

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <Fragment>
          {!isMediumBreakpoint && open ? (
            <div className="bg-default-background fixed inset-x-0 top-0 z-20 flex h-12 w-full items-center justify-center">
              <Menu.Button
                type="button"
                className="absolute left-4 top-1/2 -translate-y-1/2"
              >
                <ArrowLeftIcon className="w-6" />
              </Menu.Button>

              <p className="font-bold">Notificações</p>
            </div>
          ) : (
            <Menu.Button
              type="button"
              className="bg-inactive-background flex aspect-square w-9 items-center justify-center rounded-full"
            >
              <BellIcon className="w-6" />
            </Menu.Button>
          )}

          <Menu.Items
            className={classNames(
              "bg-default-background flex flex-col",
              isMediumBreakpoint
                ? "shadow-notifications-menu absolute top-full right-0 z-20 h-[468px] w-[360px] translate-y-3 rounded"
                : "fixed inset-x-0 top-12 bottom-[53px] z-50",
            )}
          >
            {isMediumBreakpoint && <TopArrow />}

            <MaskAllAsReadButton />
            <NotificationList options={options} />
            <LoadMoreButton options={options} />
          </Menu.Items>
        </Fragment>
      )}
    </Menu>
  );
};
