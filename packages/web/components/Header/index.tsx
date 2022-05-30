import classNames from "classnames";
import { useRouter } from "next/router";
import React from "react";
import { NavigationSection } from "./NavigationSection";
import { TopSection } from "./TopSection";

export const Header: React.FC = () => {
  const { route } = useRouter();

  const shouldShowNavigation = !route.startsWith("/o");

  return (
    <header
      className={classNames(
        "bg-default-background sticky top-0 z-30 flex flex-col gap-2 shadow-md",
        shouldShowNavigation ? "pt-3" : "py-3",
      )}
    >
      <div className="container flex flex-col gap-2">
        <TopSection />
        {shouldShowNavigation && <NavigationSection />}
      </div>
    </header>
  );
};
