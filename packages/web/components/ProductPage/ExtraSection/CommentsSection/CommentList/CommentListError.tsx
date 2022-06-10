import { defaultErrorMessage } from "@/constants";
import React from "react";

export const CommentListError: React.FC = () => (
  <div className="p-4 md:px-8">
    <p className="mt-16 text-center text-lg">{defaultErrorMessage}</p>
  </div>
);
