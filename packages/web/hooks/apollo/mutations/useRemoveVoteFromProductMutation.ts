import {
  RemoveVoteFromProductResponse,
  RemoveVoteFromProductVariables,
} from "@/@types/api";
import { removeVoteFromProductMutation } from "@/graphql/mutations/removeVoteFromProductMutation";
import { MutationHookOptions, useMutation } from "@apollo/client";

export function useRemoveVoteFromProductMutation(
  options?: MutationHookOptions<
    RemoveVoteFromProductResponse,
    RemoveVoteFromProductVariables
  >,
) {
  return useMutation(removeVoteFromProductMutation, options);
}
