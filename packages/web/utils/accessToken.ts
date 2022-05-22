export type AccessToken = string | null;

let accessToken: AccessToken = null;

export const getAccessToken = () => accessToken;

export function setAccessToken(token: AccessToken) {
  accessToken = token;
}

export function authorizationHeaderWithToken(token?: AccessToken) {
  return `Bearer ${token || getAccessToken()}`;
}
