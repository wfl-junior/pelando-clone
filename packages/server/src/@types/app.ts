import { Request, Response } from "express";

export interface IContext {
  request: Request;
  response: Response;
}

export interface Class<T> {
  new (...args: unknown[]): T;
}
