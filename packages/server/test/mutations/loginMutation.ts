import { gql } from "apollo-server-express";

export const loginMutation = gql`
  mutation LoginMutation($input: LoginInput!) {
    login(input: $input) {
      ok
      errors {
        path
        message
      }
      accessToken
    }
  }
`;
