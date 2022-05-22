import React from "react";

interface MainProps {
  children?: React.ReactNode;
}

export const Main: React.FC<MainProps> = ({ children }) => (
  <main className="container mt-4 mb-16 md:mb-4">{children}</main>
);
