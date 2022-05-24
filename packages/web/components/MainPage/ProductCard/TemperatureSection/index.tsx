import { useProductCardContext } from "@/contexts/ProductCardContext";
import classNames from "classnames";
import React, { useState } from "react";
import { ColdButton } from "./ColdButton";
import { HotButton } from "./HotButton";
import { UndoButton } from "./UndoButton";

export const TemperatureSection: React.FC = () => {
  const [hovering, setHovering] = useState(false);
  const {
    product: { temperature, userVoteType },
  } = useProductCardContext();

  return (
    <div
      className="border-default-border flex items-center gap-1 rounded-full border bg-transparent p-1.5"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {userVoteType ? <UndoButton hovering={hovering} /> : <ColdButton />}

      <span
        className={classNames("font-bold", {
          "text-primary":
            (!userVoteType && temperature >= 350 && temperature < 1000) ||
            userVoteType === "HOT",
          "text-red": !userVoteType && temperature >= 1000,
          "text-blue":
            (!userVoteType && temperature < 0) || userVoteType === "COLD",
          "mr-1.5": !!userVoteType,
        })}
      >
        {Math.floor(temperature)}º
      </span>

      {!userVoteType && <HotButton />}
    </div>
  );
};
