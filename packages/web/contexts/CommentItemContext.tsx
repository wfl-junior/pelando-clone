import { Comment } from "@/@types/api";
import React, { createContext, useContext, useState } from "react";

interface ICommentItemContext {
  comment: Comment;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  deleted: boolean;
  setDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentItemContext = createContext({} as ICommentItemContext);

export const useCommentItemContext = () => useContext(CommentItemContext);

interface CommentItemContextProviderProps {
  comment: Comment;
  children?: React.ReactNode;
}

export const CommentItemContextProvider: React.FC<
  CommentItemContextProviderProps
> = ({ children, ...props }) => {
  const [editing, setEditing] = useState(false);
  const [deleted, setDeleted] = useState(false);

  return (
    <CommentItemContext.Provider
      value={{
        editing,
        setEditing,
        deleted,
        setDeleted,
        ...props,
      }}
    >
      {children}
    </CommentItemContext.Provider>
  );
};
