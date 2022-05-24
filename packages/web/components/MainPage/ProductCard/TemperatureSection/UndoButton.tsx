import { ColdIcon } from "@/components/icons/product-card/ColdIcon";
import { HotIcon } from "@/components/icons/product-card/HotIcon";
import { Spinner } from "@/components/Spinner";
import { useProductCardContext } from "@/contexts/ProductCardContext";
import { useRemoveVoteFromProductMutation } from "@/hooks/apollo/useRemoveVoteFromProductMutation";
import { authorizationHeaderWithToken } from "@/utils/accessToken";
import classNames from "classnames";
import React, { Fragment } from "react";

interface UndoButtonProps {
  hovering: boolean;
}

export const UndoButton: React.FC<UndoButtonProps> = ({ hovering }) => {
  const {
    product: { id, userVoteType },
  } = useProductCardContext();
  const [removeVote, { loading }] = useRemoveVoteFromProductMutation();

  return (
    <button
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
          await removeVote({
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
        } catch (error) {
          // TODO: toast
          console.log({ error });
        }
      }}
    >
      {loading ? (
        <Spinner className="w-5 before:w-3/5" color="inactive-background" />
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
