import { AddCommentResponse, AddCommentVariables } from "@/@types/api";
import { addCommentMutation } from "@/graphql/mutations/addCommentMutation";
import { MutationHookOptions, useMutation } from "@apollo/client";

export function useAddCommentMutation(
  options?: MutationHookOptions<AddCommentResponse, AddCommentVariables>,
) {
  return useMutation(addCommentMutation, options);
}
