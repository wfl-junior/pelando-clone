import { LoginResponse } from "@/src/graphql-types/Object/users/LoginResponse";
import { RegisterResponse } from "@/src/graphql-types/Object/users/RegisterResponse";
import { Response as STResponse } from "supertest";

export interface Variables<TInput> {
  input: TInput;
}

export interface Response<TData> extends STResponse {
  body: {
    data: TData;
  };
}

export type TestRegisterMutationResponse = Response<{
  register: RegisterResponse;
}>;

export type TestLoginMutationResponse = Response<{
  login: LoginResponse;
}>;
