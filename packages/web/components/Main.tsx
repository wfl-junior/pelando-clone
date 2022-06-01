import { useRouter } from "next/router";
import React from "react";

interface MainProps {
  children?: React.ReactNode;
}

export const Main: React.FC<MainProps> = ({ children }) => {
  const { route } = useRouter();

  return (
    <main className={route.startsWith("/o") ? "mb-4" : "mb-16 md:mb-4"}>
      {children}
    </main>
  );
};
