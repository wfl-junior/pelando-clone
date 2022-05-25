import { gql } from "apollo-server-express";

export const registerMutation = gql`
  mutation RegisterMutation($input: RegisterInput!) {
    register(input: $input) {
      ok
      errors {
        path
        message
      }
      accessToken
    }
  }
`;
