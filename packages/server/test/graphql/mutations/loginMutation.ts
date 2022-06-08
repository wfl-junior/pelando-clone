import { gql } from "apollo-server-express";
import { fieldErrorFieldsFragment } from "../fragments/fieldErrorFieldsFragment";

export const loginMutation = gql`
  mutation LoginMutation($input: LoginInput!) {
    login(input: $input) {
      ok
      errors {
        ...FieldErrorFieldsFragment
      }
      accessToken
    }
  }

  ${fieldErrorFieldsFragment}
`;
