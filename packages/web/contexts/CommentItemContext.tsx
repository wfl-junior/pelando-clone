import { Comment } from "@/@types/api";
import React, { createContext, useContext } from "react";

interface ICommentItemContext {
  comment: Comment;
}

const CommentItemContext = createContext({} as ICommentItemContext);

export const useCommentItemContext = () => useContext(CommentItemContext);

interface CommentItemContextProviderProps extends ICommentItemContext {
  children?: React.ReactNode;
}

export const CommentItemContextProvider: React.FC<
  CommentItemContextProviderProps
> = ({ children, ...props }) => (
  <CommentItemContext.Provider value={props}>
    {children}
  </CommentItemContext.Provider>
);
