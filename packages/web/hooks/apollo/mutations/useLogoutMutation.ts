import { LogoutMutationResponse } from "@/@types/api";
import { logoutMutation } from "@/graphql/mutations/logoutMutation";
import { setAccessToken } from "@/utils/accessToken";
import { applyFakeMeQuery } from "@/utils/applyFakeMeQuery";
import { MutationHookOptions, useMutation } from "@apollo/client";

export function useLogoutMutation(
  options?: Omit<MutationHookOptions<LogoutMutationResponse>, "update">,
) {
  return useMutation(logoutMutation, {
    ...options,
    update: cache => {
      // remove accessToken de state
      setAccessToken(null);

      // sobrescreve a me query para ui atualizar para usuário deslogado
      applyFakeMeQuery(cache);

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
