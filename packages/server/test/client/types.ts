import { Response as STResponse } from "supertest";

export interface Variables<TInput> {
  input: TInput;
}

export interface Response<TData> extends STResponse {
  body: {
    data: TData;
  };
}
