import { Request, Response } from "express";
import { User } from "../entities/user.entity";

export interface IContext {
  request: Request;
  response: Response;
  user?: User;
}

export interface IContextWithUser extends IContext {
  user: User;
}

export interface Class<T> {
  new (...args: unknown[]): T;
}
