import { LoginMutationResponse, LoginMutationVariables } from "@/@types/api";
import { loginMutation } from "@/graphql/mutations/loginMutation";
import { meQuery } from "@/graphql/queries/meQuery";
import {
  authorizationHeaderWithToken,
  setAccessToken,
} from "@/utils/accessToken";
import { MutationHookOptions, useMutation } from "@apollo/client";

export function useLoginMutation(
  options?: Omit<
    MutationHookOptions<LoginMutationResponse, LoginMutationVariables>,
    "refetchQueries"
  >,
) {
  return useMutation(loginMutation, {
    ...options,
    refetchQueries: result => {
      const accessToken = result.data?.login.accessToken;

      if (accessToken) {
        // põe accessToken em state
        setAccessToken(accessToken);

        // faz refetch na me query após login
        return [
          {
            query: meQuery,
            context: {
              headers: {
                authorization: authorizationHeaderWithToken(accessToken),
              },
            },
          },
        ];
      }

      return [];
    },
  });
}
