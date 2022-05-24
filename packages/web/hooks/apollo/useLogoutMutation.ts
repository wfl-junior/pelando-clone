import { LogoutMutationResponse, MeQueryResponse } from "@/@types/api";
import { logoutMutation } from "@/graphql/mutations/logoutMutation";
import { fakeMeQuery } from "@/graphql/queries/fake/fakeMeQuery";
import { meQuery } from "@/graphql/queries/meQuery";
import { setAccessToken } from "@/utils/accessToken";
import {
  ApolloCache,
  MutationHookOptions,
  NormalizedCacheObject,
  useMutation,
} from "@apollo/client";

export function useLogoutMutation(
  options?: Omit<MutationHookOptions<LogoutMutationResponse>, "update">,
) {
  return useMutation(logoutMutation, {
    ...options,
    update: (cache: ApolloCache<NormalizedCacheObject>) => {
      // remove accessToken de state
      setAccessToken(null);

      // sobrescreve a me query para ui atualizar para usuário deslogado
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

      // remove userVoteType dos products em cache
      // const cacheObject = cache.extract();

      // for (const key in cacheObject) {
      //   if (key.startsWith("Product:")) {
      //     cache.modify({
      //       id: key,
      //       fields: {
      //         userVoteType: () => null,
      //       },
      //     });
      //   }
      // }
    },
  });
}
