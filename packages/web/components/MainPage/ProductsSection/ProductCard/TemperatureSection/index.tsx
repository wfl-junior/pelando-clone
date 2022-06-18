import { useProductCardContext } from "@/contexts/ProductCardContext";
import { useUser } from "@/hooks/useUser";
import { formatTemperature } from "@/utils/formatTemperature";
import classNames from "classnames";
import React, { Fragment, useState } from "react";
import { ColdButton } from "./ColdButton";
import { HotButton } from "./HotButton";
import { UndoButton } from "./UndoButton";

export const TemperatureSection: React.FC = () => {
  const [hovering, setHovering] = useState(false);
  const { isLoggedIn } = useUser();
  const {
    product: { temperature, userVoteType },
  } = useProductCardContext();

  return (
    <div
      className="border-default-border flex items-center gap-1 rounded-full border bg-transparent p-1.5"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {isLoggedIn ? (
        <Fragment>
          {userVoteType ? <UndoButton hovering={hovering} /> : <ColdButton />}
        </Fragment>
      ) : (
        <ColdButton />
      )}

      <span
        className={classNames(
          "font-bold",
          isLoggedIn && userVoteType
            ? {
                "text-primary": userVoteType === "HOT",
                "text-blue": userVoteType === "COLD",
                "mr-1.5": true,
              }
            : {
                "text-primary": temperature >= 350 && temperature < 1000,
                "text-red": temperature >= 1000,
                "text-blue": temperature < 0,
              },
        )}
      >
        {formatTemperature(temperature)}
      </span>

      {isLoggedIn ? (
        <Fragment>{!userVoteType && <HotButton />}</Fragment>
      ) : (
        <HotButton />
      )}
    </div>
  );
};
