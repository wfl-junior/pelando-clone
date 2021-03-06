import { Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { User } from "../entities";

export interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

type TokenFn = (user: User) => string;

const getPayload = (user: User): Omit<TokenPayload, "iat" | "exp"> => ({
  id: user.id,
});

export const createAccessToken: TokenFn = user => {
  const payload = getPayload(user);

  return sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
};

const cookieExpirationInSeconds = 60 * 60 * 24 * 7; // 7 days

export const createRefreshToken: TokenFn = user => {
  const payload = getPayload(user);

  return sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: cookieExpirationInSeconds,
  });
};

export const sendRefreshToken = (response: Response, user: User): void => {
  response.cookie(process.env.COOKIE_NAME, createRefreshToken(user), {
    domain: "localhost",
    httpOnly: true,
    maxAge: cookieExpirationInSeconds * 1000, // maxAge is in milliseconds
    // path: REFRESH_ACCESS_TOKEN_ENDPOINT,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
};

export const getTokenPayload = (token: string, isRefresh?: boolean) => {
  return verify(
    token,
    isRefresh
      ? process.env.JWT_REFRESH_TOKEN_SECRET
      : process.env.JWT_ACCESS_TOKEN_SECRET,
  ) as TokenPayload;
};
