import { API_URL } from "@/constants";

export type RefreshAccessTokenResponse = {
  message: string;
} & (
  | {
      ok: true;
      accessToken: string;
    }
  | {
      ok: false;
      accessToken: null;
    }
);

export async function refreshAccessToken(
  options?: Omit<RequestInit, "method" | "credentials">,
): Promise<RefreshAccessTokenResponse & { headers: Headers }> {
  const response = await fetch(`${API_URL}/refresh-access-token`, {
    ...options,
    method: "POST",
    credentials: "include",
  });

  const data: RefreshAccessTokenResponse = await response.json();

  return {
    ...data,
    headers: response.headers,
  };
}
