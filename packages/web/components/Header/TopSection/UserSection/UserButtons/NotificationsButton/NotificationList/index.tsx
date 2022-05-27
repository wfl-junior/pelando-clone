import { ProductsQueryResponse, ProductsQueryVariables } from "@/@types/api";
import { useProductsQuery } from "@/hooks/apollo/queries/useProductsQuery";
import { getReadableDate } from "@/utils/getReadableDate";
import { overflowText } from "@/utils/overflowText";
import { QueryHookOptions } from "@apollo/client";
import { Menu } from "@headlessui/react";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import { NotificationItemSkeleton } from "./NotificationItemSkeleton";

interface NotificationListProps {
  options: QueryHookOptions<ProductsQueryResponse, ProductsQueryVariables>;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  options,
}) => {
  // usando products enquanto não tem notifications
  const { data, loading } = useProductsQuery(options);

  if (loading) {
    // skeletons
    return (
      <Fragment>
        {Array.from({ length: 5 }, (_, i) => i + 1).map(number => (
          <NotificationItemSkeleton key={number} />
        ))}
      </Fragment>
    );
  }

  if (!data?.products.products.edges.length) {
    return (
      <div className="flex flex-grow items-center justify-center text-sm">
        Você não possui notificações.
      </div>
    );
  }

  return (
    <ul className="flex-grow overflow-y-auto">
      {data.products.products.edges.map(product => (
        <Menu.Item as="li" key={product.id}>
          {({ active }) => (
            <Link href="#">
              <a
                className={classNames(
                  "flex gap-4 py-3 px-4 text-sm transition-colors",
                  { "bg-secondary-foreground/10": active },
                )}
              >
                <div
                  className="border-default-border bg-default-background flex h-12 items-center justify-center overflow-hidden rounded border"
                  style={{ flex: "0 0 3rem" }}
                >
                  <Image
                    src={product.image}
                    width={48}
                    height={48}
                    className="w-full object-contain"
                  />
                </div>

                <div className="flex flex-col">
                  <p>
                    Tá pelando! {overflowText(product.title, 35)} -&nbsp;
                    {product.price > 0
                      ? "R$" +
                        product.price.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : "Grátis"}
                    , está super quente. Veja mais.
                  </p>

                  <span className="text-secondary-foreground">
                    {getReadableDate(product.createdAt)}
                  </span>
                </div>
              </a>
            </Link>
          )}
        </Menu.Item>
      ))}
    </ul>
  );
};
