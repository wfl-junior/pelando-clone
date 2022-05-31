import { IncomingMessage, ServerResponse } from "http";
import { refreshAccessToken } from "./refreshAccessToken";

export async function refreshAccessTokenServerSide(
  request: IncomingMessage,
  response: ServerResponse,
) {
  const { cookie } = request.headers;

  if (!cookie) {
    throw new Error("no need to fetch for access token if there is no cookie");
  }

  const { accessToken, headers } = await refreshAccessToken({
    headers: { cookie },
  });

  if (!accessToken) {
    throw new Error("no need to fetch me query if there is no access token");
  }

  const setCookieHeaderName = "set-cookie";
  const cookieValue = headers.get(setCookieHeaderName);

  if (cookieValue) {
    // encaminha o set-cookie de refresh access token do server pro client
    response.setHeader(setCookieHeaderName, cookieValue);
  }

  return accessToken;
}
