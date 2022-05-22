import { Request } from "express";
import { User } from "../entities";
import { getTokenPayload } from "./jwt";

export async function getUserFromRequest(
  request: Request,
): Promise<User | null> {
  const { authorization } = request.headers;

  if (authorization) {
    const token = authorization.replace("Bearer ", "");
    const { id } = getTokenPayload(token);
    return User.findOne({ where: { id } });
  }

  return null;
}
