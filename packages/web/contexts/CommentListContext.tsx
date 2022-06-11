import React, { createContext, useContext, useState } from "react";

interface ICommentListContext {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const CommentListContext = createContext({} as ICommentListContext);

export const useCommentListContext = () => useContext(CommentListContext);

export const CommentListContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [page, setPage] = useState(1);

  return (
    <CommentListContext.Provider value={{ page, setPage }}>
      {children}
    </CommentListContext.Provider>
  );
};
