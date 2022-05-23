import { User } from "@/@types/api";
import { useMeQuery } from "./apollo/useMeQuery";

type UseUserResponse =
  | {
      isLoggedIn: true;
      user: User;
    }
  | {
      isLoggedIn: false;
      user: null;
    };

export function useUser(): UseUserResponse {
  const { data } = useMeQuery();

  if (data?.me.user) {
    return {
      isLoggedIn: true,
      user: data.me.user,
    };
  }

  return {
    isLoggedIn: false,
    user: null,
  };
}
