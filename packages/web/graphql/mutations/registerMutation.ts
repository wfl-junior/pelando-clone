import { gql } from "@apollo/client";
import { errorFieldsFragment } from "../fragments/errorFieldsFragment";

export const registerMutation = gql`
  mutation RegisterMutation($input: RegisterInput!) {
    register(input: $input) {
      ok
      errors {
        ...ErrorFieldsFragment
      }
      accessToken
    }
  }

  ${errorFieldsFragment}
`;
