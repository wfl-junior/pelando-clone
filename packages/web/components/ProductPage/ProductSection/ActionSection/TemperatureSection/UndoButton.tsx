import { ColdIcon } from "@/components/icons/product-card/ColdIcon";
import { HotIcon } from "@/components/icons/product-card/HotIcon";
import { Spinner } from "@/components/Spinner";
import { defaultErrorMessage } from "@/constants";
import { useRemoveVoteFromProductMutation } from "@/hooks/apollo/mutations/useRemoveVoteFromProductMutation";
import { useProductForProductPage } from "@/hooks/useProductForProductPage";
import { authorizationHeaderWithToken } from "@/utils/accessToken";
import { Toast } from "@/utils/Toast";
import { ApolloError } from "@apollo/client";
import classNames from "classnames";
import React, { Fragment } from "react";

interface UndoButtonProps {
  hovering: boolean;
}

export const UndoButton: React.FC<UndoButtonProps> = ({ hovering }) => {
  const { id, userVoteType } = useProductForProductPage();
  const [removeVote, { loading }] = useRemoveVoteFromProductMutation();

  return (
    <button
      disabled={loading}
      type="button"
      title="Desfazer"
      className={classNames(
        "relative flex aspect-square w-6 items-center justify-center rounded-full transition-colors",
        {
          "text-primary": userVoteType === "HOT",
          "text-blue": userVoteType === "COLD",
          "bg-secondary-background": hovering,
        },
      )}
      onClick={async () => {
        try {
          const { data } = await removeVote({
            variables: {
              input: {
                productId: id,
              },
            },
            context: {
              headers: {
                authorization: authorizationHeaderWithToken(),
              },
            },
          });

          if (data?.removeVoteFromProduct.errors) {
            new Toast({
              message: data.removeVoteFromProduct.errors[0].message,
              type: "error",
            }).fire();
          }
        } catch (error) {
          // se for ApolloError, o onError global resolve
          if (!(error instanceof ApolloError)) {
            new Toast({ message: defaultErrorMessage, type: "error" }).fire();
          }
        }
      }}
    >
      {loading ? (
        <Spinner className="w-4.5 before:w-3/5" color="inactive-background" />
      ) : (
        <Fragment>
          {hovering ? (
            <span className="text-default-foreground absolute text-xl font-bold">
              &times;
            </span>
          ) : (
            <Fragment>
              {userVoteType === "HOT" ? (
                <HotIcon className="w-4.5" />
              ) : (
                <ColdIcon className="w-4.5" />
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    </button>
  );
};
