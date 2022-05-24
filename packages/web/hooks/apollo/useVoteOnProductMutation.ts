import { VoteOnProductResponse, VoteOnProductVariables } from "@/@types/api";
import { voteOnProductMutation } from "@/graphql/mutations/voteOnProductMutation";
import { MutationHookOptions, useMutation } from "@apollo/client";

export function useVoteOnProductMutation(
  options?: MutationHookOptions<VoteOnProductResponse, VoteOnProductVariables>,
) {
  return useMutation(voteOnProductMutation, options);
}
