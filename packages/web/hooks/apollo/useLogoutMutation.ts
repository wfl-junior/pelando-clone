import { LogoutMutationResponse, MeQueryResponse } from "@/@types/api";
import { logoutMutation } from "@/graphql/mutations/logoutMutation";
import { fakeMeQuery } from "@/graphql/queries/fake/fakeMeQuery";
import { meQuery } from "@/graphql/queries/meQuery";
import { MutationHookOptions, useMutation } from "@apollo/client";

export function useLogoutMutation(
  options?: Omit<MutationHookOptions<LogoutMutationResponse>, "update">,
) {
  return useMutation(logoutMutation, {
    ...options,
    update: cache => {
      const data = cache.readQuery<MeQueryResponse>({ query: meQuery });

      cache.writeQuery({
        ...fakeMeQuery,
        data: {
          ...data,
          ...fakeMeQuery.data,
          me: {
            ...data?.me,
            ...fakeMeQuery.data.me,
          },
        },
      });
    },
  });
}
