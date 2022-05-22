import { LogoutMutationResponse } from "@/@types/api";
import { logoutMutation } from "@/graphql/mutations/logoutMutation";
import { MutationHookOptions, useMutation } from "@apollo/client";

export function useLogoutMutation(
  options?: MutationHookOptions<LogoutMutationResponse>,
) {
  return useMutation(logoutMutation, options);
}
