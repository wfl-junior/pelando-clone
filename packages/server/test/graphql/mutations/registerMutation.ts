import { gql } from "apollo-server-express";
import { fieldErrorFieldsFragment } from "../fragments/fieldErrorFieldsFragment";

export const registerMutation = gql`
  mutation RegisterMutation($input: RegisterInput!) {
    register(input: $input) {
      ok
      errors {
        ...FieldErrorFieldsFragment
      }
      accessToken
    }
  }

  ${fieldErrorFieldsFragment}
`;
