import { DeleteCommentResponse, DeleteCommentVariables } from "@/@types/api";
import { deleteCommentMutation } from "@/graphql/mutations/deleteCommentMutation";
import { MutationHookOptions, useMutation } from "@apollo/client";

export function useDeleteCommentMutation(
  options?: MutationHookOptions<DeleteCommentResponse, DeleteCommentVariables>,
) {
  return useMutation(deleteCommentMutation, options);
}
