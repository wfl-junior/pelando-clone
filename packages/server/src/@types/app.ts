import { Request, Response } from "express";

export interface IContext {
  request: Request;
  response: Response;
}
