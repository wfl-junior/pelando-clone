import { LoginInput } from "@/src/graphql-types/Input/users/LoginInput";
import { RegisterInput } from "@/src/graphql-types/Input/users/RegisterInput";
import type { INestApplication } from "@nestjs/common";
import { print } from "graphql";
import supertest from "supertest";
import { graphqlEndpoint } from "../constants";
import { loginMutation } from "../mutations/loginMutation";
import { registerMutation } from "../mutations/registerMutation";
import type {
  TestLoginMutationResponse,
  TestRegisterMutationResponse,
  Variables,
} from "./types";

export class TestMutationClient {
  constructor(private app: INestApplication) {}

  register(
    variables: Variables<RegisterInput>,
  ): Promise<TestRegisterMutationResponse> {
    return supertest(this.app.getHttpServer())
      .post(graphqlEndpoint)
      .send({
        query: print(registerMutation),
        variables,
      });
  }

  login(variables: Variables<LoginInput>): Promise<TestLoginMutationResponse> {
    return supertest(this.app.getHttpServer())
      .post(graphqlEndpoint)
      .send({
        query: print(loginMutation),
        variables,
      });
  }
}
