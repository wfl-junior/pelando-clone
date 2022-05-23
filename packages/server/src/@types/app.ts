import { Request, Response } from "express";
import { User } from "../entities";
import { FieldError } from "../graphql-types/Object/FieldError";
import { ResolverResponse } from "../graphql-types/Object/ResolverResponse";

export interface IContext {
  request: Request;
  response: Response;
  user?: User | null;
}

export interface IContextWithUser extends IContext {
  user: User;
}

export interface Class<T> {
  new (...args: unknown[]): T;
}

export type BasicObjectType = Record<string | number | symbol, any>;

export type NonNullable<T> = Exclude<T, null>;
export type RequiredNonNullable<T> = { [K in keyof T]-?: NonNullable<T[K]> };

export type DeepNonNullable<T> = T extends BasicObjectType
  ? { [K in keyof T]: DeepNonNullable<T[K]> }
  : NonNullable<T>;

export type IResolverGoodResponse<T extends ResolverResponse> =
  RequiredNonNullable<Omit<T, "errors" | "ok">> & { ok: true };

export interface IResolverBadResponse {
  ok: false;
  errors: FieldError[];
}

export type IResolverResponse<T extends ResolverResponse> =
  | IResolverGoodResponse<T>
  | IResolverBadResponse;
