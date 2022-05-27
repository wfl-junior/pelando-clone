import { LoginWithGoogleMutationResponse } from "@/@types/api";
import { loginWithGoogleMutation } from "@/graphql/mutations/loginWithGoogleMutation";
import { meQuery } from "@/graphql/queries/meQuery";
import {
  authorizationHeaderWithToken,
  setAccessToken,
} from "@/utils/accessToken";
import { MutationHookOptions, useMutation } from "@apollo/client";

export function useLoginWithGoogleMutation(
  options?: Omit<
    MutationHookOptions<LoginWithGoogleMutationResponse>,
    "refetchQueries"
  >,
) {
  return useMutation(loginWithGoogleMutation, {
    ...options,
    refetchQueries: result => {
      const accessToken = result.data?.loginWithGoogle.accessToken;

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
