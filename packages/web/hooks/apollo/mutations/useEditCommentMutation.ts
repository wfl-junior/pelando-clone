import { EditCommentResponse, EditCommentVariables } from "@/@types/api";
import { editCommentMutation } from "@/graphql/mutations/editCommentMutation";
import { MutationHookOptions, useMutation } from "@apollo/client";

export function useEditCommentMutation(
  options?: MutationHookOptions<EditCommentResponse, EditCommentVariables>,
) {
  return useMutation(editCommentMutation, options);
}
