import { LoginMutationResponse, LoginMutationVariables } from "@/@types/api";
import { loginMutation } from "@/graphql/mutations/loginMutation";
import { MutationHookOptions, useMutation } from "@apollo/client";

export function useLoginMutation(
  options?: MutationHookOptions<LoginMutationResponse, LoginMutationVariables>,
) {
  return useMutation(loginMutation, options);
}
