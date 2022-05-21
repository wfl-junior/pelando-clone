import {
  RegisterMutationResponse,
  RegisterMutationVariables,
} from "@/@types/api";
import { registerMutation } from "@/graphql/mutations/registerMutation";
import { MutationHookOptions, useMutation } from "@apollo/client";

export function useRegisterMutation(
  options?: MutationHookOptions<
    RegisterMutationResponse,
    RegisterMutationVariables
  >,
) {
  return useMutation(registerMutation, options);
}
