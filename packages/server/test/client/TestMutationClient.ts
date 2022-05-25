import { RegisterInput } from "@/src/graphql-types/Input/users/RegisterInput";
import type { INestApplication } from "@nestjs/common";
import { print } from "graphql";
import supertest from "supertest";
import { graphqlEndpoint } from "../constants";
import { registerMutation } from "../mutations/registerMutation";
import type { TestRegisterMutationResponse, Variables } from "./types";

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
}
