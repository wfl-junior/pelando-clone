import { CommentsQueryResponse, CommentsQueryVariables } from "@/@types/api";
import { commentsQuery } from "@/graphql/queries/commentsQuery";
import { QueryHookOptions, useQuery } from "@apollo/client";

export function useCommentsQuery(
  options?: QueryHookOptions<CommentsQueryResponse, CommentsQueryVariables>,
) {
  return useQuery(commentsQuery, options);
}
