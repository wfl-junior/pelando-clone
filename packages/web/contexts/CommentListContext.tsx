import { CommentsQueryResponse, CommentsQueryVariables } from "@/@types/api";
import { getCommentsVariables } from "@/components/ProductPage/ExtraSection/CommentsSection/CommentList";
import { useCommentsQuery } from "@/hooks/apollo/queries/useCommentsQuery";
import { useProductForProductPage } from "@/hooks/useProductForProductPage";
import { QueryResult } from "@apollo/client";
import React, { createContext, useContext, useState } from "react";

interface ICommentListContext {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  queryResult: QueryResult<CommentsQueryResponse, CommentsQueryVariables>;
}

const CommentListContext = createContext({} as ICommentListContext);

export const useCommentListContext = () => useContext(CommentListContext);

export const CommentListContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [page, setPage] = useState(1);
  const { id } = useProductForProductPage();
  const queryResult = useCommentsQuery({
    variables: getCommentsVariables(id, page),
    notifyOnNetworkStatusChange: true,
  });

  return (
    <CommentListContext.Provider value={{ page, setPage, queryResult }}>
      {children}
    </CommentListContext.Provider>
  );
};
